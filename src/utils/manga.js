/*
 * @Author: czy0729
 * @Date: 2021-01-09 20:07:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-17 19:59:49
 */
import { DATA_ALPHABET } from '@constants'
import { getOTA } from '@constants/cdn'
import { getTimestamp } from './index'
import { getPinYinFirstCharacter } from './thirdParty/pinyin'
import { SORT } from './anime'

let manga = []

/**
 * 初始化番剧数据
 */
export async function init() {
  if (!manga.length) {
    manga = require('@constants/json/thirdParty/manga.min.json')
  }
  return true
}

export const MANGA_FIRST = DATA_ALPHABET
export const MANGA_YEAR = [
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
export const MANGA_STATUS = ['连载', '完结']
export const MANGA_TAGS = [
  // 热门
  '爱情',
  '冒险',
  '搞笑',
  '校园',
  '魔幻',
  '科幻',

  // 冷门
  '战争',
  '萌系',
  '推理',
  '美食',
  '武侠',
  '职业',
  '音乐',
  '怪物',

  // 热门
  '魔法',
  '生活',
  '悬疑',
  '百合',
  '神鬼',
  '热血',
  '恐怖',

  // 冷门
  '机器人',
  '高中',
  '轻小说改编',
  '灵异',
  '惊悚',
  '吸血鬼',
  '爱情喜剧',
  '黑暗',

  // 热门
  '奇幻',
  '格斗',
  '喜剧',
  '耽美',
  '职场',
  '动作',
  '侦探',

  // 冷门
  '四格',
  '腐女',
  '黑道',
  '舞蹈',
  '小说改编',
  '时代剧',
  '社会',
  '料理',
  '恋爱',

  // 热门
  '治愈',
  '竞技',
  '体育',
  '后宫',
  '励志',
  '历史',
  '机战',
  '伪娘',

  // 冷门
  '鬼怪',
  '穿越',
  '轻小说',
  '网络游戏',
  '宅男',
  '写实',
  '异世界'
]
export const MANGA_HD = ['HD']
export const MANGA_SORT = ['排名', '发行时间', '随机', '名称']

/**
 * 只返回下标数组对象
 */
const searchCache = {}
export function search({
  first,
  year,
  begin,
  status,
  tags = [],
  hd,
  sort
} = {}) {
  init()

  // 查询指纹
  const finger = JSON.stringify({
    first,
    year,
    begin,
    status,
    tags,
    hd,
    sort
  })
  if (sort !== '随机' && searchCache[finger]) {
    return searchCache[finger]
  }

  const { HD = [] } = getOTA()
  let _list = []
  let yearReg
  if (year) {
    yearReg = new RegExp(year === '2000以前' ? '^(2000|1\\d{3})' : `^(${year})`)
  }

  manga.forEach((item, index) => {
    let match = true

    // cn: 'Code Geass 反叛的鲁路修 第二季'
    if (match && first) match = first === getPinYinFirstCharacter(item.c)

    // begin: '2008-04-06'
    if (match && year) match = yearReg.test(String(item.b))

    // status: 1
    if (match && status) {
      match =
        (item.st === 1 && status === '完结') || (!item.st && status === '连载')
    }

    // tags: '科幻 机战 悬疑 战斗 战争'
    if (match && tags.length) {
      tags.forEach(tag => {
        if (match) match = item.t?.includes(tag)
      })
    }

    if (match && hd) match = HD.includes(item.id)

    if (match) _list.push(index)
  })

  switch (sort) {
    case '发行时间':
      _list = _list.sort((a, b) => SORT.begin(manga[a], manga[b]))
      break

    case '名称':
      _list = _list.sort((a, b) => SORT.name(manga[a], manga[b]))
      break

    case '评分':
    case '排名':
      _list = _list.sort((a, b) => SORT.rating(manga[a], manga[b]))
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
  return unzip(manga[index])
}

export function find(id) {
  init()
  return unzip(manga.find(item => item.id == id))
}

/**
 * 转换压缩数据的key名
 * @param {*} item
 *
 * {
 *   id: 102486,
 *   m: 3421,
 *   a: '守姬武士',
 *   t: '搞笑',
 *   e: 42,
 *   c: '路人女主的养成方法',
 *   j: '冴えない彼女の育てかた',
 *   i: 'f9/75/102486_p72yo',
 *   b: 2013,
 *
 *   // 可能没有的键值, 使用默认值
 *   [st: ''], // 1为完结, 没有为连载
 *   [s: 7],
 *   [r: 2992]
 * }
 */
export function unzip(item = {}) {
  return {
    id: item.id || 0,
    mangaId: item.m || 0,
    author: item.a || '',
    tags: item.t || '',
    ep: item.e || '',
    cn: item.c || '',
    jp: item.j || '',
    image: item.i || '',
    begin: item.b || '',
    status: item.st || '',
    score: item.s || 0,
    rank: item.r || 0
  }
}
