
(function () {
    "use strict";

    function initEmojiLightbox() {
        var lightbox = document.getElementById("lightbox");
        if (!lightbox) return;

        var thumbs = document.querySelectorAll(".gallery-thumb");
        var lightboxImage = document.getElementById("lightbox-image");
        var closeButton = document.getElementById("lightbox-close");

        if (!thumbs.length || !lightboxImage || !closeButton) return;

        var images = Array.from(thumbs).map(function (thumb) {
            return {
                src: thumb.getAttribute("src"),
                alt: thumb.getAttribute("alt")
            };
        });
        var currentIndex = 0;

        function closeLightbox() {
            lightbox.classList.remove("active");
            document.body.style.overflow = "auto";
        }

        thumbs.forEach(function (thumb, index) {
            thumb.addEventListener("click", function () {
                currentIndex = index;
                lightboxImage.src = images[currentIndex].src;
                lightboxImage.alt = images[currentIndex].alt;
                lightbox.classList.add("active");
                document.body.style.overflow = "hidden";
            });
        });

        closeButton.addEventListener("click", closeLightbox);

        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (!lightbox.classList.contains("active")) return;

            if (event.key === "Escape") {
                closeLightbox();
            } else if (event.key === "ArrowRight") {
                currentIndex = (currentIndex + 1) % images.length;
                lightboxImage.src = images[currentIndex].src;
                lightboxImage.alt = images[currentIndex].alt;
            } else if (event.key === "ArrowLeft") {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                lightboxImage.src = images[currentIndex].src;
                lightboxImage.alt = images[currentIndex].alt;
            }
        });
    }

    function initPostsLightbox() {
        var lightboxModal = document.getElementById("lightbox-modal");
        if (!lightboxModal) return;

        var galleryThumbs = document.querySelectorAll(".gallery-thumb");
        var lightboxImage = document.getElementById("lightbox-image");
        var lightboxClose = document.querySelector(".lightbox-close");

        if (!galleryThumbs.length || !lightboxImage || !lightboxClose) return;

        var images = Array.from(galleryThumbs).map(function (thumb) {
            return thumb.src;
        });
        var currentIndex = 0;

        function closeLightbox() {
            lightboxModal.classList.remove("active");
            document.body.style.overflow = "auto";
        }

        galleryThumbs.forEach(function (thumb, index) {
            thumb.addEventListener("click", function () {
                currentIndex = index;
                lightboxImage.src = thumb.src;
                lightboxModal.classList.add("active");
                document.body.style.overflow = "hidden";
            });
        });

        lightboxClose.addEventListener("click", closeLightbox);

        lightboxModal.addEventListener("click", function (event) {
            if (event.target === lightboxModal) {
                closeLightbox();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (!lightboxModal.classList.contains("active")) return;

            if (event.key === "Escape") {
                closeLightbox();
            } else if (event.key === "ArrowRight") {
                currentIndex = (currentIndex + 1) % images.length;
                lightboxImage.src = images[currentIndex];
            } else if (event.key === "ArrowLeft") {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                lightboxImage.src = images[currentIndex];
            }
        });
    }

    function boot() {
        initEmojiLightbox();
        initPostsLightbox();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();