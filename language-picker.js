(function () {
    "use strict";

    var SUPPORTED_LANGS = ["en", "fr", "es", "ar", "fa", "zh"];
    var RTL_LANGS = ["ar", "fa"];
    var STORAGE_KEY = "site_lang";
    var currentLang = "en";
    var AUTO_TRANSLATIONS = {
        "← Back": { ar: "← رجوع", fa: "← بازگشت", zh: "← 返回" },
        "For Simple Navigation [embedded]": { ar: "لتصفح بسيط [مضمن]", fa: "برای ناوبری ساده [تعبیه‌شده]", zh: "用于简单导航 [嵌入]" },
        "emoji hell to heaven summary [fun]": { ar: "ملخص ايموجي من الجحيم الى الجنة [مرح]", fa: "خلاصه ايموجی از جهنم تا بهشت [سرگرم‌کننده]", zh: "emoji 地狱到天堂总结 [有趣]" },
        "pewdie mars - bruno pie! [YouTube Playlist] [historical]": { ar: "pewdie mars - bruno pie! [قائمة يوتيوب] [تاريخي]", fa: "pewdie mars - bruno pie! [فهرست پخش یوتیوب] [تاریخی]", zh: "pewdie mars - bruno pie! [YouTube 播放列表] [历史]" },
        "He Is Legend Mouck Shudow [YouTube] [historical]": { ar: "He Is Legend Mouck Shudow [يوتيوب] [تاريخي]", fa: "He Is Legend Mouck Shudow [یوتیوب] [تاریخی]", zh: "He Is Legend Mouck Shudow [YouTube] [历史]" },
        "Kuna Anta My Heart [YouTube]": { ar: "Kuna Anta قلبي [يوتيوب]", fa: "Kuna Anta قلب من [یوتیوب]", zh: "Kuna Anta 我的心 [YouTube]" },
        "hack the universe [YouTube Playlist]": { ar: "اخترق الكون [قائمة يوتيوب]", fa: "هک جهان [فهرست پخش یوتیوب]", zh: "hack the universe [YouTube 播放列表]" },
        "posts, toasts and roasts [Twitter]": { ar: "منشورات ونخبات وتحميصات [تويتر]", fa: "پست ها، نان تست ها و کباب ها [توییتر]", zh: "帖子、敬酒与吐槽 [Twitter]" },
        "big genius ai [GitHub preview]": { ar: "big genius ai [معاينة GitHub]", fa: "big genius ai [پیش‌نمایش GitHub]", zh: "big genius ai [GitHub 预览]" },
        "chessnuts [chess] [bing chillin] [YouTube]": { ar: "chessnuts [شطرنج] [bing chillin] [يوتيوب]", fa: "chessnuts [شطرنج] [bing chillin] [یوتیوب]", zh: "chessnuts [国际象棋] [bing chillin] [YouTube]" },
        "barbiecore collage [pink carousel]": { ar: "barbiecore collage [دوار وردي]", fa: "barbiecore collage [کاروسل صورتی]", zh: "barbiecore collage [粉色轮播]" },
        "Embedded Content | in-a-nut-s-hell.fyi": { ar: "محتوى مضمن | in-a-nut-s-hell.fyi", fa: "محتوای تعبیه‌شده | in-a-nut-s-hell.fyi", zh: "嵌入内容 | in-a-nut-s-hell.fyi" },
        "Barbiecore Collage Carousel | in-a-nut-s-hell.fyi": { ar: "دوار كولاج باربيكور | in-a-nut-s-hell.fyi", fa: "کاروسل کلاژ Barbiecore | in-a-nut-s-hell.fyi", zh: "Barbiecore 拼贴轮播 | in-a-nut-s-hell.fyi" },
        "Pink Surprise Button 💖🎀🌸✨🧸👛🩷": { ar: "زر المفاجأة الوردي 💖🎀🌸✨🧸👛🩷", fa: "دکمه شگفتی صورتی 💖🎀🌸✨🧸👛🩷", zh: "粉色惊喜按钮 💖🎀🌸✨🧸👛🩷" },
        "Princess mode activated. Pink guy has arrived. 💅🌷✨": { ar: "تم تفعيل وضع الاميرة. وصل الرجل الوردي. 💅🌷✨", fa: "حالت پرنسس فعال شد. مرد صورتی رسید. 💅🌷✨", zh: "公主模式已启动。粉红男孩已到达。💅🌷✨" },
        "Close image": { ar: "اغلاق الصورة", fa: "بستن تصویر", zh: "关闭图片" },
        "Close image viewer": { ar: "اغلاق عارض الصور", fa: "بستن نمایشگر تصویر", zh: "关闭图片查看器" },
        "Expanded image": { ar: "صورة مكبرة", fa: "تصویر بزرگ‌شده", zh: "放大图片" },
        "YouTube Playlist": { ar: "قائمة يوتيوب", fa: "فهرست پخش یوتیوب", zh: "YouTube 播放列表" },
        "Featured Video": { ar: "فيديو مميز", fa: "ویدیوی ویژه", zh: "精选视频" },
        "Legendary YouTube Content": { ar: "محتوى يوتيوب اسطوري", fa: "محتوای افسانه‌ای یوتیوب", zh: "传奇 YouTube 内容" },
        "Return to videos": { ar: "العودة الى الفيديوهات", fa: "بازگشت به ویدیوها", zh: "返回视频" },
        "Video playback controls": { ar: "عناصر تحكم تشغيل الفيديو", fa: "کنترل‌های پخش ویدیو", zh: "视频播放控件" },
        "Breadcrumb": { ar: "مسار التنقل", fa: "مسیر راهنما", zh: "面包屑导航" },
        "Page Not Found": { ar: "الصفحة غير موجودة", fa: "صفحه پیدا نشد", zh: "页面未找到" },
        "404 - Page Not Found - Go back?": { ar: "404 - الصفحة غير موجودة - العودة؟", fa: "404 - صفحه پیدا نشد - بازگشت؟", zh: "404 - 页面未找到 - 返回？" },
        "Twitter [english]": { ar: "تويتر [الانجليزية]", fa: "توییتر [انگلیسی]", zh: "Twitter [英文]" },
        "in-a-nut-s-hell.fyi | Curated Links, Videos, and Digital Art": { ar: "in-a-nut-s-hell.fyi | روابط منسقة وفيديوهات وفن رقمي", fa: "in-a-nut-s-hell.fyi | لینک های گزینش شده، ویدیوها و هنر دیجیتال", zh: "in-a-nut-s-hell.fyi | 精选链接、视频与数字艺术" },
        "sometimes... you know... i think... if.. that's probably...": { ar: "أحياناً... تعرف... أظن... إذا... فغالباً...", fa: "گاهی... می دانی... فکر می کنم... اگر... احتمالاً...", zh: "有时候……你知道……我想……如果……大概就是这样……" },
        "A cute pink collage that opens into a swipeable carousel of the latest tweet snapshots.": { ar: "كولاج وردي لطيف يفتح إلى دوار قابل للسحب يضم أحدث لقطات التغريدات.", fa: "یک کلاژ صورتی بامزه که به یک کاروسل قابل کشیدن از تازه ترین اسنپ شات های توییت باز می شود.", zh: "一个可爱的粉色拼贴，会打开为可滑动轮播，展示最新推文截图。" },
        "Barbiecore Memory Board": { ar: "لوحة ذكريات باربيكور", fa: "تابلوی خاطرات باربیکور", zh: "芭比核心回忆板" },
        "Five latest tweet snapshots, sorted by date in the PNG filename, styled like a sticker collage. Tap any tile to open the carousel.": { ar: "أحدث خمس لقطات تغريدات، مرتبة حسب التاريخ في اسم ملف PNG، ومصممة ككولاج ملصقات. اضغط أي بطاقة لفتح الدوار.", fa: "پنج اسنپ شات آخر توییت، مرتب شده بر اساس تاریخ در نام فایل PNG و با سبک کلاژ برچسبی. برای باز کردن کاروسل روی هر کاشی بزنید.", zh: "最新五张推文截图，按 PNG 文件名中的日期排序，并设计成贴纸拼贴风格。点击任意卡片即可打开轮播。" },
        "Come on Barbie, let us go party... in a responsible image gallery.": { ar: "هيا يا باربي، لنذهب للاحتفال... في معرض صور مسؤول.", fa: "بیا باربی، بریم جشن... در یک گالری تصویر مسئولانه.", zh: "来吧芭比，我们去派对吧……在一个负责任的图片画廊里。" },
        "Barbie collage gallery": { ar: "معرض كولاج باربي", fa: "گالری کلاژ باربی", zh: "芭比拼贴画廊" },
        "Pink alert level: iconic": { ar: "مستوى التنبيه الوردي: أيقوني", fa: "سطح هشدار صورتی: نمادین", zh: "粉色警报等级：标志级" },
        "Main character energy only": { ar: "طاقة الشخصية الرئيسية فقط", fa: "فقط انرژی شخصیت اصلی", zh: "只要主角气场" },
        "This dreamhouse has receipts": { ar: "بيت الأحلام هذا يملك الأدلة", fa: "این خانه رویایی مدرک دارد", zh: "这座梦幻屋有凭据" },
        "Glossy, bossy, and unbothered": { ar: "لامع، قيادي، وغير مكترث", fa: "براق، قدرتمند و بی خیال", zh: "闪亮、强势、毫不在意" },
        "Newest sparkle in the lineup": { ar: "أحدث لمعة في التشكيلة", fa: "تازه ترین درخشش در مجموعه", zh: "阵容里最新的闪耀" },
        "Use arrow keys in the modal to move through the carousel.": { ar: "استخدم مفاتيح الأسهم داخل النافذة للتنقل عبر الدوار.", fa: "در پنجره مودال از کلیدهای جهت دار برای حرکت در کاروسل استفاده کنید.", zh: "在弹窗中使用方向键浏览轮播。" },
        "enlarged tweet image": { ar: "صورة تغريدة مكبرة", fa: "تصویر بزرگ شده توییت", zh: "放大的推文图片" },
        "404 | Page Not Found | in-a-nut-s-hell.fyi": { ar: "404 | الصفحة غير موجودة | in-a-nut-s-hell.fyi", fa: "404 | صفحه پیدا نشد | in-a-nut-s-hell.fyi", zh: "404 | 页面未找到 | in-a-nut-s-hell.fyi" },
        "Emoji Hell: Heart vs Brain Visual Breakdown | in-a-nut-s-hell.fyi": { ar: "جحيم الإيموجي: تفكيك بصري للقلب مقابل الدماغ | in-a-nut-s-hell.fyi", fa: "جهنم ایموجی: تحلیل بصری قلب در برابر مغز | in-a-nut-s-hell.fyi", zh: "Emoji Hell：心脏与大脑视觉解析 | in-a-nut-s-hell.fyi" },
        "Emoji Hell compares two symbolic visuals: one centered on emotion and one centered on intellect. Explore the heart and brain compositions with concise interpretation.": { ar: "يقارن Emoji Hell بين مشهدين رمزيين: أحدهما متمحور حول العاطفة والآخر حول العقل. استكشف تكوينات القلب والدماغ مع تفسير موجز.", fa: "Emoji Hell دو تصویر نمادین را مقایسه می کند: یکی با محوریت احساس و دیگری با محوریت عقل. ترکیب های قلب و مغز را با تفسیری کوتاه ببینید.", zh: "Emoji Hell 对比两幅象征性画面：一幅以情感为中心，另一幅以理性为中心。用简明解读探索心脏与大脑构图。" },
        "Back navigation": { ar: "تنقل الرجوع", fa: "ناوبری بازگشت", zh: "返回导航" },
        "Emoji Hell: Heart vs Brain": { ar: "جحيم الإيموجي: القلب مقابل الدماغ", fa: "جهنم ایموجی: قلب در برابر مغز", zh: "Emoji Hell：心脏对大脑" },
        "This page contains only two symbolic images. Both scenes show a crowd kneeling before one dominant organ and an emoji strip that reads like a compressed manifesto.": { ar: "تحتوي هذه الصفحة على صورتين رمزيتين فقط. يُظهر المشهدان حشداً راكعاً أمام عضو مهيمن واحد وشريط إيموجي يبدو كبيان مضغوط.", fa: "این صفحه فقط دو تصویر نمادین دارد. هر دو صحنه جمعیتی زانو زده را در برابر یک اندام مسلط و نواری از ایموجی نشان می دهند که مانند یک بیانیه فشرده خوانده می شود.", zh: "此页面仅包含两张象征性图片。两幅场景都展示人群跪拜在单一主导器官前，配有一条像压缩宣言的表情符号带。" },
        "Emoji Hell image summaries": { ar: "ملخصات صور Emoji Hell", fa: "خلاصه تصاویر Emoji Hell", zh: "Emoji Hell 图片摘要" },
        "Heart Dot Right": { ar: "نقطة قلب يمين", fa: "نقطه قلب راست", zh: "心点右侧" },
        "Brain Dot Lump": { ar: "كتلة نقطة الدماغ", fa: "توده نقطه مغز", zh: "脑点团块" },
        "Large anatomical heart above kneeling people with a symbolic emoji strip": { ar: "قلب تشريحي كبير فوق أشخاص راكعين مع شريط إيموجي رمزي", fa: "قلب بزرگ آناتومیک بالای افراد زانو زده با یک نوار ایموجی نمادین", zh: "跪拜人群上方的巨大解剖心脏，配有象征性表情符号带" },
        "A giant heart sits at the center while people kneel in repeating rows. The emoji line mixes care, balance, growth, progress, and approval, framing emotion as a force that can organize collective behavior.": { ar: "يجلس قلب عملاق في المركز بينما يركع الناس في صفوف متكررة. يمزج خط الإيموجي بين الرعاية والتوازن والنمو والتقدم والموافقة، مقدماً العاطفة كقوة قادرة على تنظيم السلوك الجماعي.", fa: "یک قلب غول پیکر در مرکز قرار دارد و مردم در ردیف های تکراری زانو زده اند. خط ایموجی مراقبت، تعادل، رشد، پیشرفت و تایید را ترکیب می کند و احساس را به عنوان نیرویی برای سازمان دهی رفتار جمعی نشان می دهد.", zh: "一颗巨大的心脏位于中央，人群在重复排列中跪拜。表情符号序列混合了关怀、平衡、成长、进展与认可，将情感塑造成能够组织集体行为的力量。" },
        "Large glowing brain above kneeling people with a symbolic emoji strip": { ar: "دماغ متوهج كبير فوق أشخاص راكعين مع شريط إيموجي رمزي", fa: "مغز درخشان بزرگ بالای افراد زانو زده با یک نوار ایموجی نمادین", zh: "跪拜人群上方的巨大发光大脑，配有象征性表情符号带" },
        "A glowing brain replaces the heart as the center of authority. The emoji strip adds direction arrows, strength, conflict marks, and success symbols, suggesting reason and power competing for dominance and legitimacy.": { ar: "يحل دماغ متوهج محل القلب كمركز للسلطة. يضيف شريط الإيموجي أسهماً اتجاهية وعلامات قوة وصراع ورموز نجاح، بما يوحي بتنافس العقل والقوة على الهيمنة والشرعية.", fa: "یک مغز درخشان جای قلب را به عنوان مرکز اقتدار می گیرد. نوار ایموجی پیکان های جهت، نشانه های قدرت و تعارض و نمادهای موفقیت را اضافه می کند و رقابت عقل و قدرت برای سلطه و مشروعیت را القا می کند.", zh: "发光的大脑取代心脏成为权威中心。表情符号带加入方向箭头、力量与冲突标记以及成功符号，暗示理性与权力在争夺主导地位与正当性。" },
        "Expanded symbolic image": { ar: "صورة رمزية مكبرة", fa: "تصویر نمادین بزرگ شده", zh: "放大的象征性图像" },
        "Expanded image viewer": { ar: "عارض الصور المكبرة", fa: "نمایشگر تصویر بزرگ شده", zh: "放大图片查看器" },
        "Posts, Toasts and Roasts | in-a-nut-s-hell.fyi": { ar: "منشورات ونخبات وتحميصات | in-a-nut-s-hell.fyi", fa: "پست ها، نان تست ها و کباب ها | in-a-nut-s-hell.fyi", zh: "帖子、敬酒与吐槽 | in-a-nut-s-hell.fyi" },
        "Browse Posts, Toasts and Roasts: curated social posts featuring humor, commentary, and culture.": { ar: "تصفح Posts, Toasts and Roasts: منشورات اجتماعية منسقة تجمع بين الفكاهة والتعليق والثقافة.", fa: "Posts, Toasts and Roasts را مرور کنید: پست های اجتماعی گزینش شده با طنز، نظر و فرهنگ.", zh: "浏览 Posts, Toasts and Roasts：精选社交帖子，包含幽默、评论与文化内容。" },
        "posts, toasts and roasts": { ar: "منشورات ونخبات وتحميصات", fa: "پست ها، نان تست ها و کباب ها", zh: "帖子、敬酒与吐槽" },
        "enlarged image": { ar: "صورة مكبرة", fa: "تصویر بزرگ شده", zh: "放大图片" },
        "github preview": { ar: "معاينة GitHub", fa: "پیش نمایش GitHub", zh: "GitHub 预览" },
        "big-genius-ai.py code snippet": { ar: "مقتطف كود big-genius-ai.py", fa: "قطعه کد big-genius-ai.py", zh: "big-genius-ai.py 代码片段" },
        "snippet at the top": { ar: "مقتطف في الأعلى", fa: "قطعه کد در بالا", zh: "顶部代码片段" },
        "GitHub iframe preview": { ar: "معاينة GitHub عبر iframe", fa: "پیش نمایش GitHub در iframe", zh: "GitHub iframe 预览" },
        "live preview in an interactive iframe.": { ar: "معاينة مباشرة داخل iframe تفاعلي.", fa: "پیش نمایش زنده در یک iframe تعاملی.", zh: "在交互式 iframe 中实时预览。" },
        "GitHub repository preview": { ar: "معاينة مستودع GitHub", fa: "پیش نمایش مخزن GitHub", zh: "GitHub 仓库预览" },
        "This universe was NOT ai generated. Please enjoy responsibly, and have a nicely functioning day!": { ar: "هذا العالم لم يتم إنشاؤه بالذكاء الاصطناعي. استمتع بمسؤولية، ونتمنى لك يوماً رائعاً!", fa: "این دنیا با هوش مصنوعی ساخته نشده است. لطفا مسئولانه لذت ببرید و روز خوبی داشته باشید!", zh: "这个宇宙并非由 AI 生成。请理性享受，祝你一天顺利愉快！" },
        "Chessnuts. Watch the featured video on in-a-nut-s-hell.fyi.": { ar: "Chessnuts. شاهد الفيديو المميز على in-a-nut-s-hell.fyi.", fa: "Chessnuts. ویدیوی ویژه را در in-a-nut-s-hell.fyi تماشا کنید.", zh: "Chessnuts。在 in-a-nut-s-hell.fyi 观看精选视频。" },
        "Chessnuts video player": { ar: "مشغل فيديو Chessnuts", fa: "پخش کننده ویدیوی Chessnuts", zh: "Chessnuts 视频播放器" },
        "Hack the Universe Playlist | in-a-nut-s-hell.fyi": { ar: "قائمة اخترق الكون | in-a-nut-s-hell.fyi", fa: "فهرست هک جهان | in-a-nut-s-hell.fyi", zh: "Hack the Universe 播放列表 | in-a-nut-s-hell.fyi" },
        "Watch the Hack the Universe playlist: a curated set of YouTube videos.": { ar: "شاهد قائمة اخترق الكون: مجموعة منسقة من فيديوهات YouTube.", fa: "فهرست هک جهان را ببینید: مجموعه ای گزینش شده از ویدیوهای YouTube.", zh: "观看 Hack the Universe 播放列表：一组精选 YouTube 视频。" },
        "hack the universe": { ar: "اخترق الكون", fa: "هک جهان", zh: "破解宇宙" },
        "He Is Legend - Mouck Shudow. Watch the featured YouTube video.": { ar: "He Is Legend - Mouck Shudow. شاهد فيديو YouTube المميز.", fa: "He Is Legend - Mouck Shudow. ویدیوی ویژه YouTube را تماشا کنید.", zh: "He Is Legend - Mouck Shudow。观看精选 YouTube 视频。" },
        "He Is Legend - Mouck Shudow video player": { ar: "مشغل فيديو He Is Legend - Mouck Shudow", fa: "پخش کننده ویدیوی He Is Legend - Mouck Shudow", zh: "He Is Legend - Mouck Shudow 视频播放器" },
        "Watch Kun Anta: featured YouTube video with an emotional and poetic atmosphere.": { ar: "شاهد Kun Anta: فيديو YouTube مميز بأجواء عاطفية وشاعرية.", fa: "Kun Anta را تماشا کنید: ویدیوی ویژه YouTube با حال و هوای احساسی و شاعرانه.", zh: "观看 Kun Anta：一段带有情感与诗意氛围的精选 YouTube 视频。" },
        "Kun Anta featured video player": { ar: "مشغل الفيديو المميز Kun Anta", fa: "پخش کننده ویدیوی ویژه Kun Anta", zh: "Kun Anta 精选视频播放器" },
        "About this video": { ar: "حول هذا الفيديو", fa: "درباره این ویدیو", zh: "关于此视频" },
        "About Kun Anta": { ar: "حول Kun Anta", fa: "درباره Kun Anta", zh: "关于 Kun Anta" },
        "Pewdie Mars - Bruno Pie Playlist | in-a-nut-s-hell.fyi": { ar: "قائمة Pewdie Mars - Bruno Pie | in-a-nut-s-hell.fyi", fa: "فهرست Pewdie Mars - Bruno Pie | in-a-nut-s-hell.fyi", zh: "Pewdie Mars - Bruno Pie 播放列表 | in-a-nut-s-hell.fyi" },
        "Watch the Pewdie Mars - Bruno Pie historical playlist on YouTube.": { ar: "شاهد قائمة Pewdie Mars - Bruno Pie التاريخية على YouTube.", fa: "فهرست تاریخی Pewdie Mars - Bruno Pie را در YouTube تماشا کنید.", zh: "在 YouTube 上观看 Pewdie Mars - Bruno Pie 历史播放列表。" },
        "Chessnuts | in-a-nut-s-hell.fyi": { fr: "Chessnuts | in-a-nut-s-hell.fyi", es: "Chessnuts | in-a-nut-s-hell.fyi", ar: "تشسنَتس | in-a-nut-s-hell.fyi", fa: "چس ناتس | in-a-nut-s-hell.fyi", zh: "Chessnuts 棋趣 | in-a-nut-s-hell.fyi" },
        "He Is Legend - Mouck Shudow | in-a-nut-s-hell.fyi": { fr: "He Is Legend - Mouck Shudow | in-a-nut-s-hell.fyi", es: "He Is Legend - Mouck Shudow | in-a-nut-s-hell.fyi", ar: "هو أسطورة - Mouck Shudow | in-a-nut-s-hell.fyi", fa: "او یک افسانه است - Mouck Shudow | in-a-nut-s-hell.fyi", zh: "他是传奇 - Mouck Shudow | in-a-nut-s-hell.fyi" },
        "Kun Anta | in-a-nut-s-hell.fyi": { fr: "Kun Anta | in-a-nut-s-hell.fyi", es: "Kun Anta | in-a-nut-s-hell.fyi", ar: "كن أنت | in-a-nut-s-hell.fyi", fa: "خودت باش | in-a-nut-s-hell.fyi", zh: "做你自己 | in-a-nut-s-hell.fyi" },
        "big genius ai": { fr: "big genius ai", es: "big genius ai", ar: "ذكاء عبقري كبير", fa: "هوش نابغه بزرگ", zh: "超级天才 AI" },
        "pewdie mars - bruno pie! [historical]": { fr: "pewdie mars - bruno pie! [historique]", es: "pewdie mars - bruno pie! [historico]", ar: "pewdie mars - bruno pie! [تاريخي]", fa: "pewdie mars - bruno pie! [تاریخی]", zh: "pewdie mars - bruno pie! [历史]" },
        "Based on the available public metadata and thumbnail for Kun - Anta (by Austin James Hogan), the video appears to be a short, mood-driven piece centered on love and emotional connection, using simple symbolic visuals like two hands forming a heart shape against the sky and stylized script text to create a poetic, reflective tone; overall, it feels more like an aesthetic or lyrical visual moment than a plot-heavy narrative, emphasizing feeling, intimacy, and atmosphere over detailed storytelling.": { ar: "استناداً إلى البيانات الوصفية العامة والصورة المصغرة المتاحة لفيديو Kun - Anta (بواسطة Austin James Hogan)، يبدو الفيديو مقطعاً قصيراً تقوده الحالة المزاجية ويتمحور حول الحب والارتباط العاطفي، مستخدماً صوراً رمزية بسيطة مثل يدين تشكلان قلباً أمام السماء ونصاً بخط مزخرف لخلق نبرة شاعرية وتأملية؛ وبشكل عام يبدو أقرب إلى لحظة بصرية جمالية أو غنائية أكثر من كونه سرداً يعتمد على حبكة كثيفة، مع تركيز على الإحساس والحميمية والأجواء أكثر من السرد التفصيلي.", fa: "بر اساس فراداده عمومی و تصویر بندانگشتی موجود برای Kun - Anta (اثر Austin James Hogan)، این ویدیو یک قطعه کوتاه و حال و هوامحور به نظر می رسد که بر عشق و پیوند احساسی متمرکز است و با استفاده از تصاویر نمادین ساده مانند دو دست که در برابر آسمان شکل قلب می سازند و متن خوش نویسانه، لحنی شاعرانه و تاملی ایجاد می کند؛ در مجموع، بیشتر شبیه یک لحظه بصری زیباشناختی یا شاعرانه است تا روایتی پر از پیرنگ، و بر احساس، صمیمیت و فضا نسبت به روایت جزئی تاکید دارد.", zh: "根据 Kun - Anta（Austin James Hogan）的公开元数据和缩略图，这段视频看起来是一支以情绪驱动的短片，围绕爱与情感连接展开，使用了诸如两只手在天空前比出心形、以及风格化文字等简洁象征性视觉元素，营造出诗意而内省的基调；总体而言，它更像一个审美或抒情的视觉瞬间，而非情节密集的叙事，更强调感受、亲密与氛围，而不是细节化讲述。" }
    };

    function getPageName() {
        var name = window.location.pathname.split("/").pop();
        return name || "index.html";
    }

    function normalizeLang(lang) {
        if (!lang) return null;
        var lower = String(lang).toLowerCase();
        if (lower.indexOf("ar") === 0) return "ar";
        if (lower.indexOf("fa") === 0 || lower.indexOf("per") === 0) return "fa";
        if (lower.indexOf("zh") === 0 || lower.indexOf("chi") === 0) return "zh";
        if (lower.indexOf("fr") === 0) return "fr";
        if (lower.indexOf("es") === 0) return "es";
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
        if (
            value.en &&
            AUTO_TRANSLATIONS[value.en] &&
            AUTO_TRANSLATIONS[value.en][lang] &&
            (!value[lang] || value[lang] === value.en)
        ) {
            return AUTO_TRANSLATIONS[value.en][lang];
        }
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
                { type: "attr", selector: "title", attr: "text", value: { en: "in-a-nut-s-hell.fyi | Curated Links, Videos, and Digital Art", fr: "in-a-nut-s-hell.fyi | Liens, videos et art numerique", es: "in-a-nut-s-hell.fyi | Enlaces, videos y arte digital", ar: "in-a-nut-s-hell.fyi | الروابط المنسقة ومقاطع الفيديو والفن الرقمي", fa: "in-a-nut-s-hell.fyi | پیوندهای انتخاب شده، ویدیوها و هنر دیجیتال", zh: "仅供参考 |精选链接、视频和数字艺术" } },
                { type: "attr", selector: "meta[name='description']", attr: "content", value: { en: "Explore in-a-nut-s-hell.fyi: a curated launchpad of creative pages, video collections, and visual experiments.", fr: "Explorez in-a-nut-s-hell.fyi : une plateforme organisee de pages creatives, collections video et experiences visuelles.", es: "Explora in-a-nut-s-hell.fyi: una plataforma curada de paginas creativas, colecciones de videos y experimentos visuales.", ar: "استكشف in-a-nut-s-hell.fyi: منصة منسقة للصفحات الابداعية ومجموعات الفيديو والتجارب البصرية.", fa: "in-a-nut-s-hell.fyi را کاوش کنيد: سکويي منتخب از صفحه هاي خلاقانه، مجموعه هاي ويديويي و تجربه هاي بصري.", zh: "探索 in-a-nut-s-hell.fyi：一个精选的创意页面、视频合集和视觉实验入口。" } },
                { type: "attr", selector: "meta[property='og:title']", attr: "content", value: { en: "in-a-nut-s-hell.fyi | Curated Links, Videos, and Digital Art", fr: "in-a-nut-s-hell.fyi | Liens, videos et art numerique", es: "in-a-nut-s-hell.fyi | Enlaces, videos y arte digital", ar: "in-a-nut-s-hell.fyi | روابط منسقة وفيديوهات وفن رقمي", fa: "in-a-nut-s-hell.fyi | لينک هاي گزينش شده، ويديوها و هنر ديجيتال", zh: "in-a-nut-s-hell.fyi | 精选链接、视频与数字艺术" } },
                { type: "attr", selector: "meta[property='og:description']", attr: "content", value: { en: "Explore in-a-nut-s-hell.fyi: a curated launchpad of creative pages, video collections, and visual experiments.", fr: "Explorez in-a-nut-s-hell.fyi : une plateforme organisee de pages creatives, collections video et experiences visuelles.", es: "Explora in-a-nut-s-hell.fyi: una plataforma curada de paginas creativas, colecciones de videos y experimentos visuales.", ar: "استكشف in-a-nut-s-hell.fyi: منصة منسقة للصفحات الابداعية ومجموعات الفيديو والتجارب البصرية.", fa: "in-a-nut-s-hell.fyi را کاوش کنيد: سکويي منتخب از صفحه هاي خلاقانه، مجموعه هاي ويديويي و تجربه هاي بصري.", zh: "探索 in-a-nut-s-hell.fyi：一个精选的创意页面、视频合集和视觉实验入口。" } },
                { type: "attr", selector: "meta[name='twitter:title']", attr: "content", value: { en: "in-a-nut-s-hell.fyi | Curated Links, Videos, and Digital Art", fr: "in-a-nut-s-hell.fyi | Liens, videos et art numerique", es: "in-a-nut-s-hell.fyi | Enlaces, videos y arte digital", ar: "in-a-nut-s-hell.fyi | روابط منسقة وفيديوهات وفن رقمي", fa: "in-a-nut-s-hell.fyi | لينک هاي گزينش شده، ويديوها و هنر ديجيتال", zh: "in-a-nut-s-hell.fyi | 精选链接、视频与数字艺术" } },
                { type: "attr", selector: "meta[name='twitter:description']", attr: "content", value: { en: "Explore in-a-nut-s-hell.fyi: a curated launchpad of creative pages, video collections, and visual experiments.", fr: "Explorez in-a-nut-s-hell.fyi : une plateforme organisee de pages creatives, collections video et experiences visuelles.", es: "Explora in-a-nut-s-hell.fyi: una plataforma curada de paginas creativas, colecciones de videos y experimentos visuales.", ar: "استكشف in-a-nut-s-hell.fyi: منصة منسقة للصفحات الابداعية ومجموعات الفيديو والتجارب البصرية.", fa: "in-a-nut-s-hell.fyi را کاوش کنيد: سکويي منتخب از صفحه هاي خلاقانه، مجموعه هاي ويديويي و تجربه هاي بصري.", zh: "探索 in-a-nut-s-hell.fyi：一个精选的创意页面、视频合集和视觉实验入口。" } },
                { type: "text", selector: "main.link-cloud > p", value: { en: "sometimes... you know... i think... if.. that's probably...", fr: "parfois... tu sais... je pense... si... c'est probablement...", es: "a veces... ya sabes... creo... si... probablemente...", ar: "في بعض الأحيان... كما تعلم... أعتقد... إذا.. هذا على الأرجح...", fa: "گاهی... میدونی... فکر می کنم... اگر... احتمالاً...", zh: "有时...你知道...我想...如果...那可能是..." } },
                { type: "text", selector: ".links li:nth-child(1) a", value: { en: "For Simple Navigation [embedded]", fr: "Pour une navigation simple [integre]", es: "Para navegacion simple [integrado]", ar: "للتنقل البسيط [مضمن]", fa: "برای پیمایش ساده [جاسازی شده]", zh: "用于简单导航[嵌入]" } },
                { type: "text", selector: ".links li:nth-child(2) a", value: { en: "emoji hell to heaven summary [fun]", fr: "resume emoji de l'enfer au paradis [amusant]", es: "resumen emoji del infierno al cielo [divertido]", ar: "ملخص الرموز التعبيرية من الجحيم إلى الجنة [متعة]", fa: "خلاصه شکلک جهنم به بهشت ​​[سرگرم کننده]", zh: "地狱天堂表情总结[好玩]" } },
                { type: "text", selector: ".links li:nth-child(3) a", value: { en: "pewdie mars - bruno pie! [YouTube Playlist] [historical]", fr: "pewdie mars - bruno pie! [Liste YouTube] [historique]", es: "pewdie mars - bruno pie! [Lista de YouTube] [historico]", ar: "بيودي مارس - فطيرة برونو! [قائمة تشغيل يوتيوب] [تاريخية]", fa: "pewdie mars - برونو پای! [لیست پخش یوتیوب] [تاریخی]", zh: "皮尤迪·火星 - 布鲁诺派！ [YouTube 播放列表] [历史]" } },
                { type: "text", selector: ".links li:nth-child(4) a", value: { en: "He Is Legend Mouck Shudow [YouTube] [historical]", fr: "He Is Legend Mouck Shudow [YouTube] [historique]", es: "He Is Legend Mouck Shudow [YouTube] [historico]", ar: "إنه الأسطورة موك شادو [يوتيوب] [تاريخي]", fa: "He Is Legend Mouck Shudow [یوتیوب] [تاریخی]", zh: "他是传奇 Mouck Shudow [YouTube] [历史]" } },
                { type: "text", selector: ".links li:nth-child(5) a", value: { en: "Kuna Anta My Heart [YouTube]", fr: "Kuna Anta Mon Coeur [YouTube]", es: "Kuna Anta Mi Corazon [YouTube]", ar: "كونا أنتا قلبي [يوتيوب]", fa: "کونا آنتا قلب من [یوتیوب]", zh: "库纳·安塔我的心 [YouTube]" } },
                { type: "text", selector: ".links li:nth-child(6) a", value: { en: "hack the universe [YouTube Playlist]", fr: "pirater l'univers [Liste YouTube]", es: "hackea el universo [Lista de YouTube]", ar: "اختراق الكون [قائمة تشغيل يوتيوب]", fa: "هک جهان [لیست پخش یوتیوب]", zh: "破解宇宙 [YouTube 播放列表]" } },
                { type: "text", selector: ".links li:nth-child(7) a", value: { en: "posts, toasts and roasts [Twitter]", fr: "posts, toasts et roasts [Twitter]", es: "posts, toasts y roasts [Twitter]", ar: "المشاركات والخبز المحمص والتحميص [تويتر]", fa: "پست ها، نان تست و کباب [توئیتر]", zh: "帖子、祝酒词和烤肉 [Twitter]" } },
                { type: "text", selector: ".links li:nth-child(8) a", value: { en: "big genius ai [GitHub preview]", fr: "big genius ai [apercu GitHub]", es: "big genius ai [vista previa de GitHub]", ar: "عبقري كبير لمنظمة العفو الدولية [معاينة جيثب]", fa: "big genius ai [پیش نمایش GitHub]", zh: "大天才ai【GitHub预览】" } },
                { type: "text", selector: ".links li:nth-child(9) a", value: { en: "chessnuts [chess] [bing chillin] [YouTube]", fr: "chessnuts [echecs] [bing chillin] [YouTube]", es: "chessnuts [ajedrez] [bing chillin] [YouTube]", ar: "الشطرنج [الشطرنج] [بنج تشيلين] [يوتيوب]", fa: "chessnuts [شطرنج] [بینگ چیلین] [YouTube]", zh: "chessnuts [国际象棋] [bing chillin] [YouTube]" } },
                { type: "text", selector: ".links li:nth-child(10) a", value: { en: "barbiecore collage [pink carousel]", fr: "collage barbiecore [carrousel rose]", es: "collage barbiecore [carrusel rosa]", ar: "كولاج باربيكور [دائري وردي]", fa: "کلاژ باربیکور [چرخ و فلک صورتی]", zh: "barbiecore 拼贴 [粉色旋转木马]" } }
            ],
            "embedded.html": [
                { type: "attr", selector: "title", attr: "text", value: { en: "Embedded Content | in-a-nut-s-hell.fyi", fr: "Contenu integre | in-a-nut-s-hell.fyi", es: "Contenido integrado | in-a-nut-s-hell.fyi", ar: "المحتوى المضمن | in-a-nut-s-hell.fyi", fa: "محتوای تعبیه شده | in-a-nut-s-hell.fyi", zh: "嵌入内容|仅供参考" } },
                { type: "attr", selector: "meta[property=\'og:title\']", attr: "content", value: { en: "Embedded Content | in-a-nut-s-hell.fyi", fr: "Contenu integre | in-a-nut-s-hell.fyi", es: "Contenido integrado | in-a-nut-s-hell.fyi", ar: "المحتوى المضمن | in-a-nut-s-hell.fyi", fa: "محتوای تعبیه شده | in-a-nut-s-hell.fyi", zh: "嵌入内容|仅供参考" } },
                { type: "attr", selector: "meta[name='description']", attr: "content", value: { en: "Browse embedded media and featured resources from in-a-nut-s-hell.fyi in one lightweight page.", fr: "Parcourez des medias integres et des ressources en vedette de in-a-nut-s-hell.fyi sur une page legere.", es: "Explora contenido incrustado y recursos destacados de in-a-nut-s-hell.fyi en una pagina ligera.", ar: "تصفح الوسائط المضمنة والموارد المميزة من in-a-nut-s-hell.fyi في صفحة واحدة خفيفة الوزن.", fa: "رسانه های جاسازی شده و منابع ویژه از in-a-nut-s-hell.fyi را در یک صفحه سبک مرور کنید.", zh: "在一个轻量级页面中浏览来自 in-a-nut-s-hell.fyi 的嵌入式媒体和特色资源。" } },
                { type: "attr", selector: "meta[property=\'og:description\']", attr: "content", value: { en: "Browse embedded media and featured resources from in-a-nut-s-hell.fyi in one lightweight page.", fr: "Parcourez des medias integres et des ressources en vedette de in-a-nut-s-hell.fyi sur une page legere.", es: "Explora contenido incrustado y recursos destacados de in-a-nut-s-hell.fyi en una pagina ligera.", ar: "تصفح الوسائط المضمنة والموارد المميزة من in-a-nut-s-hell.fyi في صفحة واحدة خفيفة الوزن.", fa: "رسانه های جاسازی شده و منابع ویژه از in-a-nut-s-hell.fyi را در یک صفحه سبک مرور کنید.", zh: "在一个轻量级页面中浏览来自 in-a-nut-s-hell.fyi 的嵌入式媒体和特色资源。" } },
                { type: "text", selector: "main.link-cloud > p", value: { en: "sometimes... you know... i think... if.. that's probably...", fr: "parfois... tu sais... je pense... si... c'est probablement...", es: "a veces... ya sabes... creo... si... probablemente...", ar: "في بعض الأحيان... كما تعلم... أعتقد... إذا.. هذا على الأرجح...", fa: "گاهی... میدونی... فکر می کنم... اگر... احتمالاً...", zh: "有时...你知道...我想...如果...那可能是..." } },
                { type: "text", selector: ".links li:nth-child(1) a", value: { en: "emoji hell to heaven summary [fun]", fr: "details des emojis de l'enfer au paradis [amusant]", es: "resumen emoji del infierno al cielo [divertido]", ar: "ملخص الرموز التعبيرية من الجحيم إلى الجنة [متعة]", fa: "خلاصه شکلک جهنم به بهشت ​​[سرگرم کننده]", zh: "地狱天堂表情总结[好玩]" } },
                { type: "text", selector: ".links li:nth-child(2) a", value: { en: "pewdie mars - bruno pie! [YouTube Playlist] [historical]", fr: "pewdie mars - bruno pie! [Liste YouTube] [historique]", es: "pewdie mars - bruno pie! [Lista de YouTube] [historico]", ar: "بيودي مارس - فطيرة برونو! [قائمة تشغيل يوتيوب] [تاريخية]", fa: "pewdie mars - برونو پای! [لیست پخش یوتیوب] [تاریخی]", zh: "皮尤迪·火星 - 布鲁诺派！ [YouTube 播放列表] [历史]" } },
                { type: "text", selector: ".links li:nth-child(3) a", value: { en: "He Is Legend Mouck Shudow [YouTube] [historical]", fr: "He Is Legend Mouck Shudow [YouTube] [historique]", es: "He Is Legend Mouck Shudow [YouTube] [historico]", ar: "إنه الأسطورة موك شادو [يوتيوب] [تاريخي]", fa: "He Is Legend Mouck Shudow [یوتیوب] [تاریخی]", zh: "他是传奇 Mouck Shudow [YouTube] [历史]" } },
                { type: "text", selector: ".links li:nth-child(4) a", value: { en: "Kuna Anta My Heart [YouTube]", fr: "Kuna Anta Mon Coeur [YouTube]", es: "Kuna Anta Mi Corazon [YouTube]", ar: "كونا أنتا قلبي [يوتيوب]", fa: "کونا آنتا قلب من [یوتیوب]", zh: "库纳·安塔我的心 [YouTube]" } },
                { type: "text", selector: ".links li:nth-child(5) a", value: { en: "hack the universe [YouTube Playlist]", fr: "pirater l'univers [Liste YouTube]", es: "hackea el universo [Lista de YouTube]", ar: "اختراق الكون [قائمة تشغيل يوتيوب]", fa: "هک جهان [لیست پخش یوتیوب]", zh: "破解宇宙 [YouTube 播放列表]" } },
                { type: "text", selector: ".links li:nth-child(6) a", value: { en: "posts, toasts and roasts [Twitter]", fr: "posts, toasts et rotis [Twitter]", es: "posts, toasts y roasts [Twitter]", ar: "المشاركات والخبز المحمص والتحميص [تويتر]", fa: "پست ها، نان تست و کباب [توئیتر]", zh: "帖子、祝酒词和烤肉 [Twitter]" } },
                { type: "text", selector: ".links li:nth-child(7) a", value: { en: "big genius ai [GitHub preview]", fr: "big genius ai [apercu GitHub]", es: "big genius ai [vista previa de GitHub]", ar: "عبقري كبير لمنظمة العفو الدولية [معاينة جيثب]", fa: "big genius ai [پیش نمایش GitHub]", zh: "大天才ai【GitHub预览】" } },
                { type: "text", selector: ".links li:nth-child(8) a", value: { en: "chessnuts [chess] [bing chillin] [YouTube]", fr: "chessnuts [echecs] [bing chillin] [YouTube]", es: "chessnuts [ajedrez] [bing chillin] [YouTube]", ar: "الشطرنج [الشطرنج] [بنج تشيلين] [يوتيوب]", fa: "chessnuts [شطرنج] [بینگ چیلین] [YouTube]", zh: "chessnuts [国际象棋] [bing chillin] [YouTube]" } },
                { type: "text", selector: ".links li:nth-child(9) a", value: { en: "barbiecore collage [pink carousel]", fr: "collage barbiecore [carrousel rose]", es: "collage barbiecore [carrusel rosa]", ar: "كولاج باربيكور [دائري وردي]", fa: "کلاژ باربیکور [چرخ و فلک صورتی]", zh: "barbiecore 拼贴 [粉色旋转木马]" } }
            ],
            "barbie-collage.html": [
                { type: "attr", selector: "title", attr: "text", value: { en: "Barbiecore Collage Carousel | in-a-nut-s-hell.fyi", fr: "Collage Barbiecore Carrousel | in-a-nut-s-hell.fyi", es: "Carrusel de collage Barbiecore | in-a-nut-s-hell.fyi", ar: "باربيكور كولاج كاروسيل | in-a-nut-s-hell.fyi", fa: "چرخ فلک کلاژ باربیکور | in-a-nut-s-hell.fyi", zh: "Barbiecore 拼贴旋转木马 |仅供参考" } },
                { type: "attr", selector: "meta[property=\'og:title\']", attr: "content", value: { en: "Barbiecore Collage Carousel | in-a-nut-s-hell.fyi", fr: "Collage Barbiecore Carrousel | in-a-nut-s-hell.fyi", es: "Carrusel de collage Barbiecore | in-a-nut-s-hell.fyi", ar: "باربيكور كولاج كاروسيل | in-a-nut-s-hell.fyi", fa: "چرخ فلک کلاژ باربیکور | in-a-nut-s-hell.fyi", zh: "Barbiecore 拼贴旋转木马 |仅供参考" } },
                { type: "attr", selector: "meta[name='description']", attr: "content", value: { en: "A cute pink collage that opens into a swipeable carousel of the latest tweet snapshots.", fr: "Un collage rose et mignon qui s'ouvre en carrousel navigable avec les dernieres captures de tweets.", es: "Un collage rosa lindo que se abre en un carrusel deslizable con las ultimas capturas de tweets.", ar: "صورة مجمعة وردية لطيفة تفتح على شكل دائري قابل للتمرير السريع لأحدث لقطات التغريدة.", fa: "یک کلاژ صورتی زیبا که به چرخ و فلک قابل کشیدن از جدیدترین عکس‌های فوری توییت باز می‌شود.", zh: "可爱的粉红色拼贴画，打开后会变成最新推文快照的可滑动轮播。" } },
                { type: "attr", selector: "meta[property=\'og:description\']", attr: "content", value: { en: "A cute pink collage that opens into a swipeable carousel of the latest tweet snapshots.", fr: "Un collage rose et mignon qui s'ouvre en carrousel navigable avec les dernieres captures de tweets.", es: "Un collage rosa lindo que se abre en un carrusel deslizable con las ultimas capturas de tweets.", ar: "صورة مجمعة وردية لطيفة تفتح على شكل دائري قابل للتمرير السريع لأحدث لقطات التغريدة.", fa: "یک کلاژ صورتی زیبا که به چرخ و فلک قابل کشیدن از جدیدترین عکس‌های فوری توییت باز می‌شود.", zh: "可爱的粉红色拼贴画，打开后会变成最新推文快照的可滑动轮播。" } },
                { type: "text", selector: ".back-link", value: { en: "← Back", fr: "← Retour", es: "← Volver", ar: "← العودة", fa: "← برگشت", zh: "← 返回" } },
                { type: "text", selector: ".hero h1", value: { en: "Barbiecore Memory Board", fr: "Tableau Memoire Barbiecore", es: "Tablon de recuerdos Barbiecore", ar: "لوحة الذاكرة باربيكور", fa: "تخته حافظه باربیکور", zh: "Barbiecore内存板" } },
                { type: "text", selector: ".hero p:nth-of-type(1)", value: { en: "Five latest tweet snapshots, sorted by date in the PNG filename, styled like a sticker collage. Tap any tile to open the carousel.", fr: "Cinq captures de tweets recentes, triees par date dans le nom du fichier PNG, presentees comme un collage d'autocollants. Touchez une vignette pour ouvrir le carrousel.", es: "Cinco capturas recientes de tweets, ordenadas por fecha en el nombre del archivo PNG, presentadas como un collage de pegatinas. Toca cualquier mosaico para abrir el carrusel.", ar: "خمس لقطات من تغريدات حديثة، مرتبة حسب التاريخ في اسم ملف PNG، على شكل ملصق مجمع. اضغط على أي بلاطة لفتح الرف الدائري.", fa: "پنج عکس از آخرین توییت‌ها، که بر اساس تاریخ در نام فایل PNG مرتب شده‌اند، مانند یک کلاژ استیکر است. برای باز کردن چرخ فلک روی هر کاشی ضربه بزنید.", zh: "五张最新的推文快照，按 PNG 文件名中的日期排序，风格像贴纸拼贴画。点击任意图块即可打开旋转木马。" } },
                { type: "text", selector: ".hero p.tagline", value: { en: "Come on Barbie, let us go party... in a responsible image gallery.", fr: "Allez Barbie, on va faire la fete... dans une galerie d'images responsable.", es: "Vamos Barbie, a festejar... en una galeria de imagenes responsable.", ar: "هيا يا باربي، فلنذهب للاحتفال... في معرض صور مسؤول.", fa: "بیا باربی، اجازه بده به مهمانی برویم... در یک گالری عکس مسئولانه.", zh: "来吧，芭比娃娃，让我们去派对……在一个负责任的图片库里。" } },
                { type: "attr", selector: ".collage-grid", attr: "aria-label", value: { en: "Barbie collage gallery", fr: "Galerie collage Barbie", es: "Galeria de collage Barbie", ar: "معرض كولاج باربي", fa: "گالری کلاژ باربی", zh: "芭比拼贴画廊" } },
                { type: "text", selector: ".tile-1 .caption", value: { en: "Pink alert level: iconic", fr: "Niveau d'alerte rose : iconique", es: "Nivel de alerta rosa: iconico", ar: "مستوى التنبيه الوردي: مبدع", fa: "سطح هشدار صورتی: نمادین", zh: "粉红警报级别：标志性" } },
                { type: "text", selector: ".tile-2 .caption", value: { en: "Main character energy only", fr: "Energie personnage principal uniquement", es: "Solo energia de protagonista", ar: "طاقة الشخصية الرئيسية فقط", fa: "فقط انرژی شخصیت اصلی", zh: "仅主角能量" } },
                { type: "text", selector: ".tile-3 .caption", value: { en: "This dreamhouse has receipts", fr: "Cette dreamhouse garde les preuves", es: "Esta dreamhouse tiene pruebas", ar: "بيت الأحلام هذا لديه إيصالات", fa: "این خانه رویایی دارای رسید است", zh: "这个梦想之家有收据" } },
                { type: "text", selector: ".tile-4 .caption", value: { en: "Glossy, bossy, and unbothered", fr: "Brillante, bossy et imperturbable", es: "Brillante, mandona e imperturbable", ar: "لامع ومتسلط وغير منزعج", fa: "براق، رئیس‌جمهور و بی‌آزار", zh: "光鲜亮丽、专横、不拘一格" } },
                { type: "text", selector: ".tile-5 .caption", value: { en: "Newest sparkle in the lineup", fr: "Le plus recent eclat de la serie", es: "El brillo mas nuevo de la coleccion", ar: "أحدث التألق في التشكيلة", fa: "جدیدترین درخشش در ترکیب", zh: "系列中的最新亮点" } },
                { type: "text", selector: ".hint", value: { en: "Use arrow keys in the modal to move through the carousel.", fr: "Utilisez les fleches dans la fenetre pour parcourir le carrousel.", es: "Usa las flechas en la ventana modal para recorrer el carrusel.", ar: "استخدم مفاتيح الأسهم في الشكل للتنقل عبر الرف الدائري.", fa: "برای حرکت در چرخ فلک از کلیدهای جهت دار در حالت استفاده کنید.", zh: "使用模式中的箭头键在轮播中移动。" } },
                { type: "text", selector: "#pink-guy-banner", value: { en: "Pink Surprise Button 💖🎀🌸✨🧸👛🩷", fr: "Bouton Surprise Rose 💖🎀🌸✨🧸👛🩷", es: "Boton Sorpresa Rosa 💖🎀🌸✨🧸👛🩷", ar: "زر المفاجأة الوردي 💖🎀🌸✨🧸👛🩷", fa: "دکمه سورپرایز صورتی 💖🎀🌸✨🧸👛🩷", zh: "粉红色惊喜按钮💖🎀✨🧸👛🩷" } },
                { type: "text", selector: ".pink-guy-note", value: { en: "Princess mode activated. Pink guy has arrived. 💅🌷✨", fr: "Mode princesse active. Pink guy est arrive. 💅🌷✨", es: "Modo princesa activado. Pink guy ha llegado. 💅🌷✨", ar: "تم تفعيل وضع الأميرة. لقد وصل الرجل الوردي. 💅🌷✨", fa: "حالت شاهزاده خانم فعال شد. پسر صورتی آمده است. 💅🌷✨", zh: "公主模式开启。粉红小伙来了。 💅🌷✨" } },
                { type: "attr", selector: "#lightbox-image", attr: "alt", value: { en: "enlarged tweet image", fr: "image de tweet agrandie", es: "imagen de tweet ampliada", ar: "صورة تغريدة مكبرة", fa: "تصویر توییت بزرگ شده", zh: "放大的推文图像" } },
                { type: "attr", selector: ".lightbox-close", attr: "aria-label", value: { en: "Close image", fr: "Fermer l'image", es: "Cerrar imagen", ar: "إغلاق الصورة", fa: "بستن تصویر", zh: "关闭图像" } }
            ],
            "404.html": [
                { type: "attr", selector: "title", attr: "text", value: { en: "404 | Page Not Found | in-a-nut-s-hell.fyi", fr: "404 | Page introuvable | in-a-nut-s-hell.fyi", es: "404 | Pagina no encontrada | in-a-nut-s-hell.fyi", ar: "404 | لم يتم العثور على الصفحة | in-a-nut-s-hell.fyi", fa: "404 | صفحه یافت نشد | in-a-nut-s-hell.fyi", zh: "404 | 404找不到页面 |仅供参考" } },
                { type: "attr", selector: "meta[property=\'og:title\']", attr: "content", value: { en: "404 | Page Not Found | in-a-nut-s-hell.fyi", fr: "404 | Page introuvable | in-a-nut-s-hell.fyi", es: "404 | Pagina no encontrada | in-a-nut-s-hell.fyi", ar: "404 | لم يتم العثور على الصفحة | in-a-nut-s-hell.fyi", fa: "404 | صفحه یافت نشد | in-a-nut-s-hell.fyi", zh: "404 | 404找不到页面 |仅供参考" } },
                { type: "attr", selector: "meta[name='description']", attr: "content", value: { en: "The page you requested does not exist. Return to the homepage to continue exploring in-a-nut-s-hell.fyi.", fr: "La page demandee n'existe pas. Retournez a l'accueil pour continuer a explorer in-a-nut-s-hell.fyi.", es: "La pagina solicitada no existe. Vuelve al inicio para seguir explorando in-a-nut-s-hell.fyi.", ar: "الصفحة التي طلبتها غير موجودة. ارجع إلى الصفحة الرئيسية لمواصلة استكشاف in-a-nut-s-hell.fyi.", fa: "صفحه ای که درخواست کردید وجود ندارد. برای ادامه کاوش in-a-nut-s-hell.fyi به صفحه اصلی بازگردید.", zh: "您请求的页面不存在。返回主页继续探索 in-a-nut-s-hell.fyi。" } },
                { type: "attr", selector: "meta[property=\'og:description\']", attr: "content", value: { en: "The page you requested does not exist. Return to the homepage to continue exploring in-a-nut-s-hell.fyi.", fr: "La page demandee n'existe pas. Retournez a l'accueil pour continuer a explorer in-a-nut-s-hell.fyi.", es: "La pagina solicitada no existe. Vuelve al inicio para seguir explorando in-a-nut-s-hell.fyi.", ar: "الصفحة التي طلبتها غير موجودة. ارجع إلى الصفحة الرئيسية لمواصلة استكشاف in-a-nut-s-hell.fyi.", fa: "صفحه ای که درخواست کردید وجود ندارد. برای ادامه کاوش in-a-nut-s-hell.fyi به صفحه اصلی بازگردید.", zh: "您请求的页面不存在。返回主页继续探索 in-a-nut-s-hell.fyi。" } },
                { type: "text", selector: "main.link-cloud > p", value: { en: "sometimes... you know... i think... if.. that's probably...", fr: "parfois... tu sais... je pense... si... c'est probablement...", es: "a veces... ya sabes... creo... si... probablemente...", ar: "في بعض الأحيان... كما تعلم... أعتقد... إذا.. هذا على الأرجح...", fa: "گاهی... میدونی... فکر می کنم... اگر... احتمالاً...", zh: "有时...你知道...我想...如果...那可能是..." } },
                { type: "text", selector: "main.link-cloud h2 a", value: { en: "404 - Page Not Found - Go back?", fr: "404 - Page introuvable - Retour?", es: "404 - Pagina no encontrada - Volver?", ar: "404 - الصفحة غير موجودة - العودة؟", fa: "404 - صفحه یافت نشد - برگردید؟", zh: "404 - 未找到页面 - 返回？" } }
            ],
            "emoji-hell.html": [
                { type: "attr", selector: "title", attr: "text", value: { en: "Emoji Hell: Heart vs Brain Visual Breakdown | in-a-nut-s-hell.fyi", fr: "Emoji Hell : coeur vs cerveau | in-a-nut-s-hell.fyi", es: "Emoji Hell: analisis visual corazon vs cerebro | in-a-nut-s-hell.fyi", ar: "رموز تعبيرية الجحيم: الانهيار البصري للقلب مقابل الدماغ | in-a-nut-s-hell.fyi", fa: "Emoji Hell: Heart vs Brain Visual Breakdown | in-a-nut-s-hell.fyi", zh: "表情符号地狱：心脏与大脑视觉分解 |仅供参考" } },
                { type: "attr", selector: "meta[property=\'og:title\']", attr: "content", value: { en: "Emoji Hell: Heart vs Brain Visual Breakdown | in-a-nut-s-hell.fyi", fr: "Emoji Hell : coeur vs cerveau | in-a-nut-s-hell.fyi", es: "Emoji Hell: analisis visual corazon vs cerebro | in-a-nut-s-hell.fyi", ar: "رموز تعبيرية الجحيم: الانهيار البصري للقلب مقابل الدماغ | in-a-nut-s-hell.fyi", fa: "Emoji Hell: Heart vs Brain Visual Breakdown | in-a-nut-s-hell.fyi", zh: "表情符号地狱：心脏与大脑视觉分解 |仅供参考" } },
                { type: "attr", selector: "meta[name='description']", attr: "content", value: { en: "Emoji Hell compares two symbolic visuals: one centered on emotion and one centered on intellect. Explore the heart and brain compositions with concise interpretation.", fr: "Emoji Hell compare deux visuels symboliques : l'un centre sur l'emotion et l'autre sur l'intellect. Explorez les compositions coeur et cerveau avec une interpretation concise.", es: "Emoji Hell compara dos visuales simbolicos: uno centrado en la emocion y otro en el intelecto. Explora las composiciones de corazon y cerebro con una interpretacion concisa.", ar: "يقارن Emoji Hell بين صورتين رمزيتين: واحدة تتمحور حول العاطفة والأخرى تتمحور حول الفكر. استكشف تركيبات القلب والدماغ مع تفسير موجز.", fa: "Emoji Hell دو تصویر نمادین را با هم مقایسه می کند: یکی با محوریت احساسات و دیگری با محوریت عقل. ترکیبات قلب و مغز را با تفسیر مختصر کاوش کنید.", zh: "表情符号地狱比较了两种象征性视觉效果：一种以情感为中心，一种以智力为中心。通过简洁的解释探索心脏和大脑的组成。" } },
                { type: "attr", selector: "meta[property=\'og:description\']", attr: "content", value: { en: "Emoji Hell compares two symbolic visuals: one centered on emotion and one centered on intellect. Explore the heart and brain compositions with concise interpretation.", fr: "Emoji Hell compare deux visuels symboliques : l'un centre sur l'emotion et l'autre sur l'intellect. Explorez les compositions coeur et cerveau avec une interpretation concise.", es: "Emoji Hell compara dos visuales simbolicos: uno centrado en la emocion y otro en el intelecto. Explora las composiciones de corazon y cerebro con una interpretacion concisa.", ar: "يقارن Emoji Hell بين صورتين رمزيتين: واحدة تتمحور حول العاطفة والأخرى تتمحور حول الفكر. استكشف تركيبات القلب والدماغ مع تفسير موجز.", fa: "Emoji Hell دو تصویر نمادین را با هم مقایسه می کند: یکی با محوریت احساسات و دیگری با محوریت عقل. ترکیبات قلب و مغز را با تفسیر مختصر کاوش کنید.", zh: "表情符号地狱比较了两种象征性视觉效果：一种以情感为中心，一种以智力为中心。通过简洁的解释探索心脏和大脑的组成。" } },
                { type: "text", selector: "nav.back-link a", value: { en: "← Back", fr: "← Retour", es: "← Volver", ar: "← العودة", fa: "← برگشت", zh: "← 返回" } },
                { type: "attr", selector: "nav.back-link", attr: "aria-label", value: { en: "Back navigation", fr: "Navigation retour", es: "Navegacion de regreso", ar: "الملاحة الخلفية", fa: "ناوبری برگشتی", zh: "返回导航" } },
                { type: "text", selector: "header h1", value: { en: "Emoji Hell: Heart vs Brain", fr: "Emoji Hell : coeur vs cerveau", es: "Emoji Hell: corazon vs cerebro", ar: "رموز تعبيرية الجحيم: القلب مقابل الدماغ", fa: "Emoji Hell: Heart vs Brain", zh: "表情符号地狱：心脏与大脑" } },
                { type: "text", selector: "header p.lead", value: { en: "This page contains only two symbolic images. Both scenes show a crowd kneeling before one dominant organ and an emoji strip that reads like a compressed manifesto.", fr: "Cette page contient deux images symboliques. Les deux scenes montrent une foule agenouillee devant un organe dominant et une ligne d'emojis qui ressemble a un manifeste compresse.", es: "Esta pagina contiene solo dos imagenes simbolicas. Ambas escenas muestran a una multitud arrodillada ante un organo dominante y una franja de emojis que funciona como un manifiesto comprimido.", ar: "تحتوي هذه الصفحة على صورتين رمزيتين فقط. يُظهر كلا المشهدين حشدًا راكعًا أمام أحد الأرغن المهيمن وشريط الرموز التعبيرية الذي يُقرأ مثل بيان مضغوط.", fa: "این صفحه فقط شامل دو تصویر نمادین است. هر دو صحنه جمعیتی را نشان می‌دهد که در مقابل یک اندام غالب و یک نوار شکلک که مانند یک مانیفست فشرده خوانده می‌شود، زانو زده‌اند.", zh: "此页面仅包含两个象征性图像。这两个场景都展示了一群人跪在一个主要器官和一条读起来像压缩宣言的表情符号前。" } },
                { type: "attr", selector: "section.grid", attr: "aria-label", value: { en: "Emoji Hell image summaries", fr: "Resumes des images Emoji Hell", es: "Resumenes de imagenes Emoji Hell", ar: "ملخصات صور الرموز التعبيرية الجحيم", fa: "خلاصه تصویر Emoji Hell", zh: "表情符号地狱图像摘要" } },
                { type: "attr", selector: ".card:nth-of-type(1) .gallery-thumb", attr: "alt", value: { en: "Large anatomical heart above kneeling people with a symbolic emoji strip", fr: "Grand coeur anatomique au-dessus de personnes agenouillees avec une bande d'emojis symboliques", es: "Gran corazon anatomico sobre personas arrodilladas con una franja de emojis simbolica", ar: "قلب تشريحي كبير فوق الأشخاص الراكعين مع شريط تعبيري رمزي", fa: "قلب بزرگ آناتومیک بالای افراد زانو زده با نوار شکلک نمادین", zh: "跪着的人上方有一个巨大的解剖心脏，上面有象征性的表情符号条" } },
                { type: "text", selector: ".card:nth-of-type(1) h2", value: { en: "Heart Dot Right", fr: "Point Coeur Droit", es: "Punto Corazon Derecho", ar: "نقطة القلب اليمنى", fa: "نقطه قلب راست", zh: "右心点" } },
                { type: "text", selector: ".card:nth-of-type(1) .summary", value: { en: "A giant heart sits at the center while people kneel in repeating rows. The emoji line mixes care, balance, growth, progress, and approval, framing emotion as a force that can organize collective behavior.", fr: "Un coeur geant est au centre pendant que les gens s'agenouillent en rangs repetes. La ligne d'emojis melange soin, equilibre, croissance, progres et approbation, et presente l'emotion comme une force qui peut organiser un comportement collectif.", es: "Un corazon gigante ocupa el centro mientras la gente se arrodilla en filas repetidas. La linea de emojis mezcla cuidado, equilibrio, crecimiento, progreso y aprobacion, presentando la emocion como una fuerza capaz de organizar el comportamiento colectivo.", ar: "يوجد قلب عملاق في المنتصف بينما يركع الناس في صفوف متكررة. يمزج خط الرموز التعبيرية بين الرعاية والتوازن والنمو والتقدم والقبول، ويؤطر العاطفة كقوة يمكنها تنظيم السلوك الجماعي.", fa: "یک قلب غول پیکر در مرکز می نشیند در حالی که مردم در ردیف های تکراری زانو می زنند. خط ایموجی مراقبت، تعادل، رشد، پیشرفت و تایید را با هم ترکیب می‌کند و احساسات را به عنوان نیرویی که می‌تواند رفتار جمعی را سازماندهی کند، قاب‌بندی می‌کند.", zh: "一颗巨大的心位于中心，人们重复成排跪下。表情符号系列混合了关怀、平衡、成长、进步和认可，将情感视为一种可以组织集体行为的力量。" } },
                { type: "attr", selector: ".card:nth-of-type(2) .gallery-thumb", attr: "alt", value: { en: "Large glowing brain above kneeling people with a symbolic emoji strip", fr: "Grand cerveau lumineux au-dessus de personnes agenouillees avec une bande d'emojis symboliques", es: "Gran cerebro brillante sobre personas arrodilladas con una franja de emojis simbolica", ar: "دماغ كبير متوهج فوق الأشخاص الراكعين مع شريط رمزي من الرموز التعبيرية", fa: "مغز بزرگ درخشان بالای افراد زانو زده با نوار شکلک نمادین", zh: "跪着的人上方发光的大大脑带有象征性的表情符号条" } },
                { type: "text", selector: ".card:nth-of-type(2) h2", value: { en: "Brain Dot Lump", fr: "Masse Point Cerveau", es: "Masa Punto Cerebro", ar: "كتلة نقطة الدماغ", fa: "توده نقطه مغزی", zh: "脑点肿块" } },
                { type: "text", selector: ".card:nth-of-type(2) .summary", value: { en: "A glowing brain replaces the heart as the center of authority. The emoji strip adds direction arrows, strength, conflict marks, and success symbols, suggesting reason and power competing for dominance and legitimacy.", fr: "Un cerveau lumineux remplace le coeur comme centre d'autorite. La bande d'emojis ajoute des fleches de direction, des signes de force, de conflit et de succes, ce qui suggere que la raison et le pouvoir se disputent la domination et la legitimite.", es: "Un cerebro brillante reemplaza al corazon como centro de autoridad. La franja de emojis agrega flechas de direccion, fuerza, conflicto y simbolos de exito, sugiriendo que razon y poder compiten por dominio y legitimidad.", ar: "يحل الدماغ المتوهج محل القلب كمركز للسلطة. يضيف شريط الرموز التعبيرية أسهم الاتجاه والقوة وعلامات الصراع ورموز النجاح، مما يشير إلى تنافس العقل والقوة على الهيمنة والشرعية.", fa: "یک مغز درخشان جایگزین قلب به عنوان مرکز قدرت می شود. نوار شکلک فلش‌های جهت، قدرت، نشانه‌های تضاد و نمادهای موفقیت را اضافه می‌کند که نشان‌دهنده رقابت عقل و قدرت برای تسلط و مشروعیت است.", zh: "发光的大脑取代心脏成为权力中心。表情符号条添加了方向箭头、力量、冲突标记和成功符号，暗示理性和权力争夺主导地位和合法性。" } },
                { type: "text", selector: "#lightbox .sr-only", value: { en: "Expanded image", fr: "Image agrandie", es: "Imagen ampliada", ar: "صورة موسعة", fa: "تصویر بزرگ شده", zh: "展开图像" } },
                { type: "attr", selector: "#lightbox-image", attr: "alt", value: { en: "Expanded symbolic image", fr: "Image symbolique agrandie", es: "Imagen simbolica ampliada", ar: "صورة رمزية موسعة", fa: "تصویر نمادین گسترده", zh: "扩展的象征图像" } },
                { type: "attr", selector: "#lightbox-close", attr: "aria-label", value: { en: "Close image viewer", fr: "Fermer la visionneuse", es: "Cerrar visor de imagen", ar: "إغلاق عارض الصور", fa: "نمایشگر تصویر را ببندید", zh: "关闭图像查看器" } },
                { type: "attr", selector: "#lightbox", attr: "aria-label", value: { en: "Expanded image viewer", fr: "Visionneuse d'image agrandie", es: "Visor de imagen ampliada", ar: "عارض الصور الموسع", fa: "نمایشگر تصویر گسترده", zh: "扩展图像查看器" } }
            ],
            "posts-toasts-roasts.html": [
                { type: "attr", selector: "title", attr: "text", value: { en: "Posts, Toasts and Roasts | in-a-nut-s-hell.fyi", fr: "Posts, Toasts et Roasts | in-a-nut-s-hell.fyi", es: "Posts, Toasts y Roasts | in-a-nut-s-hell.fyi", ar: "المشاركات والخبز المحمص والمحمص | in-a-nut-s-hell.fyi", fa: "پست ها، نان تست و کباب | in-a-nut-s-hell.fyi", zh: "帖子、祝酒词和烤肉|仅供参考" } },
                { type: "attr", selector: "meta[property=\'og:title\']", attr: "content", value: { en: "Posts, Toasts and Roasts | in-a-nut-s-hell.fyi", fr: "Posts, Toasts et Roasts | in-a-nut-s-hell.fyi", es: "Posts, Toasts y Roasts | in-a-nut-s-hell.fyi", ar: "المشاركات والخبز المحمص والمحمص | in-a-nut-s-hell.fyi", fa: "پست ها، نان تست و کباب | in-a-nut-s-hell.fyi", zh: "帖子、祝酒词和烤肉|仅供参考" } },
                { type: "attr", selector: "meta[name='description']", attr: "content", value: { en: "Browse Posts, Toasts and Roasts: curated social posts featuring humor, commentary, and culture.", fr: "Parcourez Posts, Toasts et Roasts : des publications sociales selectionnees avec humour, commentaires et culture.", es: "Explora Posts, Toasts y Roasts: publicaciones sociales seleccionadas con humor, comentario y cultura.", ar: "تصفح المنشورات والخبز المحمص والحمص: منشورات اجتماعية منسقة تتميز بالفكاهة والتعليق والثقافة.", fa: "پست‌ها، نان تست‌ها و کباب‌ها را مرور کنید: پست‌های اجتماعی انتخاب‌شده با طنز، تفسیر و فرهنگ.", zh: "浏览帖子、吐司和吐槽：精选的社交帖子，内容包含幽默、评论和文化。" } },
                { type: "attr", selector: "meta[property=\'og:description\']", attr: "content", value: { en: "Browse Posts, Toasts and Roasts: curated social posts featuring humor, commentary, and culture.", fr: "Parcourez Posts, Toasts et Roasts : des publications sociales selectionnees avec humour, commentaires et culture.", es: "Explora Posts, Toasts y Roasts: publicaciones sociales seleccionadas con humor, comentario y cultura.", ar: "تصفح المنشورات والخبز المحمص والحمص: منشورات اجتماعية منسقة تتميز بالفكاهة والتعليق والثقافة.", fa: "پست‌ها، نان تست‌ها و کباب‌ها را مرور کنید: پست‌های اجتماعی انتخاب‌شده با طنز، تفسیر و فرهنگ.", zh: "浏览帖子、吐司和吐槽：精选的社交帖子，内容包含幽默、评论和文化。" } },
                { type: "text", selector: ".back-link a", value: { en: "← Back", fr: "← Retour", es: "← Volver", ar: "← العودة", fa: "← برگشت", zh: "← 返回" } },
                { type: "text", selector: ".header h1", value: { en: "posts, toasts and roasts", fr: "posts, toasts et rotis", es: "posts, toasts y roasts", ar: "المشاركات والخبز المحمص والمحمص", fa: "پست، نان تست و کباب", zh: "帖子、吐司和烤肉" } },
                { type: "text", selector: ".header p", value: { en: "Twitter [english]", fr: "Twitter [anglais]", es: "Twitter [ingles]", ar: "تويتر [إنجليزي]", fa: "توییتر [انگلیسی]", zh: "推特 [英文]" } },
                { type: "attr", selector: "#lightbox-image", attr: "alt", value: { en: "enlarged image", fr: "image agrandie", es: "imagen ampliada", ar: "صورة مكبرة", fa: "تصویر بزرگ شده", zh: "放大图像" } }
            ],
            "big-genius-ai.html": [
                { type: "attr", selector: "title", attr: "text", value: { en: "big genius ai", fr: "grand genie ia", es: "gran genio ia", ar: "عبقري كبير بالنيابة", fa: "نابغه بزرگ ai", zh: "大天才艾" } },
                { type: "attr", selector: "meta[property=\'og:title\']", attr: "content", value: { en: "big genius ai", fr: "grand genie ia", es: "gran genio ia", ar: "عبقري كبير بالنيابة", fa: "نابغه بزرگ ai", zh: "大天才艾" } },
                { type: "attr", selector: "meta[name='description']", attr: "content", value: { en: "Explore the Big Genius AI showcase: a styled code snippet and live embedded preview of the project in one interactive page.", fr: "Explorez la vitrine Big Genius AI : un extrait de code stylise et un apercu integre du projet sur une page interactive.", es: "Explora la muestra de Big Genius AI: un fragmento de codigo estilizado y una vista previa integrada del proyecto en una pagina interactiva.", ar: "استكشف عرض Big Genius AI: مقتطف التعليمات البرمجية المصمم والمعاينة المباشرة المضمنة للمشروع في صفحة تفاعلية واحدة.", fa: "ویترین هوش مصنوعی Big Genius را کاوش کنید: یک قطعه کد سبک و پیش نمایش جاسازی شده زنده از پروژه در یک صفحه تعاملی.", zh: "探索 Big Genius AI 展示：一个交互式页面中的样式化代码片段和项目的实时嵌入预览。" } },
                { type: "attr", selector: "meta[property=\'og:description\']", attr: "content", value: { en: "Explore the Big Genius AI showcase: a styled code snippet and live embedded preview of the project in one interactive page.", fr: "Explorez la vitrine Big Genius AI : un extrait de code stylise et un apercu integre du projet sur une page interactive.", es: "Explora la muestra de Big Genius AI: un fragmento de codigo estilizado y una vista previa integrada del proyecto en una pagina interactiva.", ar: "استكشف عرض Big Genius AI: مقتطف التعليمات البرمجية المصمم والمعاينة المباشرة المضمنة للمشروع في صفحة تفاعلية واحدة.", fa: "ویترین هوش مصنوعی Big Genius را کاوش کنید: یک قطعه کد سبک و پیش نمایش جاسازی شده زنده از پروژه در یک صفحه تعاملی.", zh: "探索 Big Genius AI 展示：一个交互式页面中的样式化代码片段和项目的实时嵌入预览。" } },
                { type: "text", selector: ".back-link", value: { en: "← Back", fr: "← Retour", es: "← Volver", ar: "← العودة", fa: "← برگشت", zh: "← 返回" } },
                { type: "text", selector: ".title-block p", value: { en: "github preview", fr: "apercu GitHub", es: "vista previa de GitHub", ar: "معاينة جيثب", fa: "پیش نمایش github", zh: "github预览" } },
                { type: "attr", selector: ".code-card", attr: "aria-label", value: { en: "big-genius-ai.py code snippet", fr: "extrait de code big-genius-ai.py", es: "fragmento de codigo big-genius-ai.py", ar: "مقتطف الشفرة big-genius-ai.py", fa: "قطعه کد big-genius-ai.py", zh: "big-genius-ai.py 代码片段" } },
                { type: "text", selector: ".code-meta span", value: { en: "snippet at the top", fr: "extrait au debut", es: "fragmento en la parte superior", ar: "مقتطف في الأعلى", fa: "قطعه در بالا", zh: "顶部的片段" } },
                { type: "attr", selector: ".viewer-card", attr: "aria-label", value: { en: "GitHub iframe preview", fr: "apercu iframe GitHub", es: "vista previa de iframe de GitHub", ar: "معاينة GitHub iframe", fa: "پیش نمایش iframe GitHub", zh: "GitHub iframe 预览" } },
                { type: "text", selector: ".viewer-head p", value: { en: "live preview in an interactive iframe.", fr: "apercu en direct dans une iframe interactive.", es: "vista previa en vivo en un iframe interactivo.", ar: "معاينة مباشرة في إطار iframe تفاعلي.", fa: "پیش نمایش زنده در یک iframe تعاملی.", zh: "交互式 iframe 中的实时预览。" } },
                { type: "attr", selector: "#githubFrame", attr: "title", value: { en: "GitHub repository preview", fr: "Apercu du depot GitHub", es: "Vista previa del repositorio de GitHub", ar: "معاينة مستودع جيثب", fa: "پیش نمایش مخزن GitHub", zh: "GitHub 存储库预览" } },
                { type: "text", selector: ".frame-note", value: { en: "This universe was NOT ai generated. Please enjoy responsibly, and have a nicely functioning day!", fr: "Cet univers n'a PAS ete genere par l'IA. Profitez-en de facon responsable et passez une bonne journee!", es: "Este universo NO fue generado por IA. Disfrutalo con responsabilidad y que tengas un gran dia!", ar: "لم يتم إنشاء هذا الكون بالذكاء الاصطناعي. من فضلك استمتع بمسؤولية، واستمتع بيوم جيد!", fa: "این جهان با کمک ایجاد نشده است. لطفا مسئولانه لذت ببرید و روز خوبی داشته باشید!", zh: "这个宇宙不是人工智能生成的。请负责任地享受，祝您度过愉快的一天！" } }
            ],
            "chessnuts.html": [
                { type: "attr", selector: "title", attr: "text", value: { en: "Chessnuts | in-a-nut-s-hell.fyi", fr: "Chessnuts | in-a-nut-s-hell.fyi", es: "Chessnuts | in-a-nut-s-hell.fyi", ar: "الكستناء | in-a-nut-s-hell.fyi", fa: "شطرنج | in-a-nut-s-hell.fyi", zh: "栗子|仅供参考" } },
                { type: "attr", selector: "meta[property=\'og:title\']", attr: "content", value: { en: "Chessnuts | in-a-nut-s-hell.fyi", fr: "Chessnuts | in-a-nut-s-hell.fyi", es: "Chessnuts | in-a-nut-s-hell.fyi", ar: "الكستناء | in-a-nut-s-hell.fyi", fa: "شطرنج | in-a-nut-s-hell.fyi", zh: "栗子|仅供参考" } },
                { type: "attr", selector: "meta[name='description']", attr: "content", value: { en: "Chessnuts. Watch the featured video on in-a-nut-s-hell.fyi.", fr: "Chessnuts. Regardez la video en vedette sur in-a-nut-s-hell.fyi.", es: "Chessnuts. Mira el video destacado en in-a-nut-s-hell.fyi.", ar: "شجر الجوز. شاهد الفيديو المميز على in-a-nut-s-hell.fyi.", fa: "شطرنج. ویدیوی برجسته را در in-a-nut-s-hell.fyi تماشا کنید.", zh: "栗子。观看 in-a-nut-s-hell.fyi 上的精选视频。" } },
                { type: "attr", selector: "meta[property=\'og:description\']", attr: "content", value: { en: "Chessnuts. Watch the featured video on in-a-nut-s-hell.fyi.", fr: "Chessnuts. Regardez la video en vedette sur in-a-nut-s-hell.fyi.", es: "Chessnuts. Mira el video destacado en in-a-nut-s-hell.fyi.", ar: "شجر الجوز. شاهد الفيديو المميز على in-a-nut-s-hell.fyi.", fa: "شطرنج. ویدیوی برجسته را در in-a-nut-s-hell.fyi تماشا کنید.", zh: "栗子。观看 in-a-nut-s-hell.fyi 上的精选视频。" } },
                { type: "text", selector: "nav.back-link a", value: { en: "← Back", fr: "← Retour", es: "← Volver", ar: "← العودة", fa: "← برگشت", zh: "← 返回" } },
                { type: "attr", selector: "nav.back-link a", attr: "title", value: { en: "Return to videos", fr: "Retour aux videos", es: "Volver a los videos", ar: "العودة إلى أشرطة الفيديو", fa: "بازگشت به ویدیوها", zh: "返回视频" } },
                { type: "text", selector: "header.header p", value: { en: "Featured Video", fr: "Video en vedette", es: "Video destacado", ar: "فيديو مميز", fa: "ویدیوی ویژه", zh: "精选视频" } },
                { type: "attr", selector: "nav.back-link", attr: "aria-label", value: { en: "Breadcrumb", fr: "Fil d'ariane", es: "Ruta de navegacion", ar: "مسار التنقل", fa: "خرده نان", zh: "面包屑" } },
                { type: "attr", selector: ".iframe-wrapper", attr: "aria-label", value: { en: "Chessnuts video player", fr: "Lecteur video Chessnuts", es: "Reproductor de video Chessnuts", ar: "مشغل فيديو تشيسنوتس", fa: "پخش کننده ویدئو Chessnuts", zh: "棋子视频播放器" } },
                { type: "attr", selector: ".legend-player-controls", attr: "aria-label", value: { en: "Video playback controls", fr: "Controles de lecture video", es: "Controles de reproduccion de video", ar: "ضوابط تشغيل الفيديو", fa: "کنترل های پخش ویدئو", zh: "视频播放控件" } }
            ],
            "hack-the-universe.html": [
                { type: "attr", selector: "title", attr: "text", value: { en: "Hack the Universe Playlist | in-a-nut-s-hell.fyi", fr: "Playlist Pirater l'univers | in-a-nut-s-hell.fyi", es: "Lista Hackea el universo | in-a-nut-s-hell.fyi", ar: "قائمة تشغيل هاك الكون | in-a-nut-s-hell.fyi", fa: "هک لیست پخش کیهان | in-a-nut-s-hell.fyi", zh: "破解宇宙播放列表 |仅供参考" } },
                { type: "attr", selector: "meta[property=\'og:title\']", attr: "content", value: { en: "Hack the Universe Playlist | in-a-nut-s-hell.fyi", fr: "Playlist Pirater l'univers | in-a-nut-s-hell.fyi", es: "Lista Hackea el universo | in-a-nut-s-hell.fyi", ar: "قائمة تشغيل هاك الكون | in-a-nut-s-hell.fyi", fa: "هک لیست پخش کیهان | in-a-nut-s-hell.fyi", zh: "破解宇宙播放列表 |仅供参考" } },
                { type: "attr", selector: "meta[name='description']", attr: "content", value: { en: "Watch the Hack the Universe playlist: a curated set of YouTube videos.", fr: "Regardez la playlist Hack the Universe : une selection de videos YouTube.", es: "Mira la lista Hack the Universe: una seleccion curada de videos de YouTube.", ar: "شاهد قائمة تشغيل Hack the Universe: مجموعة منسقة من مقاطع فيديو YouTube.", fa: "فهرست پخش Hack the Universe را تماشا کنید: مجموعه‌ای از ویدیوهای یوتیوب.", zh: "观看 Hack the Universe 播放列表：一组精选的 YouTube 视频。" } },
                { type: "attr", selector: "meta[property=\'og:description\']", attr: "content", value: { en: "Watch the Hack the Universe playlist: a curated set of YouTube videos.", fr: "Regardez la playlist Hack the Universe : une selection de videos YouTube.", es: "Mira la lista Hack the Universe: una seleccion curada de videos de YouTube.", ar: "شاهد قائمة تشغيل Hack the Universe: مجموعة منسقة من مقاطع فيديو YouTube.", fa: "فهرست پخش Hack the Universe را تماشا کنید: مجموعه‌ای از ویدیوهای یوتیوب.", zh: "观看 Hack the Universe 播放列表：一组精选的 YouTube 视频。" } },
                { type: "text", selector: ".back-link a", value: { en: "← Back", fr: "← Retour", es: "← Volver", ar: "← العودة", fa: "← برگشت", zh: "← 返回" } },
                { type: "text", selector: ".header h1", value: { en: "hack the universe", fr: "pirater l'univers", es: "hackea el universo", ar: "اختراق الكون", fa: "کیهان را هک کن", zh: "破解宇宙" } },
                { type: "text", selector: ".header p", value: { en: "YouTube Playlist", fr: "Liste YouTube", es: "Lista de YouTube", ar: "قائمة تشغيل يوتيوب", fa: "لیست پخش YouTube", zh: "YouTube 播放列表" } }
            ],
            "he-is-legend.html": [
                { type: "attr", selector: "title", attr: "text", value: { en: "He Is Legend - Mouck Shudow | in-a-nut-s-hell.fyi", fr: "He Is Legend - Mouck Shudow | in-a-nut-s-hell.fyi", es: "He Is Legend - Mouck Shudow | in-a-nut-s-hell.fyi", ar: "إنه أسطورة - موك شادو | in-a-nut-s-hell.fyi", fa: "او افسانه است - موک شودو | in-a-nut-s-hell.fyi", zh: "他是传奇 - Mouck Shudow |仅供参考" } },
                { type: "attr", selector: "meta[property=\'og:title\']", attr: "content", value: { en: "He Is Legend - Mouck Shudow | in-a-nut-s-hell.fyi", fr: "He Is Legend - Mouck Shudow | in-a-nut-s-hell.fyi", es: "He Is Legend - Mouck Shudow | in-a-nut-s-hell.fyi", ar: "إنه أسطورة - موك شادو | in-a-nut-s-hell.fyi", fa: "او افسانه است - موک شودو | in-a-nut-s-hell.fyi", zh: "他是传奇 - Mouck Shudow |仅供参考" } },
                { type: "attr", selector: "meta[name='description']", attr: "content", value: { en: "He Is Legend - Mouck Shudow. Watch the featured YouTube video.", fr: "He Is Legend - Mouck Shudow. Regardez la video YouTube en vedette.", es: "He Is Legend - Mouck Shudow. Mira el video destacado de YouTube.", ar: "إنه أسطورة - موك شادو. شاهد الفيديو المميز على اليوتيوب.", fa: "او افسانه است - موک شودو. ویدیوی ویژه یوتیوب را تماشا کنید.", zh: "他是传奇 - Mouck Shudow。观看 YouTube 精选视频。" } },
                { type: "attr", selector: "meta[property=\'og:description\']", attr: "content", value: { en: "He Is Legend - Mouck Shudow. Watch the featured YouTube video.", fr: "He Is Legend - Mouck Shudow. Regardez la video YouTube en vedette.", es: "He Is Legend - Mouck Shudow. Mira el video destacado de YouTube.", ar: "إنه أسطورة - موك شادو. شاهد الفيديو المميز على اليوتيوب.", fa: "او افسانه است - موک شودو. ویدیوی ویژه یوتیوب را تماشا کنید.", zh: "他是传奇 - Mouck Shudow。观看 YouTube 精选视频。" } },
                { type: "text", selector: "nav.back-link a", value: { en: "← Back", fr: "← Retour", es: "← Volver", ar: "← العودة", fa: "← برگشت", zh: "← 返回" } },
                { type: "attr", selector: "nav.back-link a", attr: "title", value: { en: "Return to videos", fr: "Retour aux videos", es: "Volver a los videos", ar: "العودة إلى أشرطة الفيديو", fa: "بازگشت به ویدیوها", zh: "返回视频" } },
                { type: "text", selector: "header.header p", value: { en: "Legendary YouTube Content", fr: "Contenu YouTube legendaire", es: "Contenido legendario de YouTube", ar: "محتوى يوتيوب الأسطوري", fa: "محتوای افسانه ای یوتیوب", zh: "传奇的 YouTube 内容" } },
                { type: "attr", selector: "nav.back-link", attr: "aria-label", value: { en: "Breadcrumb", fr: "Fil d'ariane", es: "Ruta de navegacion", ar: "مسار التنقل", fa: "خرده نان", zh: "面包屑" } },
                { type: "attr", selector: ".iframe-wrapper", attr: "aria-label", value: { en: "He Is Legend - Mouck Shudow video player", fr: "Lecteur video He Is Legend - Mouck Shudow", es: "Reproductor de video He Is Legend - Mouck Shudow", ar: "إنه أسطورة - مشغل فيديو Muck Shudow", fa: "He Is Legend - پخش کننده ویدئو Mouck Shudow", zh: "他是传奇 - Mouck Shudow 视频播放器" } },
                { type: "attr", selector: ".legend-player-controls", attr: "aria-label", value: { en: "Video playback controls", fr: "Controles de lecture video", es: "Controles de reproduccion de video", ar: "ضوابط تشغيل الفيديو", fa: "کنترل های پخش ویدئو", zh: "视频播放控件" } }
            ],
            "kun-anta.html": [
                { type: "attr", selector: "title", attr: "text", value: { en: "Kun Anta | in-a-nut-s-hell.fyi", fr: "Kun Anta | in-a-nut-s-hell.fyi", es: "Kun Anta | in-a-nut-s-hell.fyi", ar: "كون أنتا | in-a-nut-s-hell.fyi", fa: "کان آنتا | in-a-nut-s-hell.fyi", zh: "坤安踏|仅供参考" } },
                { type: "attr", selector: "meta[property=\'og:title\']", attr: "content", value: { en: "Kun Anta | in-a-nut-s-hell.fyi", fr: "Kun Anta | in-a-nut-s-hell.fyi", es: "Kun Anta | in-a-nut-s-hell.fyi", ar: "كون أنتا | in-a-nut-s-hell.fyi", fa: "کان آنتا | in-a-nut-s-hell.fyi", zh: "坤安踏|仅供参考" } },
                { type: "attr", selector: "meta[name='description']", attr: "content", value: { en: "Watch Kun Anta: featured YouTube video with an emotional and poetic atmosphere.", fr: "Regardez Kun Anta : video YouTube en vedette avec une atmosphere emotionnelle et poetique.", es: "Mira Kun Anta: video destacado de YouTube con una atmosfera emocional y poetica.", ar: "شاهد كون أنتا: فيديو مميز على اليوتيوب بأجواء عاطفية وشاعرية.", fa: "Kun Anta: ویدیوی ویژه یوتیوب را با فضایی احساسی و شاعرانه تماشا کنید.", zh: "观看《坤安踏》：充满情感和诗意氛围的精选 YouTube 视频。" } },
                { type: "attr", selector: "meta[property=\'og:description\']", attr: "content", value: { en: "Watch Kun Anta: featured YouTube video with an emotional and poetic atmosphere.", fr: "Regardez Kun Anta : video YouTube en vedette avec une atmosphere emotionnelle et poetique.", es: "Mira Kun Anta: video destacado de YouTube con una atmosfera emocional y poetica.", ar: "شاهد كون أنتا: فيديو مميز على اليوتيوب بأجواء عاطفية وشاعرية.", fa: "Kun Anta: ویدیوی ویژه یوتیوب را با فضایی احساسی و شاعرانه تماشا کنید.", zh: "观看《坤安踏》：充满情感和诗意氛围的精选 YouTube 视频。" } },
                { type: "text", selector: ".back-link a", value: { en: "← Back", fr: "← Retour", es: "← Volver", ar: "← العودة", fa: "← برگشت", zh: "← 返回" } },
                { type: "text", selector: ".header p", value: { en: "YouTube", fr: "YouTube", es: "YouTube", ar: "يوتيوب", fa: "یوتیوب", zh: "YouTube" } },
                { type: "text", selector: ".video-block .sr-only", value: { en: "Kun Anta featured video player", fr: "Lecteur video Kun Anta en vedette", es: "Reproductor de video destacado de Kun Anta", ar: "كون أنتا مشغل فيديو مميز", fa: "پخش کننده ویدیویی ویژه Kun Anta", zh: "坤安踏精选视频播放器" } },
                { type: "attr", selector: ".seo-copy", attr: "aria-label", value: { en: "About this video", fr: "A propos de cette video", es: "Sobre este video", ar: "حول هذا الفيديو", fa: "درباره این ویدیو", zh: "关于这个视频" } },
                { type: "text", selector: ".seo-copy h2", value: { en: "About Kun Anta", fr: "A propos de Kun Anta", es: "Sobre Kun Anta", ar: "حول كون أنتا", fa: "درباره کان آنتا", zh: "关于坤安踏" } },
                { type: "text", selector: ".seo-copy p", value: { en: "Based on the available public metadata and thumbnail for Kun - Anta (by Austin James Hogan), the video appears to be a short, mood-driven piece centered on love and emotional connection, using simple symbolic visuals like two hands forming a heart shape against the sky and stylized script text to create a poetic, reflective tone; overall, it feels more like an aesthetic or lyrical visual moment than a plot-heavy narrative, emphasizing feeling, intimacy, and atmosphere over detailed storytelling.", fr: "D'apres les metadonnees publiques et la miniature disponibles pour Kun - Anta (par Austin James Hogan), la video semble etre une piece courte et emotive centree sur l'amour et la connexion emotionnelle, avec des visuels symboliques simples comme deux mains formant un coeur devant le ciel et un texte stylise pour creer un ton poetique et reflexif ; globalement, elle ressemble plus a un moment visuel esthetique ou lyrique qu'a un recit riche en intrigue, et met l'accent sur le ressenti, l'intimite et l'atmosphere.", es: "Segun los metadatos publicos y la miniatura disponibles de Kun - Anta (por Austin James Hogan), el video parece ser una pieza corta y guiada por el estado de animo, centrada en el amor y la conexion emocional, usando visuales simbolicos simples como dos manos formando un corazon contra el cielo y texto estilizado para crear un tono poetico y reflexivo; en general, se siente mas como un momento visual estetico o lirico que como una narrativa cargada de trama, poniendo el enfasis en la emocion, la intimidad y la atmosfera por encima del relato detallado.", ar: "استنادًا إلى البيانات الوصفية العامة المتاحة والصورة المصغرة لـ Kun - Anta (بواسطة أوستن جيمس هوجان)، يبدو أن الفيديو عبارة عن قطعة قصيرة تعتمد على الحالة المزاجية وتتمحور حول الحب والتواصل العاطفي، وذلك باستخدام صور رمزية بسيطة مثل اليدين اللتين تشكلان شكل قلب مقابل السماء ونص نصي منمق لإنشاء نغمة شعرية عاكسة؛ بشكل عام، يبدو الأمر وكأنه لحظة بصرية جمالية أو غنائية أكثر من كونه سردًا ثقيلًا بالحبكة، مع التركيز على الشعور والحميمية والجو عبر رواية القصص التفصيلية.", fa: "بر اساس ابرداده‌های عمومی موجود و تصویر کوچک برای Kun - Anta (توسط آستین جیمز هوگان)، به نظر می‌رسد این ویدیو قطعه‌ای کوتاه و مبتنی بر خلق و خوی است که بر عشق و ارتباط عاطفی متمرکز است و از تصاویر نمادین ساده مانند دو دست که شکل قلب را در برابر آسمان تشکیل می‌دهند و متن اسکریپتی تلطیف‌شده برای ایجاد لحنی شاعرانه و بازتاب‌کننده استفاده می‌کند. به طور کلی، بیشتر شبیه یک لحظه بصری زیبایی‌شناختی یا غنایی است تا یک روایت سنگین که بر احساس، صمیمیت و فضا بر داستان‌گویی دقیق تأکید دارد.", zh: "根据《坤 - 安踏》（奥斯汀·詹姆斯·霍根制作）的可用公共元数据和缩略图，该视频似乎是一个简短的、情绪驱动的作品，以爱和情感联系为中心，使用简单的象征性视觉效果，例如两只手在天空中形成心形，并使用程式化的脚本文本来创造一种诗意的、反思的基调；总体而言，它感觉更像是一个美学或抒情的视觉时刻，而不是一个情节沉重的叙事，强调感觉、亲密感和氛围而不是详细的故事讲述。" } }
            ],
            "pewdie-mars.html": [
                { type: "attr", selector: "title", attr: "text", value: { en: "Pewdie Mars - Bruno Pie Playlist | in-a-nut-s-hell.fyi", fr: "Pewdie Mars - Bruno Pie Liste YouTube | in-a-nut-s-hell.fyi", es: "Pewdie Mars - Bruno Pie Lista de YouTube | in-a-nut-s-hell.fyi", ar: "بيودي مارس - قائمة تشغيل فطيرة برونو | in-a-nut-s-hell.fyi", fa: "Pewdie Mars - Bruno Pie لیست پخش | in-a-nut-s-hell.fyi", zh: "Pewdie Mars - Bruno Pie 播放列表 |仅供参考" } },
                { type: "attr", selector: "meta[property=\'og:title\']", attr: "content", value: { en: "Pewdie Mars - Bruno Pie Playlist | in-a-nut-s-hell.fyi", fr: "Pewdie Mars - Bruno Pie Liste YouTube | in-a-nut-s-hell.fyi", es: "Pewdie Mars - Bruno Pie Lista de YouTube | in-a-nut-s-hell.fyi", ar: "بيودي مارس - قائمة تشغيل فطيرة برونو | in-a-nut-s-hell.fyi", fa: "Pewdie Mars - Bruno Pie لیست پخش | in-a-nut-s-hell.fyi", zh: "Pewdie Mars - Bruno Pie 播放列表 |仅供参考" } },
                { type: "attr", selector: "meta[name='description']", attr: "content", value: { en: "Watch the Pewdie Mars - Bruno Pie historical playlist on YouTube.", fr: "Regardez la playlist historique Pewdie Mars - Bruno Pie sur YouTube.", es: "Mira la lista historica de Pewdie Mars - Bruno Pie en YouTube.", ar: "شاهد قائمة التشغيل التاريخية Pewdie Mars - Bruno Pie على YouTube.", fa: "لیست پخش تاریخی Pewdie Mars - Bruno Pie را در YouTube تماشا کنید.", zh: "在 YouTube 上观看 Pewdie Mars - Bruno Pie 历史播放列表。" } },
                { type: "attr", selector: "meta[property=\'og:description\']", attr: "content", value: { en: "Watch the Pewdie Mars - Bruno Pie historical playlist on YouTube.", fr: "Regardez la playlist historique Pewdie Mars - Bruno Pie sur YouTube.", es: "Mira la lista historica de Pewdie Mars - Bruno Pie en YouTube.", ar: "شاهد قائمة التشغيل التاريخية Pewdie Mars - Bruno Pie على YouTube.", fa: "لیست پخش تاریخی Pewdie Mars - Bruno Pie را در YouTube تماشا کنید.", zh: "在 YouTube 上观看 Pewdie Mars - Bruno Pie 历史播放列表。" } },
                { type: "text", selector: ".back-link a", value: { en: "← Back", fr: "← Retour", es: "← Volver", ar: "← العودة", fa: "← برگشت", zh: "← 返回" } },
                { type: "text", selector: ".header h1", value: { en: "pewdie mars - bruno pie! [historical]", fr: "pewdie mars - bruno pie! [historique]", es: "pewdie mars - bruno pie! [historico]", ar: "بيودي مارس - فطيرة برونو! [تاريخي]", fa: "pewdie mars - برونو پای! [تاریخی]", zh: "皮尤迪·火星 - 布鲁诺派！ [历史]" } },
                { type: "text", selector: ".header p", value: { en: "YouTube Playlist", fr: "Liste YouTube", es: "Lista de YouTube", ar: "قائمة تشغيل يوتيوب", fa: "لیست پخش YouTube", zh: "YouTube 播放列表" } }
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
            return;
        }

        if (lang === "es") {
            titleNode.textContent = text
                .replace("Page Not Found", "Pagina no encontrada")
                .replace("Featured Video", "Video destacado")
                .replace("Playlist", "Lista");
            return;
        }

        if (lang === "ar") {
            titleNode.textContent = text
                .replace("Page Not Found", "الصفحة غير موجودة")
                .replace("Featured Video", "فيديو مميز")
                .replace("Playlist", "قائمة");
            return;
        }

        if (lang === "fa") {
            titleNode.textContent = text
                .replace("Page Not Found", "صفحه پیدا نشد")
                .replace("Featured Video", "ویدیوی ویژه")
                .replace("Playlist", "فهرست");
            return;
        }

        if (lang === "zh") {
            titleNode.textContent = text
                .replace("Page Not Found", "页面未找到")
                .replace("Featured Video", "精选视频")
                .replace("Playlist", "播放列表");
        }
    }

    function mountLanguageSwitcher(initialLang, onChange) {
        var switcher = document.createElement("div");
        switcher.setAttribute("aria-label", "Language Switcher");
        switcher.id = "languageer-safe";

        var optionsBtn = document.createElement("button");
        optionsBtn.type = "button";
        optionsBtn.id = "languageer-options";
        optionsBtn.setAttribute("aria-haspopup", "true");
        optionsBtn.setAttribute("aria-expanded", "false");

        var menu = document.createElement("div");
        menu.id = "languageer-menu";
        menu.setAttribute("role", "menu");
        menu.setAttribute("aria-label", "Language options");

        var enBtn = document.createElement("button");
        enBtn.type = "button";
        enBtn.textContent = "EN";
        enBtn.dataset.lang = "en";

        var frBtn = document.createElement("button");
        frBtn.type = "button";
        frBtn.textContent = "FR";
        frBtn.dataset.lang = "fr";

        var esBtn = document.createElement("button");
        esBtn.type = "button";
        esBtn.textContent = "ES";
        esBtn.dataset.lang = "es";

        var arBtn = document.createElement("button");
        arBtn.type = "button";
        arBtn.textContent = "العربية";
        arBtn.dataset.lang = "ar";

        var faBtn = document.createElement("button");
        faBtn.type = "button";
        faBtn.textContent = "فارسی";
        faBtn.dataset.lang = "fa";

        var zhBtn = document.createElement("button");
        zhBtn.type = "button";
        zhBtn.textContent = "中文";
        zhBtn.dataset.lang = "zh";

        menu.appendChild(enBtn);
        menu.appendChild(frBtn);
        menu.appendChild(esBtn);
        menu.appendChild(arBtn);
        menu.appendChild(faBtn);
        menu.appendChild(zhBtn);

        switcher.appendChild(optionsBtn);
        switcher.appendChild(menu);

        function updateOptionsLabel(lang) {
            optionsBtn.textContent = "Options - " + String(lang).toUpperCase();
        }

        function setMenuOpen(isOpen) {
            if (isOpen) {
                switcher.classList.add("open");
                optionsBtn.setAttribute("aria-expanded", "true");
            } else {
                switcher.classList.remove("open");
                optionsBtn.setAttribute("aria-expanded", "false");
            }
        }

        function markActive(lang) {
            switcher.querySelectorAll("button[data-lang]").forEach(function (btn) {
                if (btn.dataset.lang === lang) {
                    btn.setAttribute("aria-pressed", "true");
                    btn.classList.add("active");
                } else {
                    btn.setAttribute("aria-pressed", "false");
                    btn.classList.remove("active");
                }
            });

            updateOptionsLabel(lang);
        }

        switcher.addEventListener("click", function (evt) {
            if (evt.target === optionsBtn) {
                setMenuOpen(!switcher.classList.contains("open"));
                return;
            }

            var btn = evt.target.closest("button[data-lang]");
            if (!btn) return;

            var lang = btn.dataset.lang;
            if (SUPPORTED_LANGS.indexOf(lang) === -1) return;
            markActive(lang);
            setMenuOpen(false);
            onChange(lang);
        });

        document.addEventListener("click", function (evt) {
            if (!switcher.contains(evt.target)) {
                setMenuOpen(false);
            }
        });

        document.body.appendChild(switcher);
        markActive(initialLang);
        setMenuOpen(false);
    }

    function installSwitcherStyles() {
        var style = document.createElement("style");
        style.textContent = [
            "#languageer-safe {",
            "  position: fixed;",
            "  right: calc(100vw / 7);",
            "  bottom: 14px;",
            "  z-index: 9999;",
            "  display: inline-block;",
            "  padding: 6px;",
            "  border-radius: 9px;",
            "  background: rgba(0,0,0,0.62);",
            "  border: 1px solid rgba(255,255,255,0.24);",
            "  backdrop-filter: blur(4px);",
            "  min-width: 132px;",
            "}",
            "#languageer-menu {",
            "  display: none;",
            "  margin-top: 6px;",
            "  padding-top: 4px;",
            "  border-top: 1px solid rgba(255,255,255,0.18);",
            "  grid-template-columns: 1fr 1fr;",
            "  gap: 6px;",
            "}",
            "#languageer-safe.open #languageer-menu {",
            "  display: grid;",
            "}",
            "#languageer-safe button {",
            "  border: 1px solid rgba(255,255,255,0.25);",
            "  background: rgba(255,255,255,0.08);",
            "  color: #fff;",
            "  border-radius: 9px;",
            "  padding: 5px 9px;",
            "  font: 600 12px/1 sans-serif;",
            "  cursor: pointer;",
            "}",
            "#languageer-options {",
            "  width: 100%;",
            "  transition: border-radius 0.16s ease, background-color 0.16s ease;",
            "}",
            "#languageer-safe.open #languageer-options {",
            "  border-radius: 9px;",
            "  background: rgba(255,255,255,0.18);",
            "}",
            "#languageer-safe button.active {",
            "  background: #fff;",
            "  color: #111;",
            "}",
            "@media (max-width: 640px) {",
            "  #languageer-safe { right: calc(100vw / 7); bottom: 10px; }",
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
        if (lang !== "en") {
            url.searchParams.set("lang", lang);
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

    function syncSeoTextForLang() {
        var titleNode = document.querySelector("title");
        var descriptionNode = document.querySelector("meta[name='description']");
        var translatedTitle = titleNode ? (titleNode.textContent || "") : "";
        var translatedDescription = descriptionNode ? (descriptionNode.getAttribute("content") || "") : "";

        if (translatedTitle) {
            setAttr("meta[property='og:title']", "content", translatedTitle);
            setAttr("meta[name='twitter:title']", "content", translatedTitle);
        }

        if (translatedDescription) {
            setAttr("meta[property='og:description']", "content", translatedDescription);
            setAttr("meta[name='twitter:description']", "content", translatedDescription);
        }
    }

    function applyLanguage(lang) {
        var page = getPageName();
        currentLang = lang;

        document.documentElement.setAttribute("lang", lang);
        document.documentElement.setAttribute("dir", RTL_LANGS.indexOf(lang) !== -1 ? "rtl" : "ltr");
        setAttr("meta[property='og:locale']", "content", lang === "fr" ? "fr_FR" : (lang === "es" ? "es_ES" : (lang === "ar" ? "ar_SA" : (lang === "fa" ? "fa_IR" : (lang === "zh" ? "zh_CN" : "en_US")))));
        applyEntries(pageEntries(page), lang);
        applyDocumentTitleFallback(lang);
        syncSeoTextForLang();
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
