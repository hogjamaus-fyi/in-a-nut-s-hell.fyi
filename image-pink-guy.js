(function () {
    "use strict";

    const banner = document.getElementById("pink-guy-banner");
    const panel = document.getElementById("pink-guy-panel");

    if (!banner || !panel) {
        return;
    }

    banner.addEventListener("click", () => {
        const isActive = panel.classList.toggle("active");
        banner.setAttribute("aria-expanded", String(isActive));

        if (isActive) {
            panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    });

    const pinkImg = panel.querySelector(".pink-guy-image");
    const lightbox = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-image");
    const lightboxClose = lightbox && lightbox.querySelector(".lightbox-close");

    if (pinkImg && lightbox && lightboxImg) {
        pinkImg.addEventListener("click", () => {
            lightboxImg.src = pinkImg.src;
            lightboxImg.alt = pinkImg.alt;
            lightbox.classList.add("active");
            lightbox.setAttribute("aria-hidden", "false");
            if (lightboxClose) lightboxClose.focus();
        });
    }
})();
