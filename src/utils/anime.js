/*
 * @Author: czy0729
 * @Date: 2020-07-15 00:12:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-10 21:08:43
 */
// import { VERSION_ANIME, CDN_STATIC_ANIME, getOTA } from '@constants/cdn'
// import animeData from '@constants/json/anime.min.json'
import {
  getTimestamp
  // getStorage, setStorage
} from './index'
// import { xhrCustom } from './fetch'
import { getPinYinFirstCharacter } from './thirdParty/pinyin'

/**
 * v4.0.0后从包抽离, 需对比版本号
 * 若版本比OTA.VERSION_ANIME的小, 请求OTA.VERSION_STATIC数据然后替换缓存
 * 否则直接读缓存
 */
// const animeVersionKey = '@utils|anime|version'
// const animeDataKey = '@utils|anime|data'
let anime = []

/**
 * 初始化番剧数据
 */
export async function init() {
  if (!anime.length) {
    anime = require('@constants/json/anime.min.json')
  }
  return true

  // // 版本没有OTA高需要重新请求数据
  // const version = (await getStorage(animeVersionKey)) || VERSION_ANIME
  // const ota = getOTA()

  // const needUpdate = parseInt(ota.VERSION_ANIME) > parseInt(version)
  // if (needUpdate) {
  //   const { _response } = await xhrCustom({
  //     url: CDN_STATIC_ANIME()
  //   })
  //   anime = JSON.parse(_response)
  //   setStorage(animeVersionKey, version)
  //   setStorage(animeDataKey, anime)
  //   return
  // }

  // // 没缓存也要请求数据
  // const data = (await getStorage(animeDataKey)) || []
  // if (!data.length) {
  //   const { _response } = await xhrCustom({
  //     url: CDN_STATIC_ANIME()
  //   })
  //   anime = JSON.parse(_response)
  //   setStorage(animeVersionKey, version)
  //   setStorage(animeDataKey, anime)
  //   return
  // }

  // // 有缓存直接返回
  // anime = data
}

export const ANIME_AREA = ['日本', '中国']
export const ANIME_TYPE = ['TV', '剧场版', 'OVA', 'WEB']
export const ANIME_FIRST = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
]
export const ANIME_YEAR = [
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
export const ANIME_SORT = ['排名', '上映时间', '随机', '名称']

/**
 * 只返回下标数组对象
 */
const reg = {
  '1月': /-(01|02|03)-/,
  '4月': /-(04|05|06)-/,
  '7月': /-(07|08|09)-/,
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
  sort
} = {}) {
  // 查询指纹
  const finger = JSON.stringify({
    area,
    type,
    first,
    year,
    begin,
    status,
    tags,
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

  anime.forEach((item, index) => {
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
    if (match && begin) match = reg[begin]?.test(item.b)

    // status: '完结'
    if (match && status) match = (item.st || '完结') === status

    // tags: '科幻 机战 悬疑 战斗 战争'
    if (match && tags.length) {
      tags.forEach(tag => {
        if (match) match = item.t?.includes(tag)
      })
    }

    if (match) _list.push(index)
  })

  switch (sort) {
    case '上映时间':
      _list = _list.sort((a, b) =>
        String(anime[b].b).localeCompare(String(anime[a].b))
      )
      break

    case '名称':
      _list = _list.sort((a, b) =>
        getPinYinFirstCharacter(anime[a].c).localeCompare(
          getPinYinFirstCharacter(anime[b].c)
        )
      )
      break

    case '评分':
    case '排名':
      _list = _list.sort((a, b) => {
        const itemA = anime[a] || {}
        const itemB = anime[b] || {}
        if (itemA.r && itemB.r) return itemA.r - itemB.r
        return (
          (itemB.s || 0 + itemB.r ? 100 : 0) -
          (itemA.s || 0 + itemA.r ? 100 : 0)
        )
      })
      break

    case '随机':
      _list = _list.sort(() => 0.5 - Math.random())
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
  return unzip(anime[index])
}

export function find(id) {
  return unzip(anime.find(item => item.id == id))
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
