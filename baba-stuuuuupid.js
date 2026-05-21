(function () {
    "use strict";

    const SUPPORTED_LANGS = new Set(["en", "fr", "es", "ar", "fa", "zh"]);
    const SEP_KUN_ANTA_POEM = "I love you.\nI love you more.\nI love you the most.\nI love you to infinity and further.\nI love you forever and ever and ever and ever.\nI love you more than whatever you said, and whatever you're gonna say.\nI love you more than whatever I said, and whatever I'm gonna say.\nI love more than these things, these words.\nI love you more than all those other people, all those other birds.\nI love you beyond distance and time, gravity, light and any matter that keeps everyone happy to be alive.\nI love you as much as Heaven Sepideh Akbari.\nYou are the Goddess of my Life.\nYou are my Goddess of Heaven for as long as You permit Me.\n\nLove You More 🤍 by Baba";
    const SEP_KUN_ANTA_POEM_FR = "Je t'aime.\nJe t'aime davantage.\nJe t'aime le plus.\nJe t'aime jusqu'a l'infini et au-dela.\nJe t'aime pour toujours et encore et encore et encore.\nJe t'aime plus que tout ce que tu as dit, et tout ce que tu vas dire.\nJe t'aime plus que tout ce que j'ai dit, et tout ce que je vais dire.\nJ'aime plus que ces choses, que ces mots.\nJe t'aime plus que toutes ces autres personnes, tous ces autres oiseaux.\nJe t'aime au-dela de la distance et du temps, de la gravite, de la lumiere et de toute matiere qui garde chacun heureux d'etre en vie.\nJe t'aime autant que le Ciel, Sepideh Akbari.\nTu es la Deesse de ma Vie.\nTu es ma Deesse du Ciel aussi longtemps que Tu me le permets.\n\nJe t'aime plus 🤍 par Baba";
    const SEP_KUN_ANTA_POEM_ES = "Te amo.\nTe amo mas.\nTe amo muchisimo.\nTe amo hasta el infinito y mas alla.\nTe amo por siempre y para siempre y para siempre y para siempre.\nTe amo mas que cualquier cosa que dijiste, y cualquier cosa que vas a decir.\nTe amo mas que cualquier cosa que dije, y cualquier cosa que voy a decir.\nAmo mas que estas cosas, estas palabras.\nTe amo mas que toda esa otra gente, todas esas otras aves.\nTe amo mas alla de la distancia y el tiempo, la gravedad, la luz y cualquier materia que mantiene feliz a todos por estar vivos.\nTe amo tanto como al Cielo, Sepideh Akbari.\nEres la Diosa de mi Vida.\nEres mi Diosa del Cielo por todo el tiempo que Tu me lo permitas.\n\nTe amo mas 🤍 por Baba";
    const SEP_KUN_ANTA_POEM_AR = "انا احبك.\nانا احبك اكثر.\nانا احبك اكثر شيء.\nانا احبك الى ما لا نهاية وما بعدها.\nانا احبك الى الابد والابد والابد والابد.\nانا احبك اكثر من كل ما قلته، وكل ما ستقولينه.\nانا احبك اكثر من كل ما قلته انا، وكل ما ساقوله.\nانا احب اكثر من هذه الاشياء، من هذه الكلمات.\nانا احبك اكثر من كل اولئك الناس، وكل تلك الطيور الاخرى.\nانا احبك بما يتجاوز المسافة والزمن، والجاذبية، والضوء، واي مادة تجعل الجميع سعداء بانهم احياء.\nانا احبك بقدر السماء يا سبيده اكبري.\nانت الهة حياتي.\nانت الهة سمائي ما دمت تسمحين لي.\n\nاحبك اكثر 🤍 بقلم Baba";
    const SEP_KUN_ANTA_POEM_FA = "دوستت دارم.\nبيشتر دوستت دارم.\nاز همه بيشتر دوستت دارم.\nتا بي نهايت و فراتر از آن دوستت دارم.\nتا ابد و ابد و ابد و ابد دوستت دارم.\nبيشتر از هر چه گفتي و هر چه خواهي گفت دوستت دارم.\nبيشتر از هر چه من گفتم و هر چه خواهم گفت دوستت دارم.\nبيش از اين چيزها، اين واژه ها، دوست داشتن را دوست دارم.\nبيشتر از تمام آن آدم هاي ديگر و تمام آن پرنده هاي ديگر دوستت دارم.\nفراتر از فاصله و زمان، جاذبه، نور و هر ماده اي که همه را از زنده بودن شاد مي کند دوستت دارم.\nبه اندازه آسمان، سپيده اکبري، دوستت دارم.\nتو الهه زندگي مني.\nتو الهه آسمان مني تا هر زمان که اجازه بدهی.\n\nبيشتر دوستت دارم 🤍 از Baba";
    const SEP_KUN_ANTA_POEM_ZH = "我爱你。\n我更爱你。\n我最爱你。\n我爱你直到无限，直到更远。\n我永远永远永远永远爱你。\n我爱你，胜过你说过的一切，也胜过你将要说的一切。\n我爱你，胜过我说过的一切，也胜过我将要说的一切。\n我爱的，胜过这些事物，胜过这些词句。\n我爱你，胜过所有那些别人，所有那些别的鸟儿。\n我爱你，超越距离与时间，超越重力、光，以及一切让人因活着而幸福的物质。\n我像爱天空一样爱你，Sepideh Akbari。\n你是我生命的女神。\n只要你允许，你就是我天国的女神。\n\n我更爱你 🤍 by Baba";

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
            caption: "think it through one and two   [1 2]\nthree and four, five no more    [3 4 5]\nnow count to six, easy fix         [6]\ntake another, up to seven         [7]\njust wait, now i have eight        [8]\nnine for mother,                         [9]\nwe start all over, oh brother!  [10]\n\nwhy is he smart now? by Sep Jr.",
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
            caption: SEP_KUN_ANTA_POEM,
            width: 1280,
            height: 720
        }
    ];

    const captionsByLang = {
        fr: [
            "plie en deux, baba pete plein de caca,\nil est un chien qui bave,\non le jette dans l'eau,\nil est si gros qu'il remplit toute la piscine !\n\nbabaa est un punkin stuuuupide par Sep Jr.",
            "baba sent mauvais, baba est caca\npuis-je avoir un nouveau baba\ns'il ne t'aime pas !?\nqu'est-ce qu'on va faire...\nmumma est jolie, mumma est gentille\nmumma merite le meilleur homme\npas un bloc de glace\n\nmum you look par Sep Jr.",
            "(ce n'est pas un poeme)\n(t'es stuuupide beurk!!!! hm)\n\na stinky par Sep Jr.",
            "reflechis bien un et deux   [1 2]\ntrois et quatre, cinq pas plus    [3 4 5]\nmaintenant compte jusqu'a six, facile         [6]\nencore un, jusqu'a sept         [7]\nattends, maintenant j'ai huit        [8]\nneuf pour maman,                         [9]\non recommence tout, oh frere !  [10]\n\npourquoi est-il intelligent maintenant ? par Sep Jr.",
            "Presse rose, femininite errante parmi le feuillage\nDu saule et du tact comme l'epine\nLes yeux admirent sa grace givilin\nElle est frenetique et serviable\nVisible, un regime d'amour unique\nFete libre et arbre de famille\nElle est forte et parfaitement\n\nJovial Neemanthemum par Baba",
            "Joyeuse bien-aimee de l'ame\nAlors que ses anges convoitent plus de vie\nCoeur dore, mepris du coeur et reves pleins\nElle me cache dans le fourre, bonté\nLe vert pres de son coeur, liberte\n\nToujours en croissance, l'instant sans mots et sans temps\n\nBrun bartollean, chaleur de la nature qui se cache et s'efface, racines non biseautees, profondeur, vert heliotrope, notre temps se deploie en racontant et murmurant, bourgeons engendres, ampleur, bleu pastachian, son amour va et vient partout, souvent libere, prosperant et tamisant toujours, fleurs petalees.\n\nVers l'etroit chemin droit, elle\nVers le haut noyau de merveille, lui\n\nAvcoscious Valor par Baba",
            SEP_KUN_ANTA_POEM_FR
        ],
        es: [
            "doblalo en dos, baba se tira un pedo lleno de popo,\nes un perro y babea,\nlo lanzamos al agua,\nes tan gordo que llena toda la piscina!\n\nbabaa es un punkin estuuuupido por Sep Jr.",
            "baba apesta, baba es popo\npuedo tener un baba nuevo\nsi no te ama!?\nque vamos a hacer...\nmumma es bonita, mumma es muy buena\nmumma merece al mejor hombre\nno un bloque de hielo\n\nmum you look por Sep Jr.",
            "(eso no es un poema)\n(eres estuuuupido puaj!!!! hm)\n\na stinky por Sep Jr.",
            "piensalo bien uno y dos   [1 2]\ntres y cuatro, cinco no mas    [3 4 5]\nahora cuenta hasta seis, facil         [6]\notro mas, hasta siete         [7]\nespera, ahora tengo ocho        [8]\nnueve para mama,                         [9]\ncomenzamos de nuevo, oh hermano!  [10]\n\npor que es inteligente ahora? por Sep Jr.",
            "Rosa prensada, feminidad errante entre follaje\nDel sauce y el tacto como la espina\nLos ojos admiran su gracia givilin\nElla es frenetica y servicial\nNotable, un regimen de amor de una\nFiesta libre y arbol familiar\nElla es fuerte y perfectamente\n\nJovial Neemanthemum por Baba",
            "Alegre amada del alma\nMientras sus angeles anhelan mas vida\nDesden dorado del corazon y suenos colmados\nElla me esconde en la maleza, bondad\nEl verde cerca de Su Corazon, libertad\n\nSiempre crece, el momento sin palabras y sin tiempo\n\nMarron bartollean, el calor de la naturaleza escondiendose y apartandose, raices sin bisel, profundidad, verde heliotropo, nuestro tiempo se despliega contando y bebiendo, brotes engendrados, amplitud, azul pastachian, su amor sube y baja por todas partes, a menudo liberado, prosperando y filtrando siempre, flores de petalos.\n\nHacia lo angosto y recto, ella\nHacia arriba y al nucleo alto de maravilla, el\n\nAvcoscious Valor por Baba",
            SEP_KUN_ANTA_POEM_ES
        ],
        ar: [
            "اطوه نصفين، بابا ضرطة مليانة بوو،\nهو كلب ويسيل لعابه،\nنرميه في الماء،\nهو سمين جدًا لدرجة أنه يملأ المسبح كله!\n\nباباا قرعة غبية جدًا بقلم Sep Jr.",
            "بابا ريحته سيئة، بابا بوو\nهل يمكنني الحصول على بابا جديد\nإذا لم يحبك!?\nماذا سنفعل...\nماما جميلة وماما لطيفة\nماما تستحق أفضل رجل\nوليس كتلة من الجليد\n\nmum you look بقلم Sep Jr.",
            "(هذا ليس قصيدة)\n(أنت غبيييي مقرف!!!! هم)\n\na stinky بقلم Sep Jr.",
            "فكر فيها واحد واثنان   [1 2]\nثلاثة وأربعة، خمسة لا أكثر    [3 4 5]\nالآن عد إلى ستة، أمر سهل         [6]\nخذ واحدًا آخر، حتى سبعة         [7]\nانتظر، الآن لدي ثمانية        [8]\nتسعة للأم،                         [9]\nنبدأ من جديد، يا أخي!  [10]\n\nلماذا صار ذكيًا الآن؟ بقلم Sep Jr.",
            "وردة مضغوطة، أنوثة تائهة بين الأوراق\nمن الصفصاف واللباقة مثل الشوكة\nالعيون تتأمل نعمتها الجيفيلين\nهي مندافعة ومفيدة\nملحوظ، نظام حب لشخص واحد\nحفلة حرة وشجرة عائلة\nهي قوية وبشكل مثالي\n\nJovial Neemanthemum بقلم Baba",
            "بهجة محبوبة من الروح\nبينما تتوق ملائكته إلى مزيد من الحياة\nقلب ذهبي وازدراء قلبي وأحلام عامرة\nتخفيني في الغيضة، يا للخير\nالخضرة قرب قلبها، حرية\n\nينمو للأبد، اللحظة بلا كلمات وبلا زمن\n\nبني بارتولي، دفء الطبيعة يختبئ ويخجل، جذور بلا حواف مشطوفة، عمق، أخضر هيليوتروب، زمننا ينفتح وهو يروي الآن، براعم مولودة، سعة، أزرق باستاشيان، حبها مد وجزر في كل مكان، متحرر غالبًا، يزدهر ويغربل دائمًا، أزهار بتلات.\n\nإلى الضيق المستقيم، هي\nإلى الأعلى وإلى نواة العجب العالية، هو\n\nAvcoscious Valor بقلم Baba",
            SEP_KUN_ANTA_POEM_AR
        ],
        fa: [
            "تا کن به دو، بابا پر از پی پی گوز می زند،\nاو یک سگ است و آب دهان می ریزد،\nاو را در آب می اندازیم،\nآن قدر چاق است که کل استخر را پر می کند!\n\nباباا یک کدوی خییلی احمق از Sep Jr.",
            "بابا بدبو است، بابا پی پی است\nمی توانم یک بابای جدید داشته باشم\nاگر تو را دوست نداشته باشد!?\nحالا باید چه کار کنیم...\nمامان خوشگل است، مامان خیلی مهربان است\nمامان بهترین مرد را سزاوار است\nنه یک تکه یخ\n\nmum you look از Sep Jr.",
            "(این شعر نیست)\n(تو خییلی احمقی چندش!!!! هم)\n\na stinky از Sep Jr.",
            "با دقت فکر کن یک و دو   [1 2]\nسه و چهار، پنج دیگر نه    [3 4 5]\nحالا تا شش بشمار، آسان است         [6]\nیکی دیگر، تا هفت         [7]\nصبر کن، حالا هشت دارم        [8]\nنه برای مادر،                         [9]\nدوباره از اول شروع می کنیم، ای برادر!  [10]\n\nچرا حالا باهوش شده؟ از Sep Jr.",
            "گل رز فشرده، زنانگی سرگردان در میان شاخ و برگ\nاز بید و نزاکت همچون خار\nچشم ها به لطف گیویلین او خیره می شوند\nاو پرهیجان و یاریگر است\nنمایان، آیین عشقی یک نفره\nمهمانی آزاد و درخت خانواده\nاو نیرومند و کاملا است\n\nJovial Neemanthemum از Baba",
            "شادمانی محبوب جان\nآنگاه که فرشتگانش زندگی بیشتری می طلبند\nخوارشماری زرین دل و رویاهای لبریز دل\nاو مرا در بیشه پنهان می کند، نیکی\nسبزی نزدیک قلب او، آزادی\n\nهمواره می روید، لحظه ی بی واژه و بی زمان\n\nقهوه ای بارتولین، گرمای طبیعت که پنهان و خجالتی می شود، ریشه های بی پخ، ژرفا، سبز هلیوتروپ، زمان ما اکنون با گفتن و نوشیدن گشوده می شود، جوانه های زاده، پهنا، آبی پاستاشین، عشق او همه جا جزر و مد دارد، بارها رها، همیشه شکوفا و پالاینده، گل های گلبرگ دار.\n\nسوی تنگی و راستی، او\nسوی بالا و هسته شگفتی بلند، او\n\nAvcoscious Valor از Baba",
            SEP_KUN_ANTA_POEM_FA
        ],
        zh: [
            "折成两半，baba 放了个满是便便的屁，\n他像只狗还流口水，\n我们把他扔进水里，\n他太胖了，把整座泳池都填满了！\n\n《babaa 是个超蠢南瓜》作者：Sep Jr.",
            "baba 很臭，baba 是便便\n我可以要一个新的 baba 吗\n如果他不爱你!?\n我们到底该怎么办...\nmumma 很漂亮，mumma 很好\nmumma 值得最好的男人\n而不是什么冰块\n\n《mum you look》作者：Sep Jr.",
            "（那不是诗）\n（你超超蠢，呃啊!!!! 嗯）\n\n《a stinky》作者：Sep Jr.",
            "想清楚，一和二   [1 2]\n三和四，五就到这    [3 4 5]\n现在数到六，很容易         [6]\n再来一个，到七         [7]\n等一下，现在我有八        [8]\n九给妈妈，                         [9]\n我们重来一次，哦兄弟！  [10]\n\n《他为什么现在聪明了？》作者：Sep Jr.",
            "压着玫瑰般的女性气息在叶影中游走\n像柳树与荆棘那样带着分寸\n双眼惊叹她的 givilin 优雅\n她慌忙却总在帮人\n显而易见，一人独享的爱之秩序\n自由的派对与家族树\n她强大而且完整\n\n《Jovial Neemanthemum》作者：Baba",
            "灵魂所爱的欢悦\n当她的天使渴求更多生命\n金色的心之轻蔑与满心梦境\n她把我藏在灌木深处，善意\n她心旁的绿色，自由\n\n永远生长，那无言、无时的瞬间\n\nBartollean 棕，大地温暖在躲藏与羞怯，无倒角的根系，深度，Heliotrope 绿，我们的时间此刻在倾诉与微醺中展开，被孕生的花苞，广度，Pastachian 蓝，她的爱在各处潮起潮落，常被释放，始终繁盛并筛落，花瓣之花。\n\n向着狭窄而笔直，她\n向上并向高耸奇想核心，他\n\n《Avcoscious Valor》作者：Baba",
            SEP_KUN_ANTA_POEM_ZH
        ]
    };

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

    setSlide(0);
})();
