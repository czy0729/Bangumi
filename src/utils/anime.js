/*
 * @Author: czy0729
 * @Date: 2020-07-15 00:12:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-17 10:53:36
 */
import anime from '@constants/anime'
import { getTimestamp } from './index'
import { getPinYinFirstCharacter } from './thirdParty/pinyin'

export const ANIME_AREA = ['jp', 'cn', 'en']
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
  '伪娘',
  '耽美',
  '童年',
  '教育',
  '亲子',
  '真人',
  '悬疑',
  '推理',
  '奇幻',
  '科幻',
  '肉番',
  '机战',
  '热血',
  '美少女',
  '轻小说',
  '吸血鬼',
  '乙女向',
  '泡面番',
  '欢乐向'
]
export const ANIME_SORT = ['上映时间', '名称', '评分', '随机']

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
  type,
  first,
  year,
  begin,
  status,
  tags = [],
  sort
} = {}) {
  const finger = JSON.stringify({
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

  if (sort) {
    if (sort === '上映时间') {
      _list = _list.sort((a, b) => anime[b].begin.localeCompare(anime[a].begin))
    } else if (sort === '名称') {
      _list = _list.sort((a, b) =>
        getPinYinFirstCharacter(anime[a].cn).localeCompare(
          getPinYinFirstCharacter(anime[b].cn)
        )
      )
    } else if (sort === '评分') {
      _list = _list.sort(
        (a, b) => (anime[b].score || 0) - (anime[a].score || 0)
      )
    } else if (sort === '随机') {
      _list = _list.sort(() => 0.5 - Math.random())
    }
  }

  const result = {
    list: _list,
    pagination: {
      page: 1,
      pageTotal: 1
    },
    // _list,
    _finger: finger,
    _loaded: getTimestamp()
  }
  searchCache[finger] = result

  return result
}

export function pick(index) {
  return anime[index] || {}
}

export function find(id) {
  const item = anime.find(item => item.id == id) || {}
  return item
}
