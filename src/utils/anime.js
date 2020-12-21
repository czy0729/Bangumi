/*
 * @Author: czy0729
 * @Date: 2020-07-15 00:12:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-21 20:51:19
 */
import { VERSION_ANIME, CDN_STATIC_ANIME, getOTA } from '@constants/cdn'
import rateData from '@constants/json/rate.json'
import { getTimestamp, getStorage, setStorage } from './index'
import { xhrCustom } from './fetch'
import { getPinYinFirstCharacter } from './thirdParty/pinyin'

/**
 * v4.0.0后从包抽离, 需对比版本号
 * 若版本比OTA.VERSION_ANIME的小, 请求OTA.VERSION_STATIC数据然后替换缓存
 * 否则直接读缓存
 */
const animeVersionKey = '@utils|anime|version'
const animeDataKey = '@utils|anime|data'
let anime = []

/**
 * 初始化番剧数据
 */
export async function init() {
  if (anime.length) {
    return
  }

  // 版本没有OTA高需要重新请求数据
  const version = (await getStorage(animeVersionKey)) || VERSION_ANIME
  const ota = getOTA()

  const needUpdate = parseInt(ota.VERSION_ANIME) > parseInt(version)
  if (needUpdate) {
    const { _response } = await xhrCustom({
      url: CDN_STATIC_ANIME()
    })
    anime = JSON.parse(_response)
    setStorage(animeVersionKey, version)
    setStorage(animeDataKey, anime)
    return
  }

  // 没缓存也要请求数据
  const data = (await getStorage(animeDataKey)) || []
  if (!data.length) {
    const { _response } = await xhrCustom({
      url: CDN_STATIC_ANIME()
    })
    anime = JSON.parse(_response)
    setStorage(animeVersionKey, version)
    setStorage(animeDataKey, anime)
    return
  }

  // 有缓存直接返回
  anime = data
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
  '校园',
  '励志',
  '后宫',
  '百合',
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
export const ANIME_SORT = ['上映时间', '评分', '随机', '名称']

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
        (item.area === 'jp' && area === '日本') ||
        (item.area === 'cn' && area === '中国')
    }

    // type: 'TV'
    if (match && type) {
      match = item.type === type
    }

    // cn: 'Code Geass 反叛的鲁路修 第二季'
    if (match && first) {
      match = first === getPinYinFirstCharacter(item.cn)
    }

    // begin: '2008-04-06'
    if (match && year) {
      match = yearReg.test(item.begin)
    }
    if (match && begin) {
      match = reg[begin] ? reg[begin].test(item.begin) : false
    }

    // status: '完结'
    if (match && status) {
      match = item.status === status
    }

    // tags: '科幻 机战 悬疑 战斗 战争'
    if (match && tags.length) {
      tags.forEach(tag => {
        if (match) {
          match = item.tags.includes(tag)
        }
      })
    }

    if (match) {
      _list.push(index)
    }
  })

  switch (sort) {
    case '上映时间':
      _list = _list.sort((a, b) => anime[b].begin.localeCompare(anime[a].begin))
      break

    case '名称':
      _list = _list.sort((a, b) =>
        getPinYinFirstCharacter(anime[a].cn).localeCompare(
          getPinYinFirstCharacter(anime[b].cn)
        )
      )
      break

    case '评分':
      _list = _list.sort((a, b) => {
        let _a = rateData[anime[a].id] || anime[a].score || 0
        let _b = rateData[anime[b].id] || anime[b].score || 0
        if (anime[a].status === '未播放') _a = 0
        if (anime[b].status === '未播放') _b = 0
        return _b - _a
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
  const item = anime[index] || {}
  if (rateData[item.id]) {
    item.score = rateData[item.id]
  }
  return item
}

export function find(id) {
  const item = anime.find(item => item.id == id) || {}
  return item
}
