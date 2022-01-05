/*
 * @Author: czy0729
 * @Date: 2020-07-15 00:12:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-05 03:15:55
 */
import { DATA_ALPHABET } from '@constants'
import { VERSION_ANIME, CDN_STATIC_ANIME, getOTA } from '@constants/cdn'
import { getTimestamp, getStorage, setStorage } from '../index'
import { xhrCustom } from '../fetch'
import { getPinYinFirstCharacter } from '../thirdParty/pinyin'

export const ANIME_AREA = ['日本', '中国']
export const ANIME_TYPE = ['TV', '剧场版', 'OVA', 'WEB']
export const ANIME_FIRST = DATA_ALPHABET
export const ANIME_YEAR = [
  2022,
  2021,
  2020,
  2019,
  2018,
  2017,
  2016,
  2015,
  2014,
  2013,
  2012,
  2011,
  2010,
  2009,
  2008,
  2007,
  2006,
  2005,
  2004,
  2003,
  2002,
  2001,
  '2000以前'
]
export const ANIME_BEGIN = ['1月', '4月', '7月', '10月']
export const ANIME_STATUS = ['连载', '完结', '未播放']
export const ANIME_TAGS = [
  '后宫',
  '百合',
  '校园',
  '励志',
  '治愈',
  '冒险',
  '战斗',
  '竞技',
  '魔法',
  '青春',
  '游戏',
  '神魔',
  '歌舞',
  '恐怖',
  '血腥',
  '爱情',
  '萝莉',
  '搞笑',
  '运动',
  '战争',
  '剧情',
  '社会',
  '犯罪',
  '历史',
  '职场',
  // '伪娘',
  '耽美',
  '童年',
  '教育',
  '亲子',
  // '真人',
  '悬疑',
  '推理',
  '奇幻',
  '科幻',
  // '肉番',
  '机战',
  '热血',
  '美少女',
  '轻小说',
  '吸血鬼',
  '乙女向',
  '泡面番',
  '欢乐向'
]
export const ANIME_OFFICIAL = [
  // 首屏
  'J.C.STAFF',
  'A-1 Pictures',
  'Studio DEEN',
  'BONES',
  '京都动画',
  'SHAFT',
  'XEBEC',
  'TMS Entertainment',
  'LIDENFILMS',
  "Brain's Base",
  'GONZO',
  '小丑社',
  'WHITE FOX',
  '8bit',
  'SEVEN・ARCS',
  'OLM',
  'ZEXCS',
  'WIT STUDIO',
  'project No.9',
  '玄机科技',
  'david production',
  'Hoods Entertainment',
  '龙之子Production',
  '绘梦',
  'KINEMA CITRUS',
  'ufotable',
  'Manglobe',
  'SANZIGEN',
  'GoHands',
  'GAINAX',
  'Production IMS',
  'AIC',
  'Studio五組',
  'BN Pictures',
  'ZERO-G',
  'Seven',
  'Arms',
  'TNK',
  '东映动画',
  'CloverWorks',
  'TRIGGER',
  '上海福煦影视文化投资有限公司',
  'PPI',
  'Passione',
  'asread',

  // 次屏
  'W-toon Studio',
  '视美精典',
  '铸梦动画',
  'GEMBA',
  '中影年年',
  'BLADE',
  'studio A-CAT',
  'Science SARU',
  '幻维数码',
  '若鸿文化',
  'Magic Bus',
  'Signal-MD',

  // 首屏
  'MAPPA',
  'MADHOUSE',
  'SUNRISE',
  'Production I.G',
  'SILVER LINK.',
  '動画工房',
  'feel.',
  'diomedéa',
  'Lerche',
  'SATELIGHT',
  'P.A.WORKS',
  '東映動画',

  // 次屏
  'Nippon Animation',
  'Studio五组',
  'CONNECT',
  'Creators in Pack',
  'NOMAD',
  'Actas',
  'Bridge',
  'Telecom Animation Film',
  'ARTLAND',
  'SHIN-EI动画',
  'C-Station',
  'TROYCA',
  'TYO Animations',
  'Studio 3Hz',
  'ILCA',
  'C2C',
  'Lay-duce',
  '朱夏',
  'AXsiZ',
  'Hal Film Maker',
  'AIC ASTA',
  'Graphinica',
  'Ordet',
  'GATHERING',
  '动画工房',
  'Pierrot+',
  '北京若森数字科技有限公司',
  'PINE JAM',
  '亜細亜堂',
  '精英集团',
  'Encourage Films',
  'NAZ',
  '旭Production',
  'Genostudio',
  'Millepensee',
  'PlatinumVision',
  'DMM.futureworks',
  'EMT2',
  '童夢',
  'CoMix Wave Films',
  '云雀工作室',
  '彗星社',
  'Nexus',
  'Orange'
]
export const ANIME_SORT = ['排名', '上映时间', '随机', '名称']
export const ANIME_HENTAI_CHARA = [
  // 人物
  '姐',
  '妹',
  '母',
  '人妻',
  '青梅竹马',
  '处女',
  '御姐',
  '熟女'
]
export const ANIME_HENTAI_JOB = [
  // 职业
  'JK',
  '运动少女',
  '大小姐',
  '老师',
  '女医护士',
  '女僕',
  '巫女',
  '修女',
  '偶像',
  'OL',
  '风俗娘',
  '公主',
  '女骑士',
  '魔法少女',
  '妖精',
  '魔物娘',
  '兽娘'
]
export const ANIME_HENTAI_BODY = [
  // 外貌
  '巨乳',
  '贫乳',
  '黑皮肤',
  '眼镜娘',
  '泳装',
  '围裙',
  '黑丝袜',
  '和服',
  '兽耳',
  '碧池',
  '不良少女',
  '傲娇',
  '病娇',
  '伪娘',
  '扶他'
]
export const ANIME_HENTAI_CONTENT = [
  // 剧情
  '自慰',
  '口交',
  '乳交',
  '肛交',
  '脚交',
  '腋下',
  '玩具',
  '触手',
  '内射',
  '颜射',
  '3P',
  '群交',
  '肉便器',
  '后宫',
  '公众场合',
  '近亲',
  '师生',
  'NTR',
  '怀孕',
  '喷奶',
  '放尿',
  '精神控制',
  '药物',
  '痴汉',
  '阿嘿颜',
  '精神崩溃',
  '鬼畜',
  'BDSM',
  '调教',
  '强制',
  '逆强制',
  '痴女',
  '女王样',
  '百合',
  '耽美',
  '性转换',
  '异世界',
  '异种族',
  '纯爱',
  '恋爱喜剧',
  '世界末日'
]

