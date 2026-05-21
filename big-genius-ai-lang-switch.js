(function () {
    "use strict";

    var iframe = document.getElementById("githubFrame");
    if (!iframe) return;

    var remoteUrl = iframe.getAttribute("src");
    var remoteBase = new URL(".", remoteUrl).toString();
    var currentLang = document.documentElement.getAttribute("lang") || "en";

    function syncIframeLanguage(lang) {
        currentLang = lang || "en";

        var iframeDocument = iframe.contentDocument;
        if (!iframeDocument) return;

        var select = iframeDocument.querySelector('select.lang-select, select[aria-label="Select language"]');
        if (!select || select.value === currentLang) return;

        select.value = currentLang;
        select.dispatchEvent(new Event("change", { bubbles: true }));
    }

    function loadEmbeddedPage() {
        fetch(remoteUrl)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Failed to load embedded page");
                }

                return response.text();
            })
            .then(function (html) {
                var markup = html.indexOf("<base ") === -1
                    ? html.replace("<head>", '<head><base href="' + remoteBase + '">')
                    : html;

                iframe.srcdoc = markup;
            })
            .catch(function () {
                iframe.src = remoteUrl;
            });
    }

    document.addEventListener("site:langchange", function (event) {
        syncIframeLanguage(event.detail && event.detail.lang);
    });

    iframe.addEventListener("load", function () {
        syncIframeLanguage(currentLang);
    });

    function syncInitialLanguage() {
        syncIframeLanguage(currentLang);
    }

    loadEmbeddedPage();

    if (document.readyState === "complete" || document.readyState === "interactive") {
        syncInitialLanguage();
    } else {
        window.addEventListener("load", syncInitialLanguage, { once: true });
    }
}());