export interface ProjectSource {
  id: string
  title: string
  url: string
  note: string
}

export interface SourceGroup {
  title: string
  sourceIds: string[]
}

export const projectSources: ProjectSource[] = [
  {
    id: "yakutsk-history",
    title: "Окружная администрация Якутска: история города",
    url: "https://yakutskcity.ru/yakutsk/history/istoriya-goroda-yakutska/s-1632-po-1708-gody/",
    note: "основание Ленского острога, Петр Бекетов, перенос острога",
  },
  {
    id: "yakutsk-charter",
    title: "Устав городского округа: дата основания Якутска",
    url: "https://base.garant.ru/26711504/5ba65a95615fb0d29ff25f15d9ec0f60/",
    note: "25 сентября 1632 года как дата основания города",
  },
  {
    id: "yakutsk-trade",
    title: "Исследование о формировании якутского купечества",
    url: "https://research-journal.org/archive/6-48-2016-june/formirovanie-yakutskogo-kupechestva-pervaya-polovina-xix-nachalo-xx-vv",
    note: "ярмарочная торговля, пушнина, обороты Якутской ярмарки",
  },
  {
    id: "yakutsk-library",
    title: "Национальная библиотека РС(Я): публичная библиотека Якутска",
    url: "https://nlrs.ru/news/16464",
    note: "первая городская публичная библиотека, 1886 год",
  },
  {
    id: "yakutsk-museum",
    title: "Якутский государственный объединенный музей: история",
    url: "https://yakutmuseum.ru/about/",
    note: "история музея, здание библиотеки и музея, 1911 год",
  },
  {
    id: "alsib",
    title: "Национальная библиотека РС(Я): коллекция об АлСибе",
    url: "https://new.nlrs.ru/collections/4990",
    note: "роль Якутска на трассе Аляска - Сибирь",
  },
  {
    id: "alsib-losses",
    title: "Вести: память героев АлСиба",
    url: "https://www.vesti.ru/article/3673983",
    note: "44 катастрофы и 113 погибших авиаторов",
  },
  {
    id: "nefu",
    title: "СВФУ: история университета",
    url: "https://www.s-vfu.ru/universitet/rukovodstvo-i-struktura/instituty/mpti/structura/hbiblioteka/Istoriya_YAGU_%28SVFU%29-Ko_Dnyu_soglasiya_v_SVFU.pdf",
    note: "образование Якутского государственного университета в 1956 году",
  },
  {
    id: "yakutsk-pop-history",
    title: "Мой город: историческая численность населения Якутска",
    url: "https://www.mojgorod.ru/r_saha/jakutsk/index.html",
    note: "рост населения с 1959 по 1979 год",
  },
  {
    id: "permafrost-building",
    title: "Новости сибирской науки: строительство на мерзлоте",
    url: "https://www.sib-science.info/ru/institutes/mify-o-stroitelstve-26102017",
    note: "инженерная геокриология и строительство в условиях мерзлоты",
  },
  {
    id: "republic",
    title: "Совет Федерации: Республика Саха (Якутия)",
    url: "https://council.gov.ru/services/reference/10289/",
    note: "современный статус республики и региональная справка",
  },
  {
    id: "unesco-olonkho",
    title: "UNESCO: Olonkho, Yakut heroic epos",
    url: "https://ich.unesco.org/en/RL/olonkho-yakut-heroic-epos-00145",
    note: "Олонхо в репрезентативном списке нематериального наследия",
  },
  {
    id: "olonkho-theater",
    title: "100 Якутия: Театр Олонхо",
    url: "https://100yakutia.ru/kultura-yakutii/art/teatralnoe-iskusstvo/165-teatr-olonkho",
    note: "создание Театра Олонхо в 2008 году",
  },
  {
    id: "yakutsk-pop-current",
    title: "CityPopulation / Росстат: городской округ Якутск",
    url: "https://www.citypopulation.de/en/russia/fareast/admin/sacha/98701__jakutsk/",
    note: "оценка численности городского округа на 1 января 2025 года",
  },
  {
    id: "mytona",
    title: "Mytona: официальный сайт",
    url: "https://www.mytona.com/",
    note: "актуальный статус международного мобильного разработчика",
  },
  {
    id: "mytona-case",
    title: "Liftoff: кейс Mytona",
    url: "https://www.liftoff.io/resources/case-study/mytona/",
    note: "основание Mytona в 2012 году и связь с Якутском",
  },
  {
    id: "seekers-notes",
    title: "Seekers Notes: официальный сайт",
    url: "https://www.seekersnotes.com/en",
    note: "игра Mytona и новости к 10-летию проекта",
  },
]

export const sourceGroups: SourceGroup[] = [
  {
    title: "Основание города",
    sourceIds: ["yakutsk-history", "yakutsk-charter"],
  },
  {
    title: "Торговый Якутск",
    sourceIds: ["yakutsk-trade"],
  },
  {
    title: "Наука и образование",
    sourceIds: ["yakutsk-library", "yakutsk-museum"],
  },
  {
    title: "АлСиб",
    sourceIds: ["alsib", "alsib-losses"],
  },
  {
    title: "Город на мерзлоте",
    sourceIds: ["nefu", "yakutsk-pop-history", "permafrost-building"],
  },
  {
    title: "Культура",
    sourceIds: ["republic", "unesco-olonkho", "olonkho-theater"],
  },
  {
    title: "Современный Якутск",
    sourceIds: ["yakutsk-pop-current", "mytona", "mytona-case", "seekers-notes"],
  },
]