/**
 * v4.0.0 后从包抽离, 需对比版本号
 * 若版本比 OTA.VERSION_ANIME 的小, 请求 OTA.VERSION_STATIC 数据然后替换缓存
 * 否则直接读缓存
 */
const animeVersionKey = '@utils|anime|version|210629'
const animeDataKey = '@utils|anime|data|210629'
let anime = []
let animeFallback = []
let loaded = false

function getData() {
  if (!loaded) {
    if (animeFallback.length) return animeFallback
    return anime
  }

  if (loaded && anime.length) {
    return anime
  }

  if (!animeFallback.length) {
    animeFallback = require('@constants/json/thirdParty/anime.min.json')
  }
  return animeFallback
}

/**
 * 初始化番剧数据
 */
export async function init() {
  if (loaded) return

  // 云版本
  // 版本没有 OTA 高需要重新请求数据
  const version = (await getStorage(animeVersionKey)) || VERSION_ANIME
  const data = (await getStorage(animeDataKey)) || []

  const ota = getOTA()
  const needUpdate =
    (!loaded && !data.length) || parseInt(ota.VERSION_ANIME) > parseInt(version)
  if (needUpdate) {
    // info('正在从云端拉取最新数据...')

    try {
      loaded = true
      const { _response } = await xhrCustom({
        url: CDN_STATIC_ANIME()
      })
      anime = JSON.parse(_response)
      setStorage(animeVersionKey, parseInt(ota.VERSION_ANIME))
      setStorage(animeDataKey, anime)
    } catch (error) {
      // 404
    }
    return
  }

  // 没缓存也要请求数据
  if (!data.length) {
    // info('正在从云端拉取最新数据...')

    try {
      loaded = true
      const { _response } = await xhrCustom({
        url: CDN_STATIC_ANIME()
      })
      anime = JSON.parse(_response)
      setStorage(animeVersionKey, version)
      setStorage(animeDataKey, anime)
    } catch (error) {
      // 404
      loaded = true
    }
    return
  }

  // 有缓存直接返回
  loaded = true
  anime = data
}

