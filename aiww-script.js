// Cyberpunk 2049: Wayway Edition Carousel & Translations
const carouselData = [
    {
        img: 'my-name-is-mud.webp',
        captions: {
            en: 'My Name is Mud',
            fr: 'Mon nom est Mud',
            es: 'Me llamo Mud',
            ar: 'اسمي ماد',
            fa: 'اسم من ماد است',
            zh: '我的名字是泥巴'
        }
    },
    {
        img: 'i-agree-piss-ham-wak-skippies.webp',
        captions: {
            en: 'I Agree Piss Ham Wak Skippies',
            fr: 'Je suis d’accord Piss Ham Wak Skippies',
            es: 'Estoy de acuerdo Piss Ham Wak Skippies',
            ar: 'أنا أوافق Piss Ham Wak Skippies',
            fa: 'من موافقم Piss Ham Wak Skippies',
            zh: '我同意 Piss Ham Wak Skippies'
        }
    },
    {
        img: 'deadman-walkin.gif',
        captions: {
            en: 'Deadman Walkin',
            fr: 'Homme mort qui marche',
            es: 'Hombre muerto caminando',
            ar: 'رجل ميت يمشي',
            fa: 'مرد مرده راه می‌رود',
            zh: '行走的死人'
        }
    },
    {
        img: 'chinese-dragon-cup.webp',
        captions: {
            en: 'Chinese Dragon Cup',
            fr: 'Coupe dragon chinoise',
            es: 'Copa de dragon china',
            ar: 'كوب التنين الصيني',
            fa: 'جام اژدهای چینی',
            zh: '中国龙杯'
        }
    },
    {
        img: 'other-dragon-cup.webp',
        captions: {
            en: 'Other Dragon Cup',
            fr: 'Autre coupe dragon',
            es: 'Otra copa de dragon',
            ar: 'كوب التنين الآخر',
            fa: 'جام اژدهای دیگر',
            zh: '另一个龙杯'
        }
    }
];
const returnBtnText = {
    en: 'Return',
    fr: 'Retour',
    es: 'Regresar',
    ar: 'عودة',
    fa: 'بازگشت',
    zh: '返回'
};
const descText = {
    en: 'sometimes... you know... i think... if.. that\'s probably...',
    fr: 'parfois... tu sais... je pense... si... c\'est probablement...',
    es: 'a veces... sabes... pienso... si... probablemente...',
    ar: 'أحيانًا... كما تعلم... أعتقد... إذا... ربما...',
    fa: 'گاهی... می‌دونی... فکر می‌کنم... اگر... احتمالاً...',
    zh: '有时候...你知道...我想...如果...大概是这样...'
};
let current = 0;
let overlay;
let carouselImg;
let carouselCaption;
let returnBtn;
let desc;
let galleryItems;

function getLang() {
    // Check URL parameter first
    const url = new URL(window.location.href);
    const lang = url.searchParams.get('lang');
    if (lang && ['en','fr','es','ar','fa','zh'].includes(lang)) return lang;
    
    // Check localStorage (set by languages-open-menu.js)
    const stored = window.localStorage.getItem('site_lang');
    if (stored && ['en','fr','es','ar','fa','zh'].includes(stored)) return stored;
    
    // Check HTML lang attribute
    const htmlLang = document.documentElement.lang;
    if (['en','fr','es','ar','fa','zh'].includes(htmlLang)) return htmlLang;
    
    return 'en';
}

function getBaseName(path) {
    return path.split('/').pop().split('?')[0];
}

function findSlideIndexFromMedia(mediaElement) {
    const clickedName = getBaseName(mediaElement.getAttribute('src') || '');
    const matchIndex = carouselData.findIndex((item) => (item.img || item.video) === clickedName);
    return matchIndex >= 0 ? matchIndex : 0;
}

function updateCarousel() {
    const lang = getLang();
    if (!carouselImg || !carouselCaption || !returnBtn || !desc) {
        return;
    }
    const currentItem = carouselData[current];
    carouselImg.src = currentItem.img;
    carouselCaption.textContent = currentItem.captions[lang] || currentItem.captions['en'];
    returnBtn.textContent = returnBtnText[lang] || returnBtnText['en'];
    desc.textContent = descText[lang] || descText['en'];
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
    galleryItems = Array.from(document.querySelectorAll('.gallery img'));
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    if (!overlay || !carouselImg || !carouselCaption || !returnBtn || !desc || !prevBtn || !nextBtn || galleryItems.length === 0) {
        return;
    }

    updateCarousel();

    galleryItems.forEach((mediaElement) => {
        mediaElement.addEventListener('click', () => {
            openCarousel(findSlideIndexFromMedia(mediaElement));
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
        } else if (event.key === 'ArrowLeft') {
            prevSlide();
        } else if (event.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Listen for language changes from languages-open-menu.js
    document.addEventListener('site:langchange', (event) => {
        updateCarousel();
    });
});
