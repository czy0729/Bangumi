/*
 * @Author: czy0729
 * @Date: 2021-05-05 03:29:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-05-25 19:23:35
 */
import { DATA_ALPHABET } from '@constants'
import { getTimestamp } from './index'
import { getPinYinFirstCharacter } from './thirdParty/pinyin'
import { SORT } from './anime'

let game = []

export const GAME_FIRST = DATA_ALPHABET
export const GAME_YEAR = [
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
export const GAME_PLATFORM = [
  'PC',
  'PS4',
  'PS5',
  'NS',
  'PS3',
  'PS2',
  'PSV',
  'PSP',
  '3DS',
  'NDS',
  'XB1',
  'X360',
  'iOS',
  'Android',
  'GBA',
  'Wii',
  'WiiU',
  'PS',
  'XSX|S',
  'Xbox',
  'Stadia',
  'SFC',
  'FC',
  'GBC',
  'GB',
  'DC',
  'NGC',
  'Saturn',
  'N64',
  'MD',
  'Arcade'
]
export const GAME_CATE = [
  'ADV',
  '动作',
  '角色扮演',
  '冒险',
  '射击',
  '策略',
  '文字',
  '第三人称',
  '模拟',
  '主视角',
  '剧情',
  '平台',
  '解谜',
  '音乐',
  '独立',
  '回合制',
  '格斗',
  '育成',
  '恐怖',
  '科幻',
  '沙箱',
  '生存',
  '益智',
  '多人',
  '体育',
  '竞速',
  '即时战略',
  '俯视角',
  '开放世界',
  '竞技',
  '卡牌',
  'MMO',
  '派对',
  '潜入',
  '3D',
  '健身',
  '体感',
  '塔防',
  '弹幕',
  'VR',
  'MOBA',
  'Roguelike',
  '2D',
  '横版',
  'AR',
  '养成',
  '桌面'
]
export const GAME_DEV = [
  'Nintendo',
  'Bandai Namco',
  'CAPCOM',
  'Square Enix',
  'Koei Tecmo',
  'SEGA',
  'Ubisoft',
  'Atlus',
  'Nihon Falcom',
  'Game Freak',
  'Konami',
  'Intelligent Systems',
  'Gust Co. Ltd.',
  'Marvelous',
  'Omega Force',
  'LEVEL-5',
  'Sony Interactive Entertainment',
  'EA',
  'Arc System Works',
  '5pb.',
  'Blizzard',
  '日本一',
  'Valve',
  'Team Ninja',
  'KID',
  'Spike Chunsoft',
  'Square',
  'DOMO Studio',
  'Compile Heart',
  'Kojima Productions',
  'Monolith Soft',
  'AQUAPLUS',
  'FromSoftware',
  'DICE',
  'tri-Ace',
  'Otomate',
  'SNK',
  'Rockstar Games',
  'Naughty Dog',
  'Infinity Ward',
  'Bethesda',
  'CyberConnect2',
  'KEY',
  'BANPRESTO',
  'HAL Laboratory',
  'Bungie',
  '2K'
]
export const GAME_DEV_ADV = [
  '戯画',
  'ALICESOFT',
  'minori',
  'あかべぇそふとすりぃ',
  'SMEE',
  'Campus',
  'Key',
  'ぱれっと',
  'アトリエかぐや',
  'あざらしそふと',
  'Front Wing',
  'Liar-soft',
  'PULLTOP',
  'あかべぇそふとつぅ',
  'Innocent Grey',
  'FAVORITE',
  'Circus',
  'NEKO WORKs',
  'シルキーズプラス',
  'ensemble'
]
export const GAME_PUB = [
  'Nintendo',
  'Bandai Namco',
  'Square Enix',
  'CAPCOM',
  'Sony Interactive Entertainment',
  'SEGA',
  'Koei Tecmo',
  'EA',
  'Ubisoft',
  'Konami',
  'Atlus',
  'Microsoft',
  'Marvelous',
  '5pb.',
  'Nihon Falcom'
]
export const GAME_SORT = [
  '发行',
  '排名',
  '外网评分',
  '外网热度',
  '随机',
  '名称'
]
export const GAME_SORT_ADV = ['发行', '排名', '随机', '名称']

/**
 * 初始化游戏数据
 */
export async function init() {
  if (!game.length) {
    game = require('@constants/json/thirdParty/game.min.json')
  }
  return true
}

export function pick(index) {
  init()
  return unzip(game[index])
}

export function find(id) {
  init()
  return unzip(game.find(item => item.id == id))
}

/**
 * 只返回下标数组对象
 */
const searchCache = {}
export function search(query = {}) {
  init()

  // 查询指纹
  const { first, year, platform, cate, dev, pub, sort } = query
  const finger = JSON.stringify(query)

  if (sort !== '随机' && searchCache[finger]) {
    return searchCache[finger]
  }

  let _list = []
  let yearReg
  if (year) {
    yearReg = new RegExp(year === '2000以前' ? '^(2000|1\\d{3})' : `^(${year})`)
  }

  game.forEach((item, index) => {
    let match = true

    // t: '碧蓝幻想Versus'
    if (match && first) {
      match = first === getPinYinFirstCharacter(item.t)
    }

    //  en: '2020-02-06'
    if (match && year) match = yearReg.test(item.en || item.cn)

    // pl: ['PS4', 'PC']
    if (match && platform) match = item.pl?.includes(platform)

    // ta: ['格斗', '角色扮演']
    if (match && cate) match = item.ta?.includes(cate)

    // ta: ['格斗', '角色扮演']
    if (match && dev) match = item.d?.includes(dev)

    // ta: ['格斗', '角色扮演']
    if (match && pub) match = item.p?.includes(pub)

    if (match) _list.push(index)
  })

  switch (sort) {
    case '发行':
      _list = _list.sort((a, b) => SORT.begin(game[a], game[b], 'en'))
      break

    case '排名':
      _list = _list.sort((a, b) => SORT.rating(game[a], game[b], 'sc', 'r'))
      break

    case '外网评分':
      _list.sort((a, b) => SORT.score(game[a], game[b], 'vs'))
      break

    case '外网热度':
      _list.sort((a, b) => SORT.score(game[a], game[b], 'vc'))
      break

    case '随机':
      _list = _list.sort(() => SORT.random())
      break

    case '名称':
      _list = _list.sort((a, b) => SORT.name(game[a], game[b], 't'))
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

/**
 * 转换压缩数据的key名
 * @param {*} item
 *
 * {
 *   t: '碧蓝幻想Versus',
 *   l: 13,
 *   s: 'グランブルーファンタジー ヴァーサス',
 *   vs: 8.1,
 *   vc: 102,
 *   ta: ['格斗', '角色扮演'],
 *   la: ['简中'],
 *   d: ['Arc System Works'],
 *   p: ['Cygames', 'SEGA'],
 *   pl: ['PS4', 'PC'],
 *   cn: '2020-02-06',
 *   en: '2020-02-06',
 *   id: 269406,
 *
 *   // 可能没有的键值, 使用默认值
 *   sc: 6.5,
 *   r: 4023
 * }
 */
export function unzip(item = {}) {
  return {
    id: item.id || 0,
    length: item.l || 0,
    title: item.t || '',
    sub: item.s || '',
    cover: item.c || '',
    tag: item.ta || [],
    lang: item.lg || [],
    dev: item.d || [],
    publish: item.p || [],
    platform: item.pl || [],
    time: item.en || '',
    timeCn: item.cn || '',
    score: item.sc || 0,
    rank: item.r || 0,
    vid: item.v || 0,
    vgScore: item.vs || 0,
    vgCount: item.vc || 0
  }
}
