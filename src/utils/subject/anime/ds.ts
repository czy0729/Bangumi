/*
 * @Author: czy0729
 * @Date: 2022-09-14 04:50:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-06 07:37:33
 */
import { asc, getTimestamp } from '@utils'
import { getPinYinFirstCharacter } from '@utils/thirdParty/pinyin/dict'

/** 找条目单次搜索结果上限 (各频道统一, 任意筛选组合最多返回 1000 条) */
export const SEARCH_RESULT_LIMIT = 1000

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
export const ANIME_AREA = ['日本', '中国', '欧美'] as const

/** 类型 (meta_tags 形式标签, TV 缺省不落 ty; 短片含短片集) */
export const ANIME_TYPE = ['TV', '剧场版', 'OVA', 'WEB', '短片'] as const

/** 当前日期, 9 月 1 日起提前把下一年纳入年份筛选 */
const NOW = new Date()

/** 最新可筛选的年份, 9 月前为当前年份, 9 月起为下一年 */
const LATEST_YEAR = NOW.getFullYear() + (NOW.getMonth() >= 8 ? 1 : 0)

/** 动画年份, 从最新年份倒序生成到 2001 年, 更早的统一归入「2000以前」 */
export const ANIME_YEAR = [
  ...Array.from({ length: LATEST_YEAR - 2000 }, (__, index) => LATEST_YEAR - index),
  '2000以前'
] as const

/** 放送季度 */
export const ANIME_BEGIN = ['1月', '4月', '7月', '10月'] as const

/** 放送状态, 对应 Item.st (缺席视为完结) */
export const ANIME_STATUS = ['连载', '完结', '未播放'] as const

/** 集数 (infobox 话数, 未知不参与命中) */
export const ANIME_EP = ['1话', '2-13话', '14-26话', '27-52话', '52话+'] as const

/**
 * 标签筛选 (全量动画条目用户标签 top100, 下标即 bin 的 t)
 *  - 剔除形式 / 地区 / 改编来源的 meta 词 (走类型 / 地区 / 详情 origin 维度) 与年份 / 月份标签
 *  - 同义标签 (大小写 / 繁简 / 日文新字体) 自动合并
 *  - 与 web/standalone/anime 的 rule.loadTags 同步维护, 重建后如有变化需同步此表
 */
export const ANIME_TAGS = [
  '国产',
  '搞笑',
  '里番',
  '漫改',
  '奇幻',
  '战斗',
  '科幻',
  '童年',
  '泡面番',
  '3D',
  '轻小说改',
  '日本动画',
  '旧物',
  '恋爱',
  '百合',
  '日常',
  '校园',
  'R18',
  '子供向',
  '后宫',
  '治愈',
  '热血',
  '萝卜',
  '无码',
  '国漫',
  '3D里番',
  '巨乳',
  '机战',
  'GAL改',
  '异世界',
  '纯爱',
  'BL',
  '冒险',
  'NTR',
  '2.5D',
  '玄幻',
  '运动',
  '偶像',
  '音乐',
  '网文改',
  '步兵裡番',
  '实用',
  '同人',
  '萌',
  '卖肉',
  '喜剧',
  '萝莉',
  '魔法少女',
  '穿越',
  '悬疑',
  '调教',
  '3DHentai',
  '赛璐珞',
  '高达',
  '猎奇',
  '凌辱',
  '美国动画',
  '定格动画',
  '经典',
  '青春',
  '肉',
  '人妻',
  '历史',
  '独立动画',
  '同人里番',
  '推理',
  '步兵',
  '乙女向',
  '触手',
  '战争',
  '武侠',
  '吐槽',
  '肉番',
  '美漫',
  '欧洲',
  '女性向',
  '动作',
  '剧情',
  'pokemon',
  '扶她',
  '龙傲天',
  '恐怖',
  '竞技',
  '幼女向',
  '哆啦A梦',
  '魔法',
  '动物',
  '重口',
  '杉田智和',
  'LIDENFILMS',
  'TVSP',
  '少女向',
  '正太',
  'ONA',
  '动画工房',
  '恶搞',
  '短編',
  '腐',
  'Satelight',
  'バニラ'
] as const

/** 标签 → Item.t 中的下标 */
export const ANIME_TAGS_MAP = Object.fromEntries(
  ANIME_TAGS.map((item, index) => [item, index])
) as Record<(typeof ANIME_TAGS)[number], number>

/**
 * 类型筛选 (条目 meta_tags 全量表, 下标即 bin 的 mt)
 *  - 涵盖形式 (TV / 剧场版 / OVA / WEB / 短片) / 地区 / 改编来源 / 题材, 与标签维度 (非 meta) 互补
 *  - 与 web/standalone/anime 的 rule.loadMetas 同步维护, 重建后如有变化需同步此表
 */
