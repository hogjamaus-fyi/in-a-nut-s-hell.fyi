(function () {
    "use strict";

    const SUPPORTED_LANGS = new Set(["en", "fr", "es", "ar", "fa", "zh"]);
    const babaTranslations = window.__BABA_IS_SMART_TRANSLATIONS || {};
    const sepKunAntaPoems = babaTranslations.sepKunAntaPoems || {};

    const slides = [
        {
            src: "baba-stuuuupid-punkin.webp",
            alt: "baba-stuuuupid-punkin.webp",
            caption: "fold in two, baba fart full of poo,\nhe's a dog and make drool,\nwe toss him into the water,\nhe so fat, he fill the whole pool!\n\nbabaa is a stuuuupid punkin by Sep Jr.",
            width: 871,
            height: 1100
        },
        {
            src: "i-hate-my-baba.webp",
            alt: "Sep Jr. image from i-hate-my-baba.webp",
            caption: "baba is stink, baba is poo\ncan i have a new baba\nif he don't love you!?\nwhatever are we gonna do...\nmumma is pretty mumma nice\nmumma deserve the best man\nnot some block of ice\n\nmum you look by Sep Jr.",
            width: 875,
            height: 1100
        },
        {
            src: "a-stinky.webp",
            alt: "Sep Jr. image from a-stinky.webp",
            caption: "(that's not a poem)\n(you're stuuupid yuck!!!! hm)\n\na stinky by Sep Jr.",
            width: 724,
            height: 1100
        },
        {
            src: "berfect.webp",
            alt: "Sep Jr. image from berfect.webp",
            caption: "say\"\ni am  the hero, start at zero            [0]\nthink it through one and two             [1 2]\nthree and four, five no more             [3 4 5]\nnow count to six, easy fix               [6]\ntake another, up to seven                [7]\njust wait, now i have eight              [8]\nnine for mother,                         [9]\nwe have too much, what do we do?         [?]\nthese numbers have 10 letters,           [?]  \nso we talk all we count and make         [0 1 2 3 4 5 6 7 8 9]\nit one group, in front                   [1?]\nto the new job, to count to ten,         [10]\nall over again! Oh Brother               [11]\nwhat will you do, when you get to ten?   [19]\ncall your mother? or ask a chicken then? [??]\n\nwe start all over, oh brother! [10]\n\nwhy is he smart now? by Sep Jr.",
            width: 915,
            height: 1100
        },
        {
            src: "mum----you-beautiful.webp",
            alt: "mum---you-beautiful image",
            caption: "Press rose womanesque wandering foliage\nOf the willow and tact as the thorn\nEyes wonder her givilin grace\nShe is frantic and helpful\nNoticable, a love regime of one\nParty free and family tree\nShe is strong and perfectly\n\nJovial Neemanthemum by Baba",
            width: 882,
            height: 1100
        },
        {
            src: "avcoscious-valor.webp",
            alt: "avcoscious-valor.webp",
            caption: "Soulful beloved merry\nAs her angels covet more life\nGolden heartscorn and heartful dreamings\nShe hides me in the thicket, goodness\nThe green near Her Heart, freedom\n\nEvergrows, the wordless, timeless, moment\n\nBartollean brown, nature's warmth hiding and shying away, unbeveled roots, depth, Pastachian Blue, our time unfold wining and telling now, fathered buds, breadth, Heliotrope green, her love ebbing and flowing allwhere, oft'freed thriving and sifting always, petaled flowers.\n\nUnto and the narrow straight, her\nUpto and the tall wondercore, him\n\nAvcoscious Valor by Baba",
            width: 896,
            height: 1195
        },
        {
            src: "sep-kun-anta.webp",
            alt: "sep-kun-anta image",
            caption: sepKunAntaPoems.en || "",
            width: 1280,
            height: 720
        }
    ];

    const captionsByLang = babaTranslations.captionsByLang || {};

    function getCurrentLang() {
        const byParam = new URLSearchParams(window.location.search).get("lang");
        if (byParam && SUPPORTED_LANGS.has(byParam)) {
            return byParam;
        }
        const byDoc = document.documentElement.getAttribute("lang");
        if (byDoc && SUPPORTED_LANGS.has(byDoc)) {
            return byDoc;
        }
        return "en";
    }

    const modal = document.getElementById("family-carousel");
    const image = document.getElementById("carousel-image");
    const caption = document.getElementById("carousel-caption");
    const count = document.getElementById("carousel-count");
    const prevBtn = document.getElementById("carousel-prev");
    const nextBtn = document.getElementById("carousel-next");
    const closeBtn = document.getElementById("carousel-close");
    const dotsWrap = document.getElementById("carousel-dots");
    const openers = document.querySelectorAll(".open-carousel");
    let index = 0;
    let lastFocus = null;

    function setSlide(nextIndex) {
        index = (nextIndex + slides.length) % slides.length;
        const slide = slides[index];
        const lang = getCurrentLang();
        const langCaptions = captionsByLang[lang];

        image.src = slide.src;
        image.alt = slide.alt;
        image.width = slide.width;
        image.height = slide.height;

        caption.textContent = (langCaptions && langCaptions[index]) || slide.caption;
        count.textContent = (index + 1) + " / " + slides.length;
        dotsWrap.querySelectorAll(".carousel-dot").forEach((dot, dotIndex) => {
            dot.classList.toggle("active", dotIndex === index);
            dot.setAttribute("aria-current", dotIndex === index ? "true" : "false");
        });
    }

    function openCarousel(startIndex) {
        lastFocus = document.activeElement;
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        setSlide(startIndex);
        closeBtn.focus();
    }

    function closeCarousel() {
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        if (lastFocus) {
            lastFocus.focus();
        }
    }

    slides.forEach((_, dotIndex) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", "Go to image " + (dotIndex + 1));
        dot.addEventListener("click", function () {
            setSlide(dotIndex);
        });
        dotsWrap.appendChild(dot);
    });

    openers.forEach((button) => {
        button.addEventListener("click", function () {
            openCarousel(Number(button.dataset.index || 0));
        });
    });

    prevBtn.addEventListener("click", function () {
        setSlide(index - 1);
    });

    nextBtn.addEventListener("click", function () {
        setSlide(index + 1);
    });

    closeBtn.addEventListener("click", closeCarousel);

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeCarousel();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (modal.getAttribute("aria-hidden") === "true") {
            return;
        }
        if (event.key === "Escape") {
            closeCarousel();
        } else if (event.key === "ArrowLeft") {
            setSlide(index - 1);
        } else if (event.key === "ArrowRight") {
            setSlide(index + 1);
        }
    });

    document.addEventListener("site:langchange", function () {
        setSlide(index);
    });

    setSlide(0);
})();
