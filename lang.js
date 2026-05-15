(function () {
    "use strict";

    var SUPPORTED_LANGS = ["en", "fr"];
    var STORAGE_KEY = "site_lang";
    var currentLang = "en";

    function getPageName() {
        var name = window.location.pathname.split("/").pop();
        return name || "index.html";
    }

    function normalizeLang(lang) {
        if (!lang) return null;
        var lower = String(lang).toLowerCase();
        if (lower.indexOf("fr") === 0) return "fr";
        if (lower.indexOf("en") === 0) return "en";
        return null;
    }

    function getSavedLang() {
        try {
            return normalizeLang(window.localStorage.getItem(STORAGE_KEY));
        } catch (err) {
            return null;
        }
    }

    function saveLang(lang) {
        try {
            window.localStorage.setItem(STORAGE_KEY, lang);
        } catch (err) {
            /* Ignore storage errors in restricted contexts. */
        }
    }

    function getQueryLang() {
        var params = new URLSearchParams(window.location.search);
        return normalizeLang(params.get("lang"));
    }

    function getBrowserPreferredLang() {
        var langs = [];

        if (Array.isArray(window.navigator.languages)) {
            langs = langs.concat(window.navigator.languages);
        }

        if (window.navigator.language) {
            langs.push(window.navigator.language);
        }

        for (var i = 0; i < langs.length; i += 1) {
            var normalized = normalizeLang(langs[i]);
            if (normalized) {
                return normalized;
            }
        }

        return "en";
    }

    function detectDefaultLang() {
        var queryLang = getQueryLang();
        if (queryLang) return queryLang;

        var savedLang = getSavedLang();
        if (savedLang) return savedLang;

        return getBrowserPreferredLang();
    }

    function pickByLang(value, lang) {
        if (!value || typeof value !== "object") return "";
        return value[lang] || value.en || "";
    }

    function setText(selector, text, all) {
        if (all) {
            var nodes = document.querySelectorAll(selector);
            nodes.forEach(function (node) {
                node.textContent = text;
            });
            return;
        }

        var node = document.querySelector(selector);
        if (node) {
            node.textContent = text;
        }
    }

    function setAttr(selector, attrName, value, all) {
        if (attrName === "text") {
            setText(selector, value, all);
            return;
        }

        if (all) {
            var nodes = document.querySelectorAll(selector);
            nodes.forEach(function (node) {
                node.setAttribute(attrName, value);
            });
            return;
        }

        var node = document.querySelector(selector);
        if (node) {
            node.setAttribute(attrName, value);
        }
    }

    function applyEntries(entries, lang) {
        if (!Array.isArray(entries)) return;

        entries.forEach(function (entry) {
            var value = pickByLang(entry.value, lang);
            if (entry.type === "text") {
                setText(entry.selector, value, Boolean(entry.all));
                return;
            }

            if (entry.type === "attr") {
                setAttr(entry.selector, entry.attr, value, Boolean(entry.all));
            }
        });
    }

    function pageEntries(page) {
        var map = {
            "index.html": [
                { type: "attr", selector: "title", attr: "text", value: { en: "in-a-nut-shell.fyi | Curated Links, Videos, and Digital Art", fr: "in-a-nut-shell.fyi | Liens, videos et art numerique" } },
                { type: "text", selector: "main.link-cloud > p", value: { en: "sometimes... you know... i think... if.. that's probably...", fr: "parfois... tu sais... je pense... si... c'est probablement..." } },
                { type: "text", selector: ".links li:nth-child(1) a", value: { en: "For Simple Navigation [embedded]", fr: "Pour une navigation simple [integre]" } },
                { type: "text", selector: ".links li:nth-child(2) a", value: { en: "emoji hell to heaven summary [fun]", fr: "resume emoji de l'enfer au paradis [amusant]" } },
                { type: "text", selector: ".links li:nth-child(3) a", value: { en: "pewdie mars - bruno pie! [YouTube Playlist] [historical]", fr: "pewdie mars - bruno pie! [Liste YouTube] [historique]" } },
                { type: "text", selector: ".links li:nth-child(4) a", value: { en: "He Is Legend Mouck Shudow [YouTube] [historical]", fr: "He Is Legend Mouck Shudow [YouTube] [historique]" } },
                { type: "text", selector: ".links li:nth-child(5) a", value: { en: "Kuna Anta My Heart [YouTube]", fr: "Kuna Anta My Heart [YouTube]" } },
                { type: "text", selector: ".links li:nth-child(6) a", value: { en: "hack the universe [YouTube Playlist]", fr: "pirater l'univers [Liste YouTube]" } },
                { type: "text", selector: ".links li:nth-child(7) a", value: { en: "posts, toasts and roasts [Twitter]", fr: "posts, toasts et roasts [Twitter]" } },
                { type: "text", selector: ".links li:nth-child(8) a", value: { en: "big genius ai [GitHub preview]", fr: "big genius ai [apercu GitHub]" } },
                { type: "text", selector: ".links li:nth-child(9) a", value: { en: "chessnuts [chess] [bing chillin] [YouTube]", fr: "chessnuts [echecs] [bing chillin] [YouTube]" } }
            ],
            "embedded.html": [
                { type: "attr", selector: "title", attr: "text", value: { en: "Embedded Content | in-a-nut-shell.fyi", fr: "Contenu integre | in-a-nut-shell.fyi" } },
                { type: "text", selector: "main.link-cloud > p", value: { en: "sometimes... you know... i think... if.. that's probably...", fr: "parfois... tu sais... je pense... si... c'est probablement..." } },
                { type: "text", selector: ".links li:nth-child(1) a", value: { en: "emoji hell to heaven summary [fun]", fr: "details des emojis de l'enfer au paradis [amusant]" } },
                { type: "text", selector: ".links li:nth-child(2) a", value: { en: "pewdie mars - bruno pie! [YouTube Playlist] [historical]", fr: "pewdie mars - bruno pie! [Liste YouTube] [historique]" } },
                { type: "text", selector: ".links li:nth-child(3) a", value: { en: "He Is Legend Mouck Shudow [YouTube] [historical]", fr: "He Is Legend Mouck Shudow [YouTube] [historique]" } },
                { type: "text", selector: ".links li:nth-child(4) a", value: { en: "Kuna Anta My Heart [YouTube]", fr: "Kuna Anta My Heart [YouTube]" } },
                { type: "text", selector: ".links li:nth-child(5) a", value: { en: "hack the universe [YouTube Playlist]", fr: "pirater l'univers [Liste YouTube]" } },
                { type: "text", selector: ".links li:nth-child(6) a", value: { en: "posts, toasts and roasts [Twitter]", fr: "posts, toasts et rotis [Twitter]" } },
                { type: "text", selector: ".links li:nth-child(7) a", value: { en: "big genius ai [GitHub preview]", fr: "big genius ai [apercu GitHub]" } },
                { type: "text", selector: ".links li:nth-child(8) a", value: { en: "chessnuts [chess] [bing chillin] [YouTube]", fr: "chessnuts [echecs] [bing chillin] [YouTube]" } }
            ],
            "404.html": [
                { type: "attr", selector: "title", attr: "text", value: { en: "404 | Page Not Found | in-a-nut-shell.fyi", fr: "404 | Page introuvable | in-a-nut-shell.fyi" } },
                { type: "text", selector: "main.link-cloud > p", value: { en: "sometimes... you know... i think... if.. that's probably...", fr: "parfois... tu sais... je pense... si... c'est probablement..." } },
                { type: "text", selector: "main.link-cloud h2 a", value: { en: "404 - Page Not Found - Go back?", fr: "404 - Page introuvable - Retour?" } }
            ],
            "emoji-hell.html": [
                { type: "attr", selector: "title", attr: "text", value: { en: "Emoji Hell: Heart vs Brain Visual Breakdown | in-a-nut-shell.fyi", fr: "Emoji Hell : coeur vs cerveau | in-a-nut-shell.fyi" } },
                { type: "attr", selector: "meta[name='description']", attr: "content", value: { en: "Emoji Hell compares two symbolic visuals: one centered on emotion and one centered on intellect. Explore the heart and brain compositions with concise interpretation.", fr: "Emoji Hell compare deux visuels symboliques : l'un centre sur l'emotion et l'autre sur l'intellect. Explorez les compositions coeur et cerveau avec une interpretation concise." } },
                { type: "text", selector: "nav.back-link a", value: { en: "← Back", fr: "← Retour" } },
                { type: "attr", selector: "nav.back-link", attr: "aria-label", value: { en: "Back navigation", fr: "Navigation retour" } },
                { type: "text", selector: "header h1", value: { en: "Emoji Hell: Heart vs Brain", fr: "Emoji Hell : coeur vs cerveau" } },
                { type: "text", selector: "header p.lead", value: { en: "This page contains only two symbolic images. Both scenes show a crowd kneeling before one dominant organ and an emoji strip that reads like a compressed manifesto.", fr: "Cette page contient deux images symboliques. Les deux scenes montrent une foule agenouillee devant un organe dominant et une ligne d'emojis qui ressemble a un manifeste compresse." } },
                { type: "attr", selector: "section.grid", attr: "aria-label", value: { en: "Emoji Hell image summaries", fr: "Resumes des images Emoji Hell" } },
                { type: "attr", selector: ".card:nth-of-type(1) .gallery-thumb", attr: "alt", value: { en: "Large anatomical heart above kneeling people with a symbolic emoji strip", fr: "Grand coeur anatomique au-dessus de personnes agenouillees avec une bande d'emojis symboliques" } },
                { type: "text", selector: ".card:nth-of-type(1) h2", value: { en: "Heart Dot Right", fr: "Heart Dot Right" } },
                { type: "text", selector: ".card:nth-of-type(1) .summary", value: { en: "A giant heart sits at the center while people kneel in repeating rows. The emoji line mixes care, balance, growth, progress, and approval, framing emotion as a force that can organize collective behavior.", fr: "Un coeur geant est au centre pendant que les gens s'agenouillent en rangs repetes. La ligne d'emojis melange soin, equilibre, croissance, progres et approbation, et presente l'emotion comme une force qui peut organiser un comportement collectif." } },
                { type: "attr", selector: ".card:nth-of-type(2) .gallery-thumb", attr: "alt", value: { en: "Large glowing brain above kneeling people with a symbolic emoji strip", fr: "Grand cerveau lumineux au-dessus de personnes agenouillees avec une bande d'emojis symboliques" } },
                { type: "text", selector: ".card:nth-of-type(2) h2", value: { en: "Brain Dot Lump", fr: "Brain Dot Lump" } },
                { type: "text", selector: ".card:nth-of-type(2) .summary", value: { en: "A glowing brain replaces the heart as the center of authority. The emoji strip adds direction arrows, strength, conflict marks, and success symbols, suggesting reason and power competing for dominance and legitimacy.", fr: "Un cerveau lumineux remplace le coeur comme centre d'autorite. La bande d'emojis ajoute des fleches de direction, des signes de force, de conflit et de succes, ce qui suggere que la raison et le pouvoir se disputent la domination et la legitimite." } },
                { type: "text", selector: "#lightbox .sr-only", value: { en: "Expanded image", fr: "Image agrandie" } },
                { type: "attr", selector: "#lightbox-image", attr: "alt", value: { en: "Expanded symbolic image", fr: "Image symbolique agrandie" } },
                { type: "attr", selector: "#lightbox-close", attr: "aria-label", value: { en: "Close image viewer", fr: "Fermer la visionneuse" } },
                { type: "attr", selector: "#lightbox", attr: "aria-label", value: { en: "Expanded image viewer", fr: "Visionneuse d'image agrandie" } }
            ],
            "posts-toasts-roasts.html": [
                { type: "attr", selector: "title", attr: "text", value: { en: "Posts, Toasts and Roasts | in-a-nut-shell.fyi", fr: "Posts, Toasts et Roasts | in-a-nut-shell.fyi" } },
                { type: "attr", selector: "meta[name='description']", attr: "content", value: { en: "Browse Posts, Toasts and Roasts: curated social posts featuring humor, commentary, and culture.", fr: "Parcourez Posts, Toasts et Roasts : des publications sociales selectionnees avec humour, commentaires et culture." } },
                { type: "text", selector: ".back-link a", value: { en: "← Back", fr: "← Retour" } },
                { type: "text", selector: ".header h1", value: { en: "posts, toasts and roasts", fr: "posts, toasts et rotis" } },
                { type: "text", selector: ".header p", value: { en: "Twitter [english]", fr: "Twitter [anglais]" } },
                { type: "attr", selector: "#lightbox-image", attr: "alt", value: { en: "enlarged image", fr: "image agrandie" } }
            ],
            "big-genius-ai.html": [
                { type: "attr", selector: "title", attr: "text", value: { en: "big genius ai", fr: "big genius ai" } },
                { type: "text", selector: ".back-link", value: { en: "← Back", fr: "← Retour" } },
                { type: "text", selector: ".title-block p", value: { en: "github preview", fr: "apercu GitHub" } },
                { type: "attr", selector: ".code-card", attr: "aria-label", value: { en: "big-genius-ai.py code snippet", fr: "extrait de code big-genius-ai.py" } },
                { type: "text", selector: ".code-meta span", value: { en: "snippet at the top", fr: "extrait au debut" } },
                { type: "attr", selector: ".viewer-card", attr: "aria-label", value: { en: "GitHub iframe preview", fr: "apercu iframe GitHub" } },
                { type: "text", selector: ".viewer-head p", value: { en: "live preview in an interactive iframe.", fr: "apercu en direct dans une iframe interactive." } },
                { type: "attr", selector: "#githubFrame", attr: "title", value: { en: "GitHub repository preview", fr: "Apercu du depot GitHub" } },
                { type: "text", selector: ".frame-note", value: { en: "This universe was NOT ai generated. Please enjoy responsibly, and have a nicely functioning day!", fr: "Cet univers n'a PAS ete genere par l'IA. Profitez-en de facon responsable et passez une bonne journee!" } }
            ],
            "chessnuts.html": [
                { type: "attr", selector: "title", attr: "text", value: { en: "Chessnuts | in-a-nut-shell.fyi", fr: "Chessnuts | in-a-nut-shell.fyi" } },
                { type: "attr", selector: "meta[name='description']", attr: "content", value: { en: "Chessnuts. Watch the featured video on in-a-nut-shell.fyi.", fr: "Chessnuts. Regardez la video en vedette sur in-a-nut-shell.fyi." } },
                { type: "text", selector: "nav.back-link a", value: { en: "← Back", fr: "← Retour" } },
                { type: "attr", selector: "nav.back-link a", attr: "title", value: { en: "Return to videos", fr: "Retour aux videos" } },
                { type: "text", selector: "header.header p", value: { en: "Featured Video", fr: "Video en vedette" } },
                { type: "attr", selector: "nav.back-link", attr: "aria-label", value: { en: "Breadcrumb", fr: "Fil d'ariane" } },
                { type: "attr", selector: ".iframe-wrapper", attr: "aria-label", value: { en: "Chessnuts video player", fr: "Lecteur video Chessnuts" } },
                { type: "attr", selector: ".legend-player-controls", attr: "aria-label", value: { en: "Video playback controls", fr: "Controles de lecture video" } }
            ],
            "hack-the-universe.html": [
                { type: "attr", selector: "title", attr: "text", value: { en: "Hack the Universe Playlist | in-a-nut-shell.fyi", fr: "Hack the Universe Playlist | in-a-nut-shell.fyi" } },
                { type: "attr", selector: "meta[name='description']", attr: "content", value: { en: "Watch the Hack the Universe playlist: a curated set of YouTube videos.", fr: "Regardez la playlist Hack the Universe : une selection de videos YouTube." } },
                { type: "text", selector: ".back-link a", value: { en: "← Back", fr: "← Retour" } },
                { type: "text", selector: ".header h1", value: { en: "hack the universe", fr: "pirater l'univers" } },
                { type: "text", selector: ".header p", value: { en: "YouTube Playlist", fr: "Liste YouTube" } }
            ],
            "he-is-legend.html": [
                { type: "attr", selector: "title", attr: "text", value: { en: "He Is Legend - Mouck Shudow | in-a-nut-shell.fyi", fr: "He Is Legend - Mouck Shudow | in-a-nut-shell.fyi" } },
                { type: "attr", selector: "meta[name='description']", attr: "content", value: { en: "He Is Legend - Mouck Shudow. Watch the featured YouTube video.", fr: "He Is Legend - Mouck Shudow. Regardez la video YouTube en vedette." } },
                { type: "text", selector: "nav.back-link a", value: { en: "← Back", fr: "← Retour" } },
                { type: "attr", selector: "nav.back-link a", attr: "title", value: { en: "Return to videos", fr: "Retour aux videos" } },
                { type: "text", selector: "header.header p", value: { en: "Legendary YouTube Content", fr: "Contenu YouTube legendaire" } },
                { type: "attr", selector: "nav.back-link", attr: "aria-label", value: { en: "Breadcrumb", fr: "Fil d'ariane" } },
                { type: "attr", selector: ".iframe-wrapper", attr: "aria-label", value: { en: "He Is Legend - Mouck Shudow video player", fr: "Lecteur video He Is Legend - Mouck Shudow" } },
                { type: "attr", selector: ".legend-player-controls", attr: "aria-label", value: { en: "Video playback controls", fr: "Controles de lecture video" } }
            ],
            "kun-anta.html": [
                { type: "attr", selector: "title", attr: "text", value: { en: "Kun Anta | in-a-nut-shell.fyi", fr: "Kun Anta | in-a-nut-shell.fyi" } },
                { type: "attr", selector: "meta[name='description']", attr: "content", value: { en: "Watch Kun Anta: featured YouTube video with an emotional and poetic atmosphere.", fr: "Regardez Kun Anta : video YouTube en vedette avec une atmosphere emotionnelle et poetique." } },
                { type: "text", selector: ".back-link a", value: { en: "← Back", fr: "← Retour" } },
                { type: "text", selector: ".header p", value: { en: "YouTube", fr: "YouTube" } },
                { type: "text", selector: ".video-block .sr-only", value: { en: "Kun Anta featured video player", fr: "Lecteur video Kun Anta en vedette" } },
                { type: "attr", selector: ".seo-copy", attr: "aria-label", value: { en: "About this video", fr: "A propos de cette video" } },
                { type: "text", selector: ".seo-copy h2", value: { en: "About Kun Anta", fr: "A propos de Kun Anta" } },
                { type: "text", selector: ".seo-copy p", value: { en: "Based on the available public metadata and thumbnail for Kun - Anta (by Austin James Hogan), the video appears to be a short, mood-driven piece centered on love and emotional connection, using simple symbolic visuals like two hands forming a heart shape against the sky and stylized script text to create a poetic, reflective tone; overall, it feels more like an aesthetic or lyrical visual moment than a plot-heavy narrative, emphasizing feeling, intimacy, and atmosphere over detailed storytelling.", fr: "D'apres les metadonnees publiques et la miniature disponibles pour Kun - Anta (par Austin James Hogan), la video semble etre une piece courte et emotive centree sur l'amour et la connexion emotionnelle, avec des visuels symboliques simples comme deux mains formant un coeur devant le ciel et un texte stylise pour creer un ton poetique et reflexif ; globalement, elle ressemble plus a un moment visuel esthetique ou lyrique qu'a un recit riche en intrigue, et met l'accent sur le ressenti, l'intimite et l'atmosphere." } }
            ],
            "pewdie-mars.html": [
                { type: "attr", selector: "title", attr: "text", value: { en: "Pewdie Mars - Bruno Pie Playlist | in-a-nut-shell.fyi", fr: "Pewdie Mars - Bruno Pie Liste YouTube | in-a-nut-shell.fyi" } },
                { type: "attr", selector: "meta[name='description']", attr: "content", value: { en: "Watch the Pewdie Mars - Bruno Pie historical playlist on YouTube.", fr: "Regardez la playlist historique Pewdie Mars - Bruno Pie sur YouTube." } },
                { type: "text", selector: ".back-link a", value: { en: "← Back", fr: "← Retour" } },
                { type: "text", selector: ".header h1", value: { en: "pewdie mars - bruno pie! [historical]", fr: "pewdie mars - bruno pie! [historique]" } },
                { type: "text", selector: ".header p", value: { en: "YouTube Playlist", fr: "Liste YouTube" } }
            ]
        };

        return map[page] || [];
    }

    function applyDocumentTitleFallback(lang) {
        var titleNode = document.querySelector("title");
        if (!titleNode) return;

        var text = titleNode.textContent || "";
        if (!text.trim()) return;

        if (lang === "fr") {
            titleNode.textContent = text
                .replace("Page Not Found", "Page introuvable")
                .replace("Featured Video", "Video en vedette")
                .replace("Playlist", "Liste");
        }
    }

    function mountLanguageSwitcher(initialLang, onChange) {
        var switcher = document.createElement("div");
        switcher.setAttribute("aria-label", "Language Switcher");
        switcher.id = "lang-switcher-safe";

        var enBtn = document.createElement("button");
        enBtn.type = "button";
        enBtn.textContent = "EN";
        enBtn.dataset.lang = "en";

        var frBtn = document.createElement("button");
        frBtn.type = "button";
        frBtn.textContent = "FR";
        frBtn.dataset.lang = "fr";

        switcher.appendChild(enBtn);
        switcher.appendChild(frBtn);

        function markActive(lang) {
            switcher.querySelectorAll("button").forEach(function (btn) {
                if (btn.dataset.lang === lang) {
                    btn.setAttribute("aria-pressed", "true");
                    btn.classList.add("active");
                } else {
                    btn.setAttribute("aria-pressed", "false");
                    btn.classList.remove("active");
                }
            });
        }

        switcher.addEventListener("click", function (evt) {
            var btn = evt.target.closest("button[data-lang]");
            if (!btn) return;

            var lang = btn.dataset.lang;
            if (SUPPORTED_LANGS.indexOf(lang) === -1) return;
            markActive(lang);
            onChange(lang);
        });

        document.body.appendChild(switcher);
        markActive(initialLang);
    }

    function installSwitcherStyles() {
        var style = document.createElement("style");
        style.textContent = [
            "#lang-switcher-safe {",
            "  position: fixed;",
            "  right: 14px;",
            "  bottom: 14px;",
            "  z-index: 9999;",
            "  display: inline-flex;",
            "  gap: 6px;",
            "  padding: 6px;",
            "  border-radius: 999px;",
            "  background: rgba(0,0,0,0.62);",
            "  border: 1px solid rgba(255,255,255,0.24);",
            "  backdrop-filter: blur(4px);",
            "}",
            "#lang-switcher-safe button {",
            "  border: 1px solid rgba(255,255,255,0.25);",
            "  background: rgba(255,255,255,0.08);",
            "  color: #fff;",
            "  border-radius: 999px;",
            "  padding: 4px 9px;",
            "  font: 600 12px/1 sans-serif;",
            "  cursor: pointer;",
            "}",
            "#lang-switcher-safe button.active {",
            "  background: #fff;",
            "  color: #111;",
            "}",
            "@media (max-width: 640px) {",
            "  #lang-switcher-safe { right: 10px; bottom: 10px; }",
            "}"
        ].join("\n");

        document.head.appendChild(style);
    }

    function setLangParamWithoutReload(lang) {
        var url = new URL(window.location.href);
        url.searchParams.set("lang", lang);
        window.history.replaceState({}, "", url.toString());
    }

    function syncSeoUrlsForLang(lang) {
        var page = getPageName();
        var origin = window.location.origin;
        if (!origin || origin === "null") return;

        var url = new URL(origin + "/" + page);
        if (lang === "fr") {
            url.searchParams.set("lang", "fr");
        }

        var canonical = document.querySelector("link[rel='canonical']");
        if (canonical) {
            canonical.setAttribute("href", url.toString());
        }

        var ogUrl = document.querySelector("meta[property='og:url']");
        if (ogUrl) {
            ogUrl.setAttribute("content", url.toString());
        }
    }

    function applyLanguage(lang) {
        var page = getPageName();
        currentLang = lang;

        document.documentElement.setAttribute("lang", lang);
        setAttr("meta[property='og:locale']", "content", lang === "fr" ? "fr_FR" : "en_US");
        applyEntries(pageEntries(page), lang);
        applyDocumentTitleFallback(lang);
        setLangParamWithoutReload(lang);
        syncSeoUrlsForLang(lang);
        saveLang(lang);

        document.dispatchEvent(new CustomEvent("site:langchange", {
            detail: {
                lang: lang,
                page: page
            }
        }));
    }

    document.addEventListener("DOMContentLoaded", function () {
        installSwitcherStyles();

        var lang = detectDefaultLang();
        if (SUPPORTED_LANGS.indexOf(lang) === -1) {
            lang = "en";
        }

        applyLanguage(lang);

        mountLanguageSwitcher(lang, function (nextLang) {
            lang = nextLang;
            applyLanguage(lang);
        });
    });
})();
