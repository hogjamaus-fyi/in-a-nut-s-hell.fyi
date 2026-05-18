"use strict";

(function () {
	var CONTROL_CLASS = "legend-player-controls";
	var TOGGLE_CLASS = "legend-custom-toggle";
	var SEEK_CLASS = "legend-custom-seek";
	var TIME_CLASS = "legend-time-display";
	var WRAPPER_SELECTOR = ".iframe-wrapper";
	var YT_SCRIPT_SRC = "https://www.youtube.com/iframe_api";
	var PLAYER_ID_PREFIX = "legend-youtube-iframe-";
	var CONTROL_ID_PREFIX = "legend-player-controls-";
	var TOGGLE_ID_PREFIX = "legend-player-toggle-";
	var SEEK_ID_PREFIX = "legend-player-seek-";
	var TIME_ID_PREFIX = "legend-player-time-";
	var TICK_MS = 250;

	var COPY = {
		en: {
			controlsLabel: "Video playback controls",
			play: "Play",
			pause: "Pause",
			playAria: "Play video",
			pauseAria: "Pause video",
			positionAria: "Video position"
		},
		fr: {
			controlsLabel: "Controles de lecture video",
			play: "Lire",
			pause: "Pause",
			playAria: "Lire la video",
			pauseAria: "Mettre la video en pause",
			positionAria: "Position de la video"
		}
	};

	var shells = [];
	var apiLoadStarted = false;
	var apiQueue = [];
	var tickTimer = null;

	function getLang() {
		var lang = (document.documentElement.getAttribute("lang") || "en").toLowerCase();
		if (lang.indexOf("fr") === 0) return "fr";
		return "en";
	}

	function copyForLang() {
		return COPY[getLang()] || COPY.en;
	}

	function formatTime(seconds) {
		if (!isFinite(seconds) || seconds < 0) {
			return "0:00";
		}

		var total = Math.floor(seconds);
		var hours = Math.floor(total / 3600);
		var minutes = Math.floor((total % 3600) / 60);
		var remaining = total % 60;
		var paddedSeconds = remaining < 10 ? "0" + remaining : String(remaining);

		if (hours > 0) {
			var paddedMinutes = minutes < 10 ? "0" + minutes : String(minutes);
			return hours + ":" + paddedMinutes + ":" + paddedSeconds;
		}

		return minutes + ":" + paddedSeconds;
	}

	function isYouTubeIframe(iframe) {
		if (!iframe || !iframe.src) return false;

		return /youtube\.com|youtu\.be/i.test(iframe.src);
	}

	function isPlaying(shell) {
		if (!shell.player || !window.YT || !window.YT.PlayerState) return false;

		return shell.player.getPlayerState() === window.YT.PlayerState.PLAYING;
	}

	function updateControls(shell) {
		if (!shell) return;

		var copy = copyForLang();
		var playing = isPlaying(shell);
		var duration = 0;
		var currentTime = 0;

		if (shell.player && shell.ready) {
			try {
				duration = Number(shell.player.getDuration()) || 0;
				currentTime = Number(shell.player.getCurrentTime()) || 0;
			} catch (err) {
				duration = shell.duration || 0;
				currentTime = shell.currentTime || 0;
			}
		} else {
			duration = shell.duration || 0;
			currentTime = shell.currentTime || 0;
		}

		shell.duration = duration;
		shell.currentTime = currentTime;

		shell.controls.setAttribute("aria-label", copy.controlsLabel);
		shell.toggle.textContent = playing ? copy.pause : copy.play;
		shell.toggle.setAttribute("aria-label", playing ? copy.pauseAria : copy.playAria);
		shell.toggle.setAttribute("aria-pressed", playing ? "true" : "false");
		shell.seek.setAttribute("aria-label", copy.positionAria);
		shell.time.textContent = formatTime(currentTime) + " / " + formatTime(duration);

		if (duration > 0) {
			shell.seek.disabled = false;
			shell.seek.max = String(duration);

			if (!shell.seeking) {
				shell.seek.value = String(Math.min(currentTime, duration));
			}
		} else {
			shell.seek.disabled = true;
			shell.seek.max = "0";
			shell.seek.value = "0";
		}
	}

	function seekShell(shell, value) {
		if (!shell.player || !shell.ready) return;

		var nextTime = Number(value);
		if (!isFinite(nextTime) || nextTime < 0) return;

		shell.player.seekTo(nextTime, true);
		shell.currentTime = nextTime;
		updateControls(shell);
	}

	function toggleShell(shell) {
		if (!shell.player || !shell.ready) return;

		if (isPlaying(shell)) {
			shell.player.pauseVideo();
		} else {
			shell.player.playVideo();
		}
	}

	function createShell(iframe, index) {
		var controlBar = document.createElement("div");
		var toggle = document.createElement("button");
		var seek = document.createElement("input");
		var time = document.createElement("span");
		var wrapper = iframe.parentNode;
		var shell = {
			iframe: iframe,
			controls: controlBar,
			toggle: toggle,
			seek: seek,
			time: time,
			player: null,
			ready: false,
			seeking: false,
			duration: 0,
			currentTime: 0
		};

		if (!iframe.id) {
			iframe.id = PLAYER_ID_PREFIX + index;
		}

		controlBar.className = CONTROL_CLASS;
		controlBar.id = CONTROL_ID_PREFIX + index;
		controlBar.setAttribute("role", "group");

		toggle.type = "button";
		toggle.className = TOGGLE_CLASS;
		toggle.id = TOGGLE_ID_PREFIX + index;

		seek.type = "range";
		seek.className = SEEK_CLASS;
		seek.id = SEEK_ID_PREFIX + index;
		seek.min = "0";
		seek.max = "0";
		seek.step = "0.1";
		seek.value = "0";

		time.className = TIME_CLASS;
		time.id = TIME_ID_PREFIX + index;
		time.textContent = "0:00 / 0:00";

		controlBar.appendChild(toggle);
		controlBar.appendChild(seek);
		controlBar.appendChild(time);
		
		wrapper.insertAdjacentElement("afterend", controlBar);
	
		toggle.addEventListener("click", function () {
			toggleShell(shell);
		});

		seek.addEventListener("pointerdown", function () {
			shell.seeking = true;
		});

		seek.addEventListener("pointerup", function () {
			shell.seeking = false;
		});

		seek.addEventListener("blur", function () {
			shell.seeking = false;
		});

		seek.addEventListener("input", function () {
			if (!shell.player || !shell.ready) return;

			shell.seeking = true;
			seekShell(shell, seek.value);
		});

		seek.addEventListener("change", function () {
			shell.seeking = false;
			updateControls(shell);
		});

		shells.push(shell);
		updateControls(shell);

		return shell;
	}

	function ensureApiScript() {
		if (window.YT && window.YT.Player) {
			flushApiQueue();
			return;
		}

		if (apiLoadStarted) return;
		apiLoadStarted = true;

		var priorReady = window.onYouTubeIframeAPIReady;
		window.onYouTubeIframeAPIReady = function () {
			if (typeof priorReady === "function") {
				priorReady();
			}

			flushApiQueue();
		};

		if (!document.querySelector('script[src="' + YT_SCRIPT_SRC + '"]')) {
			var script = document.createElement("script");
			script.src = YT_SCRIPT_SRC;
			script.async = true;
			document.head.appendChild(script);
		}
	}

	function flushApiQueue() {
		while (apiQueue.length > 0) {
			var callback = apiQueue.shift();
			callback();
		}
	}

	function whenApiReady(callback) {
		if (window.YT && window.YT.Player) {
			callback();
			return;
		}

		apiQueue.push(callback);
		ensureApiScript();
	}

	function attachPlayer(shell) {
		whenApiReady(function () {
			shell.player = new window.YT.Player(shell.iframe.id, {
				events: {
					onReady: function () {
						shell.ready = true;
						updateControls(shell);
					},
					onStateChange: function () {
						if (!shell.seeking) {
							updateControls(shell);
						}
					}
				}
			});
		});
	}

	function syncAllControls() {
		for (var i = 0; i < shells.length; i += 1) {
			updateControls(shells[i]);
		}
	}

	function startTicker() {
		if (tickTimer) return;

		tickTimer = window.setInterval(function () {
			for (var i = 0; i < shells.length; i += 1) {
				if (!shells[i].ready || shells[i].seeking) continue;
				updateControls(shells[i]);
			}
		}, TICK_MS);
	}

	function observeLanguageChanges() {
		document.addEventListener("site:langchange", syncAllControls);

		if (window.MutationObserver) {
			var observer = new MutationObserver(function (mutations) {
				for (var i = 0; i < mutations.length; i += 1) {
					if (mutations[i].type === "attributes" && mutations[i].attributeName === "lang") {
						syncAllControls();
						break;
					}
				}
			});

			observer.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ["lang"]
			});
		}
	}

	function init() {
		var wrappers = document.querySelectorAll(WRAPPER_SELECTOR);

		if (!wrappers.length) return;

		for (var i = 0; i < wrappers.length; i += 1) {
			var wrapper = wrappers[i];
			var iframe = wrapper.querySelector("iframe");

			if (!iframe || !isYouTubeIframe(iframe)) {
				continue;
			}

			if (wrapper.nextElementSibling && wrapper.nextElementSibling.classList && wrapper.nextElementSibling.classList.contains(CONTROL_CLASS)) {
				continue;
			}

			var shell = createShell(iframe, i + 1);
			attachPlayer(shell);
		}

		syncAllControls();
		startTicker();
		observeLanguageChanges();
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}
}());
