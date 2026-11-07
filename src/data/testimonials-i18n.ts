import type { TestimonialId } from "./testimonials";

// Переводы цитат из благодарственных писем для /kk и /en. Оригинал — русский,
// дословный (testimonials.ts); здесь — перевод того же текста без «улучшений»,
// и на странице он подписан «Перевод с русского». Многоточия — как в оригинале.
type Tr = { quote: string; role?: string; company: string; training: string };

export const TESTIMONIALS_I18N: Record<"kk" | "en", Partial<Record<TestimonialId, Tr>>> = {
  en: {
    pharma: {
      quote: "Gani Abadan demonstrates a professional approach… His solutions have the potential to scale and to integrate modern technologies, including the use of AI tools in training. We note the consistency and systematic nature of his work, as well as his ability to build programmes that combine strategic thinking, leadership development and modern EdTech approaches.",
      role: "Regional HR Director", company: "international pharmaceutical company", training: "Leadership development programme, 12 weeks, 2025",
    },
    kaspi: {
      quote: "In choosing your company, we did not make a mistake. Thanks to your team's well-coordinated work, the team-building event was vivid and memorable. Thank you for the competent organisation, responsiveness and excellent result.",
      role: "Director of the Aktau branch", company: "Kaspi Bank", training: "Team building",
    },
    oilServiceAktau: {
      quote: "The high level of service, the professionalism and conscientiousness of the staff, as well as a flexible approach and responsibility… allow us to rate your work highly.",
      role: "General Director", company: "oilfield services company, Aktau", training: "Team-building training “In Search of Adventure”",
    },
    k7: {
      quote: "The real estate consultants are especially grateful for the new cases and tools for increasing sales. Understanding the psychological factors of their clients proved especially valuable. The training was easy-going, everyone was on the same wavelength, and the mood was positive.",
      role: "Sales and Marketing Department", company: "K7 GROUP", training: "Sales training",
    },
    asbis: {
      quote: "The company and the participants are fully satisfied with the results of Gani Abadan's work. We would especially like to note his high qualifications… and professionalism in developing training programmes.",
      role: "Director", company: "ASBIS Kazakhstan", training: "Training “Sales Technology”",
    },
    nOperating: {
      quote: "…Gani, despite his young age, is a very educated, experienced and qualified trainer. He knows how to find an approach to any audience and runs the seminar in a relaxed atmosphere using a variety of exercises…",
      role: "Administrative Manager", company: "N Operating Company, Mangystau", training: "Seminars “Motivation” and “Effective Communication”",
    },
    pits: {
      quote: "We would especially like to note the highly professional and competent approach to developing optimal programmes and methods based on the needs of client companies, and, as a result, the high effectiveness of the training.",
      role: "Director", company: "PITS Training Centre", training: "Training programmes, 2021",
    },
    mfca: {
      quote: "…for supporting the Alphability project by running a time management training, as well as methodological support for trainings on teamwork and communication.",
      role: "Acting CEO, BCPD Bureau", company: "AIFC", training: "Time management and training methodology, 2021",
    },
    oilGasAtyrau: {
      quote: "Gani Abadan's trainings are always relevant in content, with a set of practical cases and concrete recommendations. We rate his level of professionalism, responsibility and reliability… very highly.",
      role: "Director", company: "oil and gas company, Atyrau", training: "Business coaching for managers",
    },
    kbtu: {
      quote: "The training was built according to the client's wishes and adapted to the specifics of the industry. The high level, professionalism and conscientiousness… allow us to rate your work highly.",
      role: "General Director", company: "KBTU, Institute of Oil and Gas Engineering", training: "Management competencies and negotiations for the managers of an oil and gas company, 2016",
    },
    narxoz: {
      quote: "…the concepts and techniques of mentoring with clarity and accessibility, and the presentations and practical exercises helped participants better master mentoring skills and develop their leadership abilities.",
      role: "Acting Director", company: "Narxoz Business School", training: "“Effective Mentor” for Kazakhstan Temir Zholy JSC, 2023",
    },
    nuris: {
      quote: "The trainer's extensive practical experience, focus on the group's needs and excellent presentation skills made it possible to achieve the goals set for the training.",
      role: "General Director", company: "NURIS, Nazarbayev University", training: "“Become a Successful Leader” and “Build Your Business”",
    },
    vitaprofi: {
      quote: "The team took 100% active part… something we had not achieved in trainings previously organised with other trainers. …A month later — noticeable improvements in our company's work… a better understanding of clients' pain points and expectations.",
      company: "VitaProfi, Akkol", training: "“Self-Management and Building a Business Model”, 2017",
    },
    most: {
      quote: "Excellent organisation of the training and achievement of the learning goals agreed in advance, thanks to a clear presentation of the essence and concrete reinforcing examples… which allowed participants to get rid of their blinkers and look at things with different eyes.",
      company: "MOST Business Incubator", training: "Training for participants of the acceleration programme",
    },
  },
  kk: {
    pharma: {
      quote: "Ғани Абадан кәсіби тәсіл көрсетеді… Оның шешімдерінің ауқымын кеңейту және заманауи технологияларды, соның ішінде оқытуда ЖИ құралдарын қолдануды біріктіру әлеуеті бар. Біз оның жұмысының тұрақтылығы мен жүйелілігін, сондай-ақ стратегиялық ойлауды, көшбасшылық дағдыларды дамытуды және заманауи EdTech тәсілдерін ұштастыратын бағдарламалар құра білетінін атап өтеміз.",
      role: "Персоналмен жұмыс жөніндегі өңірлік директор", company: "халықаралық фармацевтикалық компания", training: "Басшыларды дамыту бағдарламасы, 12 апта, 2025",
    },
    kaspi: {
      quote: "Сіздің компанияңызды таңдап, қателеспедік. Командаңыздың үйлесімді жұмысының арқасында командалық іс-шара жарқын әрі есте қаларлық болды. Сауатты ұйымдастыру, жеделдік және тамаша нәтиже үшін рахмет.",
      role: "Ақтаудағы филиал директоры", company: "Kaspi Bank", training: "Командалық тимбилдинг",
    },
    oilServiceAktau: {
      quote: "Қызмет көрсетудің жоғары деңгейі, қызметкерлердің кәсібилігі мен адалдығы, сондай-ақ икемді тәсіл мен жауапкершілік… Сіздің жұмысыңызға жоғары баға беруге мүмкіндік береді.",
      role: "Бас директор", company: "мұнай сервистік компаниясы, Ақтау", training: "«Шытырман оқиға іздеуде» командалық тренингі",
    },
    k7: {
      quote: "Жылжымайтын мүлік жөніндегі кеңесшілер сатылымды арттыруға арналған жаңа кейстер мен құралдар үшін ерекше алғыс айтады. Әсіресе клиенттерінің психологиялық факторларын түсіну құнды болды. Тренинг жеңіл, бір толқында және жағымды көңіл-күйде өтті.",
      role: "Сату және маркетинг бөлімі", company: "K7 GROUP", training: "Сату бойынша тренинг",
    },
    asbis: {
      quote: "Компания мен қатысушылар Ғани Абаданның жұмысының нәтижелеріне толық риза. Әсіресе оның жоғары біліктілігін… және оқу бағдарламаларын әзірлеудегі кәсібилігін атап өткіміз келеді.",
      role: "Директор", company: "ASBIS Kazakhstan", training: "«Сату технологиясы» тренингі",
    },
    nOperating: {
      quote: "…Ғани жасының жастығына қарамастан өте білімді, тәжірибелі және білікті тренер. Ол кез келген аудиторияға жол таба біледі және семинарды түрлі жаттығуларды қолданып, еркін ахуалда өткізеді…",
      role: "Әкімшілік менеджер", company: "Н Оперейтинг Компани, Маңғыстау", training: "«Уәждеме» және «Тиімді коммуникация» семинарлары",
    },
    pits: {
      quote: "Клиент компаниялардың қажеттіліктерін ескере отырып, оңтайлы бағдарламалар мен қолданылатын әдістемелерді әзірлеуге жоғары кәсіби әрі құзыретті тәсілді және соның нәтижесінде өткізілген оқытудың жоғары нәтижелілігін ерекше атап өткіміз келеді.",
      role: "Директор", company: "PITS оқу орталығы", training: "Оқыту бағдарламалары, 2021",
    },
    mfca: {
      quote: "…уақытты басқару бойынша тренинг өткізу, сондай-ақ командалық жұмыс пен коммуникация жөніндегі тренингтерді әдістемелік сүйемелдеу арқылы Alphability жобасына қолдау көрсеткені үшін.",
      role: "Acting CEO, BCPD бюросы", company: "АХҚО", training: "Тайм-менеджмент және тренинг әдістемесі, 2021",
    },
    oilGasAtyrau: {
      quote: "Ғани Абаданның тренингтері мазмұны жағынан әрқашан өзекті, практикалық кейстер жиынтығы мен нақты ұсыныстары бар. Кәсібилік деңгейін, жауапкершілік пен сенімділікті… өте жоғары бағалаймыз.",
      role: "Директор", company: "мұнай-газ компаниясы, Атырау", training: "Басшыларға арналған бизнес-коучинг",
    },
    kbtu: {
      quote: "Оқыту тапсырыс берушінің тілектеріне сай құрылып, сала ерекшелігіне бейімделді. Жоғары деңгей, кәсібилік, адалдық… Сіздің жұмысыңызға жоғары баға беруге мүмкіндік береді.",
      role: "Бас директор", company: "ҚБТУ, Мұнай-газ инжинирингі институты", training: "Мұнай-газ компаниясы басшыларына арналған басқарушылық құзыреттер және келіссөздер, 2016",
    },
    narxoz: {
      quote: "…тәлімгерліктің тұжырымдамалары мен техникаларын анық әрі түсінікті етіп берді, ал презентациялар мен практикалық жаттығулар қатысушыларға тәлімгерлік дағдыларын жақсырақ меңгеруге және көшбасшылық қабілеттерін дамытуға көмектесті.",
      role: "Директордың м.а.", company: "Narxoz Business School", training: "«Қазақстан темір жолы» АҚ үшін «Тиімді тәлімгер», 2023",
    },
    nuris: {
      quote: "Тренердің үлкен практикалық тәжірибесі, топтың қажеттіліктеріне бағдарлануы және тамаша презентациялық дағдылары оқыту алдына қойылған мақсаттарға жетуге мүмкіндік берді.",
      role: "Бас директор", company: "NURIS, Назарбаев Университеті", training: "«Табысты көшбасшы бол» және «Өз бизнесіңді құр»",
    },
    vitaprofi: {
      quote: "Ұжым 100% белсенді қатысты… басқа тренерлермен бұрын ұйымдастырылған тренингтерде біз бұған жете алмағанбыз. …Бір айдан кейін — фирмамыздың жұмысында байқалатын жақсарулар… клиенттердің қиындықтары мен күтулерін жақсырақ түсіну.",
      company: "ВитаПрофи, Ақкөл", training: "«Өзін-өзі басқару және бизнес-модель құру», 2017",
    },
    most: {
      quote: "Тренингтің тамаша ұйымдастырылуы және мәнін анық баяндау, нақты бекітетін мысалдар арқасында алдын ала келісілген оқу мақсаттарына қол жеткізу… бұл қатысушыларға тар көзқарастан арылып, нәрселерге басқа көзбен қарауға мүмкіндік берді.",
      company: "MOST бизнес-инкубаторы", training: "Акселерация бағдарламасы қатысушыларына арналған тренинг",
    },
  },
};