export const ANIME_META = [
  '日本',
  'TV',
  '剧场版',
  '漫画改',
  'OVA',
  'WEB',
  '中国',
  '原创',
  '小说改',
  '欧美',
  '奇幻',
  '战斗',
  '游戏改',
  '科幻',
  '恋爱',
  'R18',
  '校园',
  '日常',
  '美国',
  '百合',
  '后宫',
  '短片',
  '子供向',
  '喜剧',
  '冒险',
  '机战',
  '玄幻',
  '悬疑',
  '运动',
  '穿越',
  '音乐',
  '韩国',
  '少年向',
  '短片集',
  '少女向',
  '推理',
  'BL',
  '法国',
  'MV',
  '剧情',
  '历史',
  '武侠',
  '青年向',
  '耽美',
  '萌系',
  'PV',
  '美食',
  '女性向',
  '同人',
  '职场',
  '乙女',
  'CM',
  '动态漫画',
  '影视改',
  '恐怖',
  '惊悚',
  '苏联',
  '香港',
  '台湾',
  '英国',
  '捷克',
  'GL',
  '俄罗斯',
  '偶像',
  '动画改',
  '无cp'
] as const

/** 类型 → Item.mt 中的下标 */
export const ANIME_META_MAP = Object.fromEntries(
  ANIME_META.map((item, index) => [item, index])
) as Record<(typeof ANIME_META)[number], number>

/**
 * 制作公司筛选 (全量动画条目 infobox 动画制作出现次数 top100, 下标即 bin 的 o)
 *  - 与 web/standalone/anime 的 rule.loadOfficials 同步维护, 重建后如有变化需同步此表
 */
export const ANIME_OFFICIAL = [
  '東映アニメーション',
  'J.C.STAFF',
  'サンライズ',
  'SHAFT',
  'Production I.G',
  'スタジオディーン',
  'MADHOUSE',
  'トムス・エンタテインメント',
  'A-1 Pictures',
  '上海福煦影视文化投资有限公司',
  'AIC',
  'GONZO',
  'OLM',
  'タツノコプロ',
  'ぴえろ',
  'SILVER LINK.',
  '日本アニメーション',
  'XEBEC',
  'MAPPA',
  'AT-2 Project（Seven Arcs）',
  'WIT STUDIO',
  '京都アニメーション',
  'Warner Bros. Animation',
  'ZEXCS',
  'KINEMA CITRUS',
  'スタジオコメット',
  'ライデンフィルム',
  'グループ・タック',
  'BONES',
  'CloverWorks',
  'サテライト',
  'CygamesPictures[サイピク]',
  'ラルケ',
  '動画工房',
  '沌x',
  'P.A.WORKS',
  'マジックバス',
  '亜細亜堂',
  '幻维数码',
  'OLM TEAM KATO',
  'OLM TEAM KOITABASHI',
  'SynergySP',
  'サンジゲン',
  '索以文化',
  'DLE',
  'GAINAX',
  'Warner Bros. Cartoons',
  'スタジオ雲雀',
  '大火鸟文化',
  '若鸿文化',
  '葦プロダクション',
  'feel.',
  'MGM Animation/Visual Arts',
  '手塚プロダクション',
  '玄机科技',
  'TYO Animations（ゆめ太カンパニー）',
  'ufotable',
  'シンエイ動画',
  'ファンワークス',
  'STUDIO 4℃',
  'エンカレッジフィルムズ（鵲）',
  '真埼',
  'BN Pictures',
  'Brain\'s Base',
  '变月文化',
  '绘梦',
  'WHITE FOX',
  'エイトビット',
  'スタジオコロリド',
  '华强方特（厦门）动漫有限公司',
  '娃娃鱼动画',
  '小学館ミュージック&デジタルエンタテイメント[SMDE]',
  '旭プロダクション',
  '白組',
  'david production',
  'ILCA',
  'Inc.',
  'Studio五組',
  'TRIGGER',
  'スタジオぷYUKAI',
  'ティー・エヌ・ケー',
  'パッショーネ',
  '万维猫动画',
  '中影年年',
  'EMTスクエアード',
  'Hal Film Maker',
  'project No.9',
  'Studio9MAiami',
  '上海美术电影制片厂',
  '原力动画',
  '好传动画',
  'Imageworks Studio',
  'MOI Animation',
  'Pixar Animation Studios',
  'STUDIO JEMI',
  'Telecom Animation Film',
  'ぎふとアニメーション',
  'ぎゃろっぷ',
  'アニメイトフィルム',
  'ポリゴン・ピクチュアズ'
] as const

/** 制作公司 → Item.o 中的下标 */
export const ANIME_OFFICIAL_MAP = Object.fromEntries(
  ANIME_OFFICIAL.map((item, index) => [item, index])
) as Record<(typeof ANIME_OFFICIAL)[number], number>

export const ANIME_SORT = ['排名', '上映时间', '评分人数', '随机', '名称'] as const

/** 收藏筛选 */
export const ANIME_COLLECTED = ['隐藏'] as const

/** 分级筛选 (「全部」由通用筛选组提供, 点击时写入空串) */
export const ANIME_NSFW = ['限制', '未知'] as const
