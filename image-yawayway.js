// Cyberpunk 2049: Wayway Edition image carousel logic
const carouselData = [
    {
        type: 'image',
        img: 'my-name-is-mud.webp',
        captionKey: 'My Name is Mud'
    },
    {
        type: 'image',
        img: 'i-agree-piss-ham-wak-skippies.webp',
        captionKey: 'I Agree Piss Ham Wak Skippies'
    },
    {
        type: 'video',
        videoId: 'E6JQwjdxn4M',
        thumbnail: 'angulfullpower.webp',
        captionKey: 'New YouTube video'
    },
    {
        type: 'image',
        img: 'deadman-walkin.gif',
        captionKey: 'Deadman Walkin'
    },
    {
        type: 'image',
        img: 'chinese-dragon-cup.webp',
        captionKey: 'Chinese Dragon Cup'
    },
    {
        type: 'image',
        img: 'other-dragon-cup.webp',
        captionKey: 'Other Dragon Cup'
    },
    {
        type: 'image',
        img: 'train-nowayway.webp',
        captionKey: 'Train Nowayway'
    },
    {
        type: 'image',
        img: 'cyberpunk-deathnote.webp',
        captionKey: 'Cyberpunk Deathnote'
    },
    {
        type: 'image',
        img: 'tweet-2057398690810036569.webp',
        captionKey: 'power'
    },
    {
        type: 'image',
        img: 'tweet-2057398693184110759.webp',
        captionKey: 'only power'
    }
];

const AIWW_DESC_KEY = "sometimes... you know... i think... if.. that's probably...";
const YT_VIDEO_ID = 'E6JQwjdxn4M';

let current = 0;
let overlay;
let carouselImg;
let carouselCaption;
let returnBtn;
let desc;
let galleryItems;
let videoShell;
let videoIframe;

function getLang() {
    const url = new URL(window.location.href);
    const lang = url.searchParams.get('lang');
    if (lang && ['en', 'fr', 'es', 'ar', 'fa', 'zh'].includes(lang)) {
        return lang;
    }

    const stored = window.localStorage.getItem('site_lang');
    if (stored && ['en', 'fr', 'es', 'ar', 'fa', 'zh'].includes(stored)) {
        return stored;
    }

    const htmlLang = document.documentElement.lang;
    if (['en', 'fr', 'es', 'ar', 'fa', 'zh'].includes(htmlLang)) {
        return htmlLang;
    }

    return 'en';
}

function getAiwwTranslation(bucket, key, lang, fallback) {
    const source = window.__AIWW_TRANSLATIONS || {};
    const values = source[bucket] || {};
    const entry = values[key] || {};
    return entry[lang] || entry.en || fallback || key;
}

function getCurrentItem() {
    return carouselData[current];
}

function getVideoEmbedUrl() {
    return `https://www.youtube.com/embed/${YT_VIDEO_ID}?si=xEPJjnil6txEAyo5&rel=0&playsinline=1&controls=0&modestbranding=1&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`;
}

function updateCarousel() {
    const lang = getLang();
    if (!carouselImg || !carouselCaption || !returnBtn || !desc || !videoShell) {
        return;
    }

    const currentItem = getCurrentItem();
    const isVideoSlide = Boolean(currentItem && currentItem.type === 'video');
    const canRenderVideo = isVideoSlide && Boolean(videoIframe);
    const caption = getAiwwTranslation('captions', currentItem.captionKey, lang, currentItem.captionKey);

    carouselImg.src = isVideoSlide ? currentItem.thumbnail : currentItem.img;
    carouselImg.alt = caption;
    carouselCaption.textContent = caption;
    returnBtn.textContent = getAiwwTranslation('ui', 'Return', lang, 'Return');
    desc.textContent = getAiwwTranslation('ui', AIWW_DESC_KEY, lang, AIWW_DESC_KEY);

    carouselImg.hidden = canRenderVideo;
    videoShell.hidden = !canRenderVideo;
    videoShell.classList.toggle('active', canRenderVideo);

    if (canRenderVideo && !videoIframe.src) {
        videoIframe.src = getVideoEmbedUrl();
    }
}

function prevSlide() {
    current = (current - 1 + carouselData.length) % carouselData.length;
    updateCarousel();
}

function nextSlide() {
    current = (current + 1) % carouselData.length;
    updateCarousel();
}

function openCarousel(index) {
    current = index;
    updateCarousel();

    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeCarousel() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

window.addEventListener('DOMContentLoaded', () => {
    overlay = document.getElementById('wayway-carousel');
    carouselImg = document.getElementById('carousel-img');
    carouselCaption = document.getElementById('carousel-caption');
    returnBtn = document.getElementById('return-btn');
    desc = document.getElementById('desc');
    videoShell = document.getElementById('carousel-video-shell');
    videoIframe = document.getElementById('carousel-video-player') || document.getElementById('he-is-legend-player');
    galleryItems = Array.from(document.querySelectorAll('.gallery > div'));

    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    if (!overlay || !carouselImg || !carouselCaption || !returnBtn || !desc || !videoShell || !prevBtn || !nextBtn || galleryItems.length === 0) {
        return;
    }

    updateCarousel();

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openCarousel(index);
        });
    });

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    returnBtn.addEventListener('click', closeCarousel);

    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            closeCarousel();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (!overlay.classList.contains('open')) {
            return;
        }

        if (event.key === 'Escape') {
            closeCarousel();
            return;
        }

        if (event.key === 'ArrowLeft') {
            prevSlide();
            return;
        }

        if (event.key === 'ArrowRight') {
            nextSlide();
        }
    });

    document.addEventListener('site:langchange', () => {
        updateCarousel();
    });
});
