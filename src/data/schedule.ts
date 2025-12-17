export interface ScheduleItem {
  date: string;
  month: string;
  name: string;
  hours: number;
  priceOnline: number;
  priceOffline: number;
  category: "business" | "technical";
}

export const SCHEDULE_DATA: ScheduleItem[] = [
  {
    "date": "8-9 января",
    "month": "Январь",
    "name": "Нормирование и оплата труда. Суммированный учёт рабочего времени",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "8-9 января",
    "month": "Январь",
    "name": "Курс повышения квалификации юристов и специалистов кадровых служб",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "12-13 января",
    "month": "Январь",
    "name": "Управление результативностью и энергией в команде",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "business"
  },
  {
    "date": "12-13 января",
    "month": "Январь",
    "name": "Бюджетирование и контроль затрат",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "15-16 января",
    "month": "Январь",
    "name": "Новые законодательные требования в сфере экологического регулирования Республики Казахстан",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "15-16 января",
    "month": "Январь",
    "name": "Технологии управления инвентаризацией. Нормирование, прогнозирование, оптимизация",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "29-30 января",
    "month": "Январь",
    "name": "Расчет заработной платы: что необходимо знать с учетом изменений в 2026 году. Практика применения",
    "hours": 8,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "2-3 февраля",
    "month": "Февраль",
    "name": "Достижение консенсуса в трудовых спорах. Трудовые отношения между работодателем и работником. Согласительная комиссия",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "5-6 февраля",
    "month": "Февраль",
    "name": "Арбитраж как форма разрешения гражданско-правовых вопросов",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "9-10 февраля",
    "month": "Февраль",
    "name": "Учет и анализ производственных затрат",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "12-13 февраля",
    "month": "Февраль",
    "name": "Эмоциональный интеллект и эмоциональное лидерство",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "business"
  },
  {
    "date": "16-17 февраля",
    "month": "Февраль",
    "name": "Бюджетирование и план развития",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "19-20 февраля",
    "month": "Февраль",
    "name": "Основы Кайдзен: Бережливое производство",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "26-27 февраля",
    "month": "Февраль",
    "name": "Управление и оптимизация в складской логистике",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "2-3 марта",
    "month": "Март",
    "name": "Управление закупками в рамках контрактной системы",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "5-6 марта",
    "month": "Март",
    "name": "Обзор и ознакомление с новым Социальном Кодексом Республики Казахстан",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "12-13 марта",
    "month": "Март",
    "name": "Техника эффективного мышления",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "16-17 марта",
    "month": "Март",
    "name": "Корпоративное право",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "19-20 марта",
    "month": "Март",
    "name": "Финансы для нефинансовых менеджеров",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "26-27 марта",
    "month": "Март",
    "name": "Оценка текущей оргструктуры компании, оценка компетенций работников и построение новой оргструктуры с учетом бизнес-процессов и задач компании",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "30-31 марта",
    "month": "Март",
    "name": "Вахтовый метод в свете изменений / дополнений в ТК",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "30-31 марта",
    "month": "Март",
    "name": "Производственный экологический контроль и мониторинг на предприятии",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "1-2 апреля",
    "month": "Апрель",
    "name": "Управление изменениями",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "6-7 апреля",
    "month": "Апрель",
    "name": "Система хранения и складирования материалов на нефтегазодобывающих предприятиях",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "9-10 апреля",
    "month": "Апрель",
    "name": "Система бюджетирования на производстве",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "14-15 апреля",
    "month": "Апрель",
    "name": "Налоги и налогообложение недропользователей",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "16-17 апреля",
    "month": "Апрель",
    "name": "Договорное право. Особенности применения договоров сложного вида",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "20-21 апреля",
    "month": "Апрель",
    "name": "Трудовой Кодекс РК в интересах Работодателя (включая последние изменения)",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "23-24 апреля",
    "month": "Апрель",
    "name": "MS Excel. Углубленный курс.",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "4-5 мая",
    "month": "Май",
    "name": "Административно-хозяйственное обеспечение",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "12-13 мая",
    "month": "Май",
    "name": "Управление конфликтами",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "14-15 мая",
    "month": "Май",
    "name": "Согласительная комиссия",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "18-19 мая",
    "month": "Май",
    "name": "Обновления законодательства РК в области экологии, водопользования, лесного хозяйства и животного мира",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "21-22 мая",
    "month": "Май",
    "name": "Обзор изменений в миграционном законодательстве",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "25-26 мая",
    "month": "Май",
    "name": "Риск менеджмент",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "1-2 июня",
    "month": "Июнь",
    "name": "Подготовка и проведение оценки персонала",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "4-5 июня",
    "month": "Июнь",
    "name": "Новации в закупках товаров, работ, услуг в группе компаний АО  «Самрук-Қазына» с учетом изменений и дополнений",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 350000,
    "category": "business"
  },
  {
    "date": "8-9 июня",
    "month": "Июнь",
    "name": "Порядок  расчетов заработной платы  работников при  различных режимах работы в соответствии с ТК РК",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "11-12 июня",
    "month": "Июнь",
    "name": "Эффективные переговоры",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "16-17 июня",
    "month": "Июнь",
    "name": "Анализ финансовой отчетности",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "18-19 июня",
    "month": "Июнь",
    "name": "Разрешение экологических споров в РК: практические аспекты",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "23-24 июня",
    "month": "Июнь",
    "name": "Повышение эффективности при реализации неликвидов",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "1-2 июля",
    "month": "Июль",
    "name": "Социальная ответственность и устойчивое развитие компании",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "7-8 июля",
    "month": "Июль",
    "name": "Управление и оптимизация в складской логистике",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "9-10 июля",
    "month": "Июль",
    "name": "Навыки эффективной работы MS Excel",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "13-14 июля",
    "month": "Июль",
    "name": "Основы радиационной безопасности",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "16-17 июля",
    "month": "Июль",
    "name": "Финансовая отчетность нефтедобывающих предприятий: представление и анализ.",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "20-21 июля",
    "month": "Июль",
    "name": "Управление рисками в нефтегазовой промышленности",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "27-28 июля",
    "month": "Июль",
    "name": "Тайм-менеджмент",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "3-4 августа",
    "month": "Август",
    "name": "Технология управления запасами. Измерение, прогноз, оптимизация",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "6-7 августа",
    "month": "Август",
    "name": "Мастерство переговоров",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "10-11 августа",
    "month": "Август",
    "name": "Управление затратами и оборотным капиталом",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "13-14 августа",
    "month": "Август",
    "name": "Управление закупками в рамках контрактной системы",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "17-18 августа",
    "month": "Август",
    "name": "Администрирование договоров и контрактов в нефтегазовой отрасли",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "20-21 августа",
    "month": "Август",
    "name": "Подбор и адаптация персонала: HR – практикум",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "24-25 августа",
    "month": "Август",
    "name": "Управление юридическими рисками",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "2-3 сентября",
    "month": "Сентябрь",
    "name": "ИПР: Как составить план индивидуального развития и развивать компетенции",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "7-8 сентября",
    "month": "Сентябрь",
    "name": "Корпоративная социальная ответственность в РК",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "10-11 сентября",
    "month": "Сентябрь",
    "name": "Особенности учета дебиторской и кредиторской задолженности по МСФО",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "14-15 сентября",
    "month": "Сентябрь",
    "name": "Управление собой (психологические основы управления, тайм-менеджмент, стресс-менеджмент)",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "16-17 сентября",
    "month": "Сентябрь",
    "name": "Бюджетирование и план развития",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "23-24 сентября",
    "month": "Сентябрь",
    "name": "Основы Кайдзен: Бережливое производство",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "28-29 сентября",
    "month": "Сентябрь",
    "name": "MS Excel (продвинутый уровень)",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "1-2 октября",
    "month": "Октябрь",
    "name": "Технология управления запасами. Измерение, прогноз, оптимизация",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "5-6 октября",
    "month": "Октябрь",
    "name": "Новые законодательные требования в сфере экологического регулирования Республики Казахстан",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "8-9 октября",
    "month": "Октябрь",
    "name": "Административные расходы: бюджетирование, учет и анализ",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "12-13 октября",
    "month": "Октябрь",
    "name": "Управление стрессом",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "15-16 октября",
    "month": "Октябрь",
    "name": "Актуальные изменения в МСФО",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "19-20 октября",
    "month": "Октябрь",
    "name": "Кодекс РК «О недрах и недропользовании» для объектов углеводородного сырья. Закон «О разрешениях и уведомлениях»",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "22-23 октября",
    "month": "Октябрь",
    "name": "Согласительная комиссия",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "2-3 ноября",
    "month": "Ноябрь",
    "name": "Оплата труда в соответствии с Трудовым Кодексом. Положение об оплате труда. Вахтовый метод",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "5-6 ноября",
    "month": "Ноябрь",
    "name": "Основы рекрутинга",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "9-10 ноября",
    "month": "Ноябрь",
    "name": "Договор аренды: правовые и практические аспекты",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "12-13 ноября",
    "month": "Ноябрь",
    "name": "Международное налоговое законодательство",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "16-17 ноября",
    "month": "Ноябрь",
    "name": "Навыки ораторского мастерства",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "19-20 ноября",
    "month": "Ноябрь",
    "name": "Контроль затрат и бюджетирование для компаний-недропользователей",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "26-27 ноября",
    "month": "Ноябрь",
    "name": "Управление отходами, новые требования и методы",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "3-4 декабря",
    "month": "Декабрь",
    "name": "Трудовой кодекс РК (с изменениями и дополнениями)",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "7-8 декабря",
    "month": "Декабрь",
    "name": "Требования законодательства РК к управлению и регулированию контрактов в нефтегазовой отрасли",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "10-11 декабря",
    "month": "Декабрь",
    "name": "Налоговый кодекс. КПН+НДС: все что нужно знать в 2026г.",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "14-15 декабря",
    "month": "Декабрь",
    "name": "Техника проведения эффективного совещания",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "17-18 декабря",
    "month": "Декабрь",
    "name": "Финансовый анализ и планирование",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "21-22 декабря",
    "month": "Декабрь",
    "name": "Бережливое производство",
    "hours": 16,
    "priceOnline": 200000,
    "priceOffline": 250000,
    "category": "business"
  },
  {
    "date": "8-9 января",
    "month": "Январь",
    "name": "Контроль методами промысловой геофизики за процессами заводнения коллекторов",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "8-9 января",
    "month": "Январь",
    "name": "Технология бурения, освоения и закачивания нефтегазовых скважин",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "12-13 января",
    "month": "Январь",
    "name": "Подготовка нефти на месторождениях с высоковязкими углеводородами",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "12-13 января",
    "month": "Январь",
    "name": "Диспетчерское управление магистральными трубопроводами",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "12-13 января",
    "month": "Январь",
    "name": "Очистка хозбытовых сточных вод на нефтедобывающих предприятиях",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "15-16 января",
    "month": "Январь",
    "name": "Охрана окружающей среды и промышленная экология в сфере нефтегазового промысла",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "15-16 января",
    "month": "Январь",
    "name": "Специалист службы контроля технич. обслуживания и ремонта транспорта",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "19-20 января",
    "month": "Январь",
    "name": "Метрология, стандартизация и управление качеством в теплоэнергетике и теплотехнологиях",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "22-23 января",
    "month": "Январь",
    "name": "Основы проектирования и эксплуатации частотно-регулируемых электроприводов (и систем плавного пуска) и их пусконаладка",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "2-3 февраля",
    "month": "Февраль",
    "name": "Седиментология карбонатных коллекторов",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "5-6 февраля",
    "month": "Февраль",
    "name": "Обработка результатов исследований скважин методом установившихся отборов",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "9-10 февраля",
    "month": "Февраль",
    "name": "Основы нефтехимического синтеза ароматических углеводородов",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "12-13 февраля",
    "month": "Февраль",
    "name": "Обеспечение качества нефти и нефтепродуктов при их транспортировке и хранении",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "16-17 февраля",
    "month": "Февраль",
    "name": "Основы нефтегазового дела",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "19-20 февраля",
    "month": "Февраль",
    "name": "Проверка безопасности транспортных средств",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "26-27 февраля",
    "month": "Февраль",
    "name": "Принцип источника бесперебойного питания, техническое обслуживание и обнаружение неисправностей, модернизация систем",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "2-3 марта",
    "month": "Март",
    "name": "Подсчет запасов по классификации PRMS",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "5-6 марта",
    "month": "Март",
    "name": "Интенсификация работы скважин методом гидравлического разрыва пласта. Реагенты и технологии",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "12-13 марта",
    "month": "Март",
    "name": "Курс по пробной эксплуатации скважины. Испытанаие скважины",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "16-17 марта",
    "month": "Март",
    "name": "Технология ремонта нефтегазового оборудования",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "19-20 марта",
    "month": "Март",
    "name": "Современное состояние и перспективы развития процессов нефтепереработки",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "26-27 марта",
    "month": "Март",
    "name": "Основы бурения",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "30-31 марта",
    "month": "Март",
    "name": "Перспектива развития ГСМ на автомобильном транспорте",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "30-31 марта",
    "month": "Март",
    "name": "Схемы электроустановок, компоновки оборудования, технологических процессов производства",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "1-2 апреля",
    "month": "Апрель",
    "name": "Гидродинамико-геофизический мониторинг эксплуатации месторождений нефти и газа",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "6-7 апреля",
    "month": "Апрель",
    "name": "Инновационные технологии в области капитального и подземного ремонта скважин",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "9-10 апреля",
    "month": "Апрель",
    "name": "Разработка  и эксплуатация  газоконденсатных месторождений",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "14-15 апреля",
    "month": "Апрель",
    "name": "Семинар для машинистов, операторов и мастеров участка поддержания пластового давления (УППД)",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "16-17 апреля",
    "month": "Апрель",
    "name": "Определение состояния компрессорного оборудования по анализу масла",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "20-21 апреля",
    "month": "Апрель",
    "name": "Оптимизация трубопроводных систем",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "23-24 апреля",
    "month": "Апрель",
    "name": "Организация  технического обслуживания и ремонта автомобильного транспорта",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "27-28 апреля",
    "month": "Апрель",
    "name": "Монтаж, наладка и эксплуатация интеллектуальных электронных устройств RELION серии 615 (ABB):",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "4-5 мая",
    "month": "Май",
    "name": "Управление автотранспортом и спецтехникой в нефтегазодобывающих предприятиях",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "12-13 мая",
    "month": "Май",
    "name": "Плавный пуск электродвигателей",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "14-15 мая",
    "month": "Май",
    "name": "Основы поисков и разведки месторождений нефти и газа",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "18-19 мая",
    "month": "Май",
    "name": "Хранение и распределение нефти и газа",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "20-21 мая",
    "month": "Май",
    "name": "Штанговые скважинные насосные установки. Станки-качалки",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "21-22 мая",
    "month": "Май",
    "name": "Теплотехнические измерения и автоматизация теплотехнических процессов",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "25-26 мая",
    "month": "Май",
    "name": "Производство дорожных битумов",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "26-27 мая",
    "month": "Май",
    "name": "Определение приемистости кольцевых пространств и создание противодавлений на источник для ликвидации МКД (Межколонное Давление)",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "28-29 мая",
    "month": "Май",
    "name": "Формирование рациональных комплексов геолого-геофизических исследований при поиске, разведке и разработке нефтяных и газовых месторождений",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "1-2 июня",
    "month": "Июнь",
    "name": "Проектирование, разработка и эксплуатация нефтегазовых месторождений",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "4-5 июня",
    "month": "Июнь",
    "name": "Моделирование и мониторинг разработки месторождений нефти и газа по геолого – геофизическим данным",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "8-9 июня",
    "month": "Июнь",
    "name": "Эксплуатация скважин, оборудованных установками электроцентробежных насосов (УЭЦН).",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "11-12 июня",
    "month": "Июнь",
    "name": "Подъём газожидкостной смеси из скважин. Семинар для операторов, мастеров и технологов цеха добычи нефти и газа (ЦДНГ)",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "16-17 июня",
    "month": "Июнь",
    "name": "Анализ нефти и нефтепродуктов на промысле",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "18-19 июня",
    "month": "Июнь",
    "name": "Экологическое сопровождение геологоразведочных и добычных работ",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "23-24 июня",
    "month": "Июнь",
    "name": "Особенности сервисного обслуживания и технического контроля автомобильного транспорта",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "29-30 июня",
    "month": "Июнь",
    "name": "Эксплуатация высоковольтных линий",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "1-2 июля",
    "month": "Июль",
    "name": "Основные принципы кислотной обработки скважин. Супервайзинг ГРП. Виды проппанта и жидкостей для ГРП. Технологические основы ГРП",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "7-8 июля",
    "month": "Июль",
    "name": "Гидродинамические исследования скважин и их интерпретация",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "9-10 июля",
    "month": "Июль",
    "name": "Эффективный анализ низкопроницаемых коллекторов месторождений нефти и газа",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "13-14 июля",
    "month": "Июль",
    "name": "Нефтяные эмульсии и борьба с ними",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "16-17 июля",
    "month": "Июль",
    "name": "Релейная защита распределительных сетей",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "20-21 июля",
    "month": "Июль",
    "name": "КПП для автотранспортной среды",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "27-28 июля",
    "month": "Июль",
    "name": "Введение в методы увеличения добычи на зрелых месторождениях углеводородов",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "3-4 августа",
    "month": "Август",
    "name": "Технология добычи для неспециалистов",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "6-7 августа",
    "month": "Август",
    "name": "Нефтебазы и газохранилища",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "10-11 августа",
    "month": "Август",
    "name": "Устранение негермитичности обсадной колонны",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "13-14 августа",
    "month": "Август",
    "name": "Системы компьютерной диагностики работы узлов и агрегатов модернизируемых и новых автомобилей",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "17-18 августа",
    "month": "Август",
    "name": "Нейтрализация сероводорода и серосодержащих веществ",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "20-21 августа",
    "month": "Август",
    "name": "Разработка и эксплуатация газоконденсатных месторождений",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "24-25 августа",
    "month": "Август",
    "name": "Вторичная переработка нефти. Производство окисленного битума",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "2-3 сентября",
    "month": "Сентябрь",
    "name": "Курс по идентификации опасностей и рискам в области техники безопасности",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "7-8 сентября",
    "month": "Сентябрь",
    "name": "Основы Кайдзен: Бережливое производство",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "10-11 сентября",
    "month": "Сентябрь",
    "name": "Коммерческий учет и изменение нефти и газа",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "14-15 сентября",
    "month": "Сентябрь",
    "name": "Сосуды под давлением. Правила безопасной эксплуатации",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "16-17 сентября",
    "month": "Сентябрь",
    "name": "Современные методы нефтеотдачи",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "23-24 сентября",
    "month": "Сентябрь",
    "name": "Методы разрушения нефтяной эмульсии",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "28-29 сентября",
    "month": "Сентябрь",
    "name": "Режимы недропользования по Кодексу РК",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "1-2 октября",
    "month": "Октябрь",
    "name": "Утилизация отходов",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "5-6 октября",
    "month": "Октябрь",
    "name": "Техническое обслуживание и ремонт  электрооборудования электростанций и распределительных устройств",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "8-9 октября",
    "month": "Октябрь",
    "name": "Транспортировка нефти: нефтяные трубопроводы, танкеры и другие маршруты",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "12-13 октября",
    "month": "Октябрь",
    "name": "Эксплуатация котельного оборудования промышленных предприятий",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "15-16 октября",
    "month": "Октябрь",
    "name": "Ремонт в горизонтальных и наклонно-направленных скважинах",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "19-20 октября",
    "month": "Октябрь",
    "name": "Порядок ликвидации и рекультивации объекта недропользования в соответствии с законодательством РК",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "22-23 октября",
    "month": "Октябрь",
    "name": "Организация сбыта и транспортировки нефти",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "2-3 ноября",
    "month": "Ноябрь",
    "name": "Современные методы увеличения нефтеотдачи пластов и интенсификации добычи нефти",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "5-6 ноября",
    "month": "Ноябрь",
    "name": "Организация работ котельного цеха ГРЭС и ТЭЦ",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "12-13 ноября",
    "month": "Ноябрь",
    "name": "Оптимизация режимов работы скважин при добычи нефти винтовым насосом ,шгн,газлифтным способом.эксплуатация УЭЦН",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "16-17 ноября",
    "month": "Ноябрь",
    "name": "Текущий и капитальный ремонт скважин и новые технологии",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "19-20 ноября",
    "month": "Ноябрь",
    "name": "Техника и технология поддержания пластового давления закачкой воды с применением нестационарных технологий для повышения нефтеотдачи ранее недренируемых запасов нефти",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "26-27 ноября",
    "month": "Ноябрь",
    "name": "Анализ сырой нефти",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "3-4 декабря",
    "month": "Декабрь",
    "name": "Обратный ОСМОС",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "7-8 декабря",
    "month": "Декабрь",
    "name": "Гидравлика и режимы эксплуатации магистральных нефтепроводов и оборудовании нефтеперекачивающих станций",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "10-11 декабря",
    "month": "Декабрь",
    "name": "Рациональное управление отходами на предприятии: законодательные требования и практическое применение",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "14-15 декабря",
    "month": "Декабрь",
    "name": "Методы и средства повышения эксплуатационной надежности электроэнергетического оборудования",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "17-18 декабря",
    "month": "Декабрь",
    "name": "Разработка нефтяных месторождений с трудноизвлекаемыми запасами (ТРИЗ) и нетрадиционными  ресурсами",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  },
  {
    "date": "21-22 декабря",
    "month": "Декабрь",
    "name": "Повышение эффективности и надёжности эксплуатации систем трубопроводного транспорта нефти и нефтепродуктов",
    "hours": 16,
    "priceOnline": 250000,
    "priceOffline": 350000,
    "category": "technical"
  }
];

export const MONTHS = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

export const CATEGORIES = {
  all: "Все",
  business: "Бизнес и управление",
  technical: "Технические семинары"
};

// Helper function to parse date for sorting
export function parseDateForSort(date: string, month: string): number {
  const monthIndex = MONTHS.indexOf(month);
  // Extract first day number from date string like "8-9 января" or "8 января"
  const dayMatch = date.match(/^(\d+)/);
  const day = dayMatch ? parseInt(dayMatch[1], 10) : 1;
  // Return numeric value for sorting: month * 100 + day
  return monthIndex * 100 + day;
}

