/*
 * @Author: czy0729
 * @Date: 2022-09-14 04:50:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-30 20:46:38
 */
import { asc, getTimestamp } from '@utils'
import { getPinYinFirstCharacter } from '@utils/thirdParty/pinyin/dict'
import { DATA_ALPHABET } from '@constants/data'

/** 预设排序 */
export const SORT = {
  /** 上映时间 */
  begin<T extends Record<string, unknown>>(
    a: Partial<T> = {},
    b: Partial<T> = {},
    key: keyof T = 'b'
  ) {
    return (
      (getTimestamp(String(b[key] || '0000-00-00')) || 0) -
      (getTimestamp(String(a[key] || '0000-00-00')) || 0)
    )
  },

  /** 名称 */
  name<T extends Record<string, unknown>>(
    a: Partial<T> = {},
    b: Partial<T> = {},
    key: keyof T = 'c'
  ) {
    return asc(
      String(getPinYinFirstCharacter(String(a[key] || ''))),
      String(getPinYinFirstCharacter(String(b[key] || '')))
    )
  },

  /** 评分或排名 */
  rating<T extends Record<string, unknown>>(
    a: Partial<T> = {},
    b: Partial<T> = {},
    keyScore: keyof T = 's',
    keyRank: keyof T = 'r'
  ) {
    const sA = Number(a[keyScore] || 0)
    const sB = Number(b[keyScore] || 0)
    const rA = a[keyRank] === undefined ? -10000 : 10000 - Number(a[keyRank])
    const rB = b[keyRank] === undefined ? -10000 : 10000 - Number(b[keyRank])
    return sB + rB - (sA + rA)
  },

  /** 随机 */
  random() {
    return 0.5 - Math.random()
  },

  /** 分数, 也可用于数值比较 */
  score<T extends Record<string, unknown>>(
    a: Partial<T> = {},
    b: Partial<T> = {},
    key: keyof T = 's'
  ) {
    return Number(b[key] || 0) - Number(a[key] || 0)
  },

  /** 评分人数 */
  total<T extends Record<string, unknown>>(
    a: Partial<T> = {},
    b: Partial<T> = {},
    key: keyof T = 'l'
  ) {
    return Number(b[key] || 0) - Number(a[key] || 0)
  }
}

/** 季度筛选正则, 匹配放送日期中的 年-月- */
export const REG_SEASONS = {
  '1月': /-(01|02|03|1|2|3)-/,
  '4月': /-(04|05|06|4|5|6)-/,
  '7月': /-(07|08|09|7|8|9)-/,
  '10月': /-(10|11|12)-/
} as const

/** 地区 */
export const ANIME_AREA = ['日本', '中国'] as const

/** 类型 */
export const ANIME_TYPE = ['TV', '剧场版', 'OVA', 'WEB'] as const

/** 名称首字 */
export const ANIME_FIRST = DATA_ALPHABET

/** 当前日期, 9 月 1 日起提前把下一年纳入年份筛选 */
const NOW = new Date()

/** 最新可筛选的年份, 9 月前为当前年份, 9 月起为下一年 */
const LATEST_YEAR = NOW.getFullYear() + (NOW.getMonth() >= 8 ? 1 : 0)

/** 动画年份, 从最新年份倒序生成到 2001 年, 更早的统一归入「2000以前」 */
export const ANIME_YEAR = [
  ...Array.from(
    { length: LATEST_YEAR - 2000 },
    (__, index) => LATEST_YEAR - index
  ),
  '2000以前'
] as const

/** 放送季度 */
export const ANIME_BEGIN = ['1月', '4月', '7月', '10月'] as const

/** 放送状态, 对应 Item.st (缺席视为完结) */
export const ANIME_STATUS = ['连载', '完结', '未播放'] as const

/** 标签, 顺序即 ANIME_TAGS_MAP 的序号 */
export const ANIME_TAGS = [
  '奇幻',
  '战斗',
  '搞笑',
  '校园',
  '冒险',
  '科幻',
  '治愈',
  '热血',
  '百合',
  '爱情',
  '后宫',
  '励志',
  '悬疑',
  '轻小说',
  '青春',
  '日常',
  '恋爱',
  '竞技',
  '剧情',
  '泡面番',
  '女性向',
  '机战',
  '歌舞',
  '魔法',
  '运动',
  '神魔',
  '萝莉',
  '战争',
  '社会',
  '玄幻',
  '亲子',
  '历史',
  '美少女',
  '职场',
  '推理',
  '游戏',
  '犯罪',
  '耽美',
  '武侠',
  '恐怖',
  '欢乐向',
  '血腥',
  '吸血鬼',
  '伪娘',
  '穿越',
  '偶像'
] as const