export const SORT = {
  // 上映时间
  begin(a = {}, b = {}, key = 'b') {
    return String(b[key] || '').localeCompare(String(a[key] || ''))
  },

  // 名称
  name(a = {}, b = {}, key = 'c') {
    return getPinYinFirstCharacter(a[key] || '').localeCompare(
      getPinYinFirstCharacter(b[key] || '')
    )
  },

  // 评分或排名
  rating(a = {}, b = {}, keyScore = 's', keyRank = 'r') {
    const sA = a[keyScore] || 0
    const sB = b[keyScore] || 0
    const rA = a[keyRank] === undefined ? -10000 : 10000 - a[keyRank]
    const rB = b[keyRank] === undefined ? -10000 : 10000 - b[keyRank]
    return sB + rB - (sA + rA)
  },

  // 随机
  random() {
    return 0.5 - Math.random()
  },

  // 分数, 也可用于数值比较
  score(a = {}, b = {}, key = 's') {
    return Number(b[key] || 0) - Number(a[key] || 0)
  }
}

/**
 * 只返回下标数组对象
 */
const reg = {
  '1月': /-(01|02|03|1|2|3)-/,
  '4月': /-(04|05|06|4|5|6)-/,
  '7月': /-(07|08|09|7|8|9)-/,
  '10月': /-(10|11|12)-/
}
const searchCache = {}

export function search({
  area,
  type,
  first,
  year,
  begin,
  status,
  tags = [],
  official,
  sort
} = {}) {
  init()

  // 查询指纹
  const finger = JSON.stringify({
    area,
    type,
    first,
    year,
    begin,
    status,
    tags,
    official,
    sort
  })
  if (sort !== '随机' && searchCache[finger]) {
    return searchCache[finger]
  }

  let _list = []
  let yearReg
  if (year) {
    yearReg = new RegExp(year === '2000以前' ? '^(2000|1\\d{3})' : `^(${year})`)
  }

  const data = getData()
  data.forEach((item, index) => {
    let match = true

    // area: 'jp'
    if (match && area) {
      match =
        ((item.ar || 'jp') === 'jp' && area === '日本') ||
        ((item.ar || 'jp') === 'cn' && area === '中国')
    }

    // type: 'TV'
    if (match && type) match = (item.ty || 'TV') === type

    // cn: 'Code Geass 反叛的鲁路修 第二季'
    if (match && first) match = first === getPinYinFirstCharacter(item.c)

    // begin: '2008-04-06'
    if (match && year) match = yearReg.test(item.b)
    if (match && begin) {
      if (!item.b) {
        match = false
      } else {
        const splits = item.b.split('-')

        if (!splits[1]) {
          match = false
        } else {
          match = reg[begin]?.test(`${splits[0]}-${splits[1]}-`)
        }
      }
    }

    // status: '完结'
    if (match && status) match = (item.st || '完结') === status

    // tags: '科幻 机战 悬疑 战斗 战争'
    if (match && tags.length) {
      tags.forEach(tag => {
        if (match) match = item.t?.includes(tag)
      })
    }

    if (match && official) match = item.o?.includes(official)

    if (match) _list.push(index)
  })

  switch (sort) {
    case '上映时间':
      _list = _list.sort((a, b) => SORT.begin(data[a], data[b]))
      break

    case '名称':
      _list = _list.sort((a, b) => SORT.name(data[a], data[b]))
      break

    case '评分':
    case '排名':
      _list = _list.sort((a, b) => SORT.rating(data[a], data[b]))
      break

    case '随机':
      _list = _list.sort(() => SORT.random())
      break

    default:
      break
  }

  const result = {
    list: _list,
    pagination: {
      page: 1,
      pageTotal: 1
    },
    _finger: finger,
    _loaded: getTimestamp()
  }
  searchCache[finger] = result

  return result
}

