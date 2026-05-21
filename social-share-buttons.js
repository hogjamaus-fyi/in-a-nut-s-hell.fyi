(function () {
    "use strict";

    var SITE_ORIGIN = "https://in-a-nut-s-hell.fyi";
    var FALLBACK_DESCRIPTION = "Explore in-a-nut-s-hell.fyi: curated links, videos, and visual experiments.";
    var FALLBACK_IMAGE = SITE_ORIGIN + "/squirrel.webp";
    var FALLBACK_IMAGE_ALT = "Squirrel artwork from in-a-nut-s-hell.fyi";

    function upsertMeta(attribute, key, content) {
        if (!content) {
            return;
        }

        var selector = 'meta[' + attribute + '="' + key + '"]';
        var node = document.head.querySelector(selector);

        if (!node) {
            node = document.createElement("meta");
            node.setAttribute(attribute, key);
            document.head.appendChild(node);
        }

        node.setAttribute("content", content);
    }

    function ensureCanonical() {
        var canonical = document.head.querySelector('link[rel="canonical"]');

        if (!canonical) {
            canonical = document.createElement("link");
            canonical.setAttribute("rel", "canonical");
            document.head.appendChild(canonical);
        }

        if (!canonical.getAttribute("href")) {
            canonical.setAttribute("href", window.location.href);
        }

        return canonical.href || window.location.href;
    }

    function ensureStructuredData(title, description, canonical, image) {
        var hasStructuredData = !!document.head.querySelector('script[type="application/ld+json"]');

        if (hasStructuredData) {
            return;
        }

        var data = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": title,
            "description": description,
            "url": canonical,
            "image": image,
            "inLanguage": document.documentElement.lang || "en"
        };

        var script = document.createElement("script");
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
    }

    function ensureSeoMeta() {
        var canonical = ensureCanonical();
        var title = (document.title || "in-a-nut-s-hell.fyi").trim();

        var descriptionMeta = document.head.querySelector('meta[name="description"]');
        var description = descriptionMeta && descriptionMeta.content
            ? descriptionMeta.content.trim()
            : FALLBACK_DESCRIPTION;

        var image = FALLBACK_IMAGE;

        upsertMeta("name", "description", description);
        upsertMeta("property", "og:site_name", "in-a-nut-s-hell.fyi");
        upsertMeta("property", "og:title", title);
        upsertMeta("property", "og:description", description);
        upsertMeta("property", "og:type", "website");
        upsertMeta("property", "og:url", canonical);
        upsertMeta("property", "og:image", image);
        upsertMeta("property", "og:image:secure_url", image);
        upsertMeta("property", "og:image:width", "1200");
        upsertMeta("property", "og:image:height", "630");
        upsertMeta("property", "og:image:alt", FALLBACK_IMAGE_ALT);
        upsertMeta("name", "twitter:card", "summary_large_image");
        upsertMeta("name", "twitter:title", title);
        upsertMeta("name", "twitter:description", description);
        upsertMeta("name", "twitter:image", image);
        upsertMeta("name", "twitter:image:alt", FALLBACK_IMAGE_ALT);

        ensureStructuredData(title, description, canonical, image);

        return {
            title: title,
            description: description,
            canonical: canonical
        };
    }

    function addShareStyles() {
        if (document.getElementById("share-links-style")) {
            return;
        }

        var style = document.createElement("style");
        style.id = "share-links-style";
        style.textContent = [
            ".share-links {",
            "  position: fixed;",
            "  right: 12px;",
            "  top: calc(4 / 6 * 100vh);",
            "  transform: translateY(-50%);",
            "  z-index: 9999;",
            "  display: flex;",
            "  flex-direction: column;",
            "  align-items: center;",
            "  gap: 6px;",
            "  max-height: 80vh;",
            "  overflow-y: auto;",
            "}",
            ".share-links a, .share-links button {",
            "  width: 30px;",
            "  height: 30px;",
            "  border-radius: 999px;",
            "  border: 1px solid rgba(255, 255, 255, 0.55);",
            "  background: rgba(8, 16, 26, 0.75);",
            "  color: #ffffff;",
            "  display: grid;",
            "  place-items: center;",
            "  font: 700 10px/1 system-ui, -apple-system, Segoe UI, sans-serif;",
            "  text-decoration: none;",
            "  cursor: pointer;",
            "  padding: 0;",
            "}",
            ".share-links a:hover, .share-links button:hover, .share-links a:focus-visible, .share-links button:focus-visible {",
            "  transform: translateY(-1px);",
            "  background: rgba(8, 16, 26, 0.92);",
            "}",
            ".share-links::-webkit-scrollbar { width: 4px; }",
            ".share-links::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.4); border-radius: 99px; }"
        ].join("\n");

        document.head.appendChild(style);
    }

    function encode(text) {
        return encodeURIComponent(text || "");
    }

    function buildShareTargets(meta) {
        var pageUrl = meta.canonical;
        var text = meta.title + " - " + pageUrl;

        return [
            { key: "facebook", label: "FB", href: "https://www.facebook.com/sharer/sharer.php?u=" + encode(pageUrl) },
            { key: "instagram", label: "IG", copyOnly: true },
            { key: "twitter", label: "X", href: "https://twitter.com/intent/tweet?url=" + encode(pageUrl) + "&text=" + encode(meta.title) },
            { key: "discord", label: "DC", copyOnly: true },
            { key: "whatsapp", label: "WA", href: "https://api.whatsapp.com/send?text=" + encode(text) },
            { key: "linkedin", label: "IN", href: "https://www.linkedin.com/sharing/share-offsite/?url=" + encode(pageUrl) },
            { key: "threads", label: "TH", href: "https://www.threads.net/intent/post?text=" + encode(text) },
            { key: "weibo", label: "WB", href: "https://service.weibo.com/share/share.php?url=" + encode(pageUrl) + "&title=" + encode(meta.title) },
            { key: "vkontakte", label: "VK", href: "https://vk.com/share.php?url=" + encode(pageUrl) + "&title=" + encode(meta.title) },
            { key: "telegram", label: "TG", href: "https://t.me/share/url?url=" + encode(pageUrl) + "&text=" + encode(meta.title) },
            { key: "bluesky", label: "BS", href: "https://bsky.app/intent/compose?text=" + encode(text) },
            { key: "mastodon", label: "MS", href: "https://toot.kytta.dev/?text=" + encode(text) }
        ];
    }

    function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text);
        }

        return new Promise(function (resolve) {
            var input = document.createElement("textarea");
            input.value = text;
            input.style.position = "fixed";
            input.style.left = "-9999px";
            document.body.appendChild(input);
            input.select();
            document.execCommand("copy");
            document.body.removeChild(input);
            resolve();
        });
    }

    function createShareLinks(meta) {
        if (document.getElementById("share-links")) {
            return;
        }

        addShareStyles();

        var wrapper = document.createElement("nav");
        wrapper.id = "share-links";
        wrapper.className = "share-links";
        wrapper.setAttribute("aria-label", "Social share links");

        buildShareTargets(meta).forEach(function (network) {
            if (network.copyOnly) {
                var button = document.createElement("button");
                button.type = "button";
                button.textContent = network.label;
                button.title = "Copy for " + network.key;
                button.setAttribute("aria-label", "Copy page link for " + network.key);
                button.addEventListener("click", function () {
                    copyToClipboard(meta.canonical).then(function () {
                        button.title = "Copied";
                        setTimeout(function () {
                            button.title = "Copy for " + network.key;
                        }, 1200);
                    });
                });
                wrapper.appendChild(button);
                return;
            }

            var link = document.createElement("a");
            link.href = network.href;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = network.label;
            link.title = "Share on " + network.key;
            link.setAttribute("aria-label", "Share on " + network.key);
            wrapper.appendChild(link);
        });

        document.body.appendChild(wrapper);
    }

    function init() {
        var meta = ensureSeoMeta();
        createShareLinks(meta);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