/** 标签 → Item.t 中的下标 */
export const ANIME_TAGS_MAP = Object.fromEntries(
  ANIME_TAGS.map((item, index) => [item, index])
) as Record<(typeof ANIME_TAGS)[number], number>

/** 制作公司, 顺序即 ANIME_OFFICIAL_MAP 的序号 */
export const ANIME_OFFICIAL = [
  'J.C.STAFF',
  'A-1 Pictures',
  'MADHOUSE',
  'Production I.G',
  '东映动画',
  'Studio DEEN',
  'BONES',
  'SILVER LINK.',
  'SUNRISE',
  'SHAFT',
  'MAPPA',
  'LIDENFILMS',
  '动画工房',
  'XEBEC',
  'スタジオディーン',
  'TMS Entertainment',
  'OLM',
  "Brain's Base",
  '京都动画',
  'GONZO',
  'WIT STUDIO',
  'diomedéa',
  'サンライズ',
  'P.A.WORKS',
  'feel.',
  'CloverWorks',
  'BN Pictures',
  'ZEXCS',
  '小丑社',
  '暂缺',
  'WHITE FOX',
  'project No.9',
  '龙之子Production',
  'KINEMA CITRUS',
  '东映アニメーション',
  'Lerche',
  'Studio五组',
  'david production',
  '8bit',
  'ufotable',
  'SATELIGHT',
  '绘梦',
  '玄机科技',
  'SANZIGEN',
  'トムス・エンタテインメント',
  'ぴえろ',
  'ライデンフィルム',
  'SEVEN・ARCS',
  'Telecom Animation Film',
  'SHIN-EI动画',
  'AIC',
  'Manglobe',
  'Seven Arcs',
  'GoHands',
  'Hoods Entertainment',
  'ILCA',
  'ZERO-G',
  'TNK',
  '圆谷制作',
  'CONNECT',
  'TROYCA',
  'SynergySP',
  'エイトビット',
  'TRIGGER',
  '亜细亜堂',
  'Seven',
  'TYO Animations',
  'Passione',
  'GAINAX',
  'ARMS',
  '上海福煦影视文化投资有限公司',
  '索以文化',
  'ARTLAND',
  'Satelight',
  'Production IMS',
  'C2C',
  'ENGI',
  'MAHO FILM',
  'NOMAD',
  '福煦影视',
  'FelixFilm',
  '若鸿文化',
  'スタジオKAI',
  'Bridge',
  'NAZ',
  'Lay-duce',
  'Studio 3Hz',
  'PINE JAM',
  'スタジオコメット',
  'A・C・G・T',
  'Arms',
  'Hal Film Maker',
  'Nippon Animation',
  'C-Station',
  'CygamesPictures',
  '中影年年',
  'studio A-CAT',
  'studio HōKIBOSHI',
  'サテライト',
  'Graphinica',
  '旭Production',
  '朱夏',
  '北京若森数字科技有限公司',
  'Creators in Pack',
  'EMTスクエアード',
  '幻维数码',
  'GEEKTOYS',
  'asread',
  'CoMix Wave Films',
  'AIC ASTA',
  'Studio Gallop',
  'STUDIO 4℃',
  '手冢プロダクション',
  '白组',
  '大火鸟文化',
  'PPI',
  'AXsiZ',
  'BLADE',
  'Science SARU',
  'SIGNAL.MD',
  'ゼロジー',
  'Yostar Pictures'
] as const

/** 制作公司 → Item.o 中的下标 */
export const ANIME_OFFICIAL_MAP = Object.fromEntries(
  ANIME_OFFICIAL.map((item, index) => [item, index])
) as Record<(typeof ANIME_OFFICIAL)[number], number>

export const ANIME_SORT = ['排名', '上映时间', '评分人数', '随机', '名称'] as const

/** 收藏筛选 */
export const ANIME_COLLECTED = ['隐藏'] as const