export function pick(index) {
  init()
  return unzip(getData()[index])
}

export function find(id) {
  init()
  return unzip(getData().find(item => item.id == id))
}

/**
 * 转换压缩数据的key名
 * @param {*} item
 *
 * {
 *   id: 132734,
 *   a: 20170072,
 *   o: 'A-1 Pictures',
 *   t: '爱情 校园 后宫',
 *   e: 'TV 00-11',
 *   c: '路人女主的养成方法 ♭',
 *   j: '冴えない彼女の育てかた ♭',
 *   i: '3a/ce/132734_m3fQm',
 *   b: '2017-04-06',
 *
 *   // 可能没有的键值, 使用默认值
 *   [s: 7.2]
 *   [r: 1523]
 *   [st: '完结']
 *   [ty: 'TV']
 *   [ar: 'jp']
 * }
 */
export function unzip(item = {}) {
  return {
    id: item.id || 0,
    ageId: item.a || 0,
    type: item.ty || 'TV',
    area: item.ar || 'jp',
    status: item.st || '完结',
    official: item.o || '',
    tags: item.t || '',
    ep: item.e || '',
    cn: item.c || '',
    jp: item.j || '',
    image: item.i || '',
    begin: item.b || '',
    score: item.s || 0,
    rank: item.r || 0
  }
}

/**
 * 猜你喜欢
 *  - 用户所有动画收藏
 *  - 动画标签
 *  - 动画排行/评分
 *
 *  - 最近操作记录
 */
const change = {
  想看: 3,
  在看: 2,
  看过: 1,
  搁置: -5,
  抛弃: -10
}
export function guess(
  userCollectionsMap = {},
  reverse
  // skipIds = []
) {
  const rates = {}
  Object.keys(userCollectionsMap).forEach(id => {
    const subject = find(id)
    if (subject.id && subject.tags) {
      const type = userCollectionsMap[id]
      subject.tags.split(' ').forEach(tag => {
        if (!(tag in rates)) {
          rates[tag] = 0
        }
        rates[tag] += change[type]
      })
    }
  })

  const data = getData()
  return (
    data
      .map((item, index) => {
        if (userCollectionsMap[item.id]) {
          return [index, reverse ? 100000 : 0]
        }

        let rate = 0
        String(item.t || '')
          .split(' ')
          .sort((a, b) => rates[b] - rates[a])
          .filter((item, index) => index < 3)
          .forEach(tag => {
            rate += rates[tag] || 0
          })
        rate *= item.r ? item.s || 0 : 0

        if (item.b) {
          const y = Number(item.b.slice(0, 4))
          if (!Number.isNaN(y)) {
            rate *= 0.98 ** Math.min(2021 - y, 10)
          } else {
            rate *= 0.98 ** 10
          }
        } else {
          rate *= 0.98 ** 10
        }

        return [index, parseInt(rate)]
      })
      .sort((a, b) => (reverse ? a[1] - b[1] : b[1] - a[1]))
      // .filter(item => !skipIds.includes(item.id))
      .filter((item, index) => index < 500)
      .map(item => ({
        ...unzip(data[item[0]]),
        rate: item[1]
      }))
  )
  // .sort(() => SORT.random())
}
