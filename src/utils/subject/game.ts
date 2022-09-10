/*
 * @Author: czy0729
 * @Date: 2021-05-05 03:29:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-11 02:40:07
 */
import { DATA_ALPHABET } from '@constants/constants'
import { VERSION_GAME, CDN_STATIC_GAME, getOTA } from '@constants/cdn'
import { getTimestamp, getStorage, setStorage } from '../index'
import { xhrCustom } from '../fetch'
// import { info } from '../ui'
import { getPinYinFirstCharacter } from '../thirdParty/pinyin'
import { ANIME_YEAR, SORT } from './anime'

export const GAME_FIRST = DATA_ALPHABET
export const GAME_YEAR = ANIME_YEAR
export const GAME_PLATFORM = [
  'PC',
  'NS',
  'PS5',
  'PS4',
  'XSX|S',
  'XB1',
  'PS3',
  'PS2',
  'PSV',
  'PSP',
  '3DS',
  'NDS',
  'X360',
  'iOS',
  'Android',
  'GBA',
  'Wii',
  'WiiU',
  'PS',
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

export const GAME_SORT = ['发行', '排名', '外网评分', '外网热度', '随机', '名称']

export const GAME_SORT_ADV = ['发行', '排名', '随机', '名称']

/**
 * v5.0.0 后从包抽离, 需对比版本号
 * 若版本比 OTA.VERSION_GAME 的小, 请求 OTA.VERSION_STATIC 数据然后替换缓存
 * 否则直接读缓存
 */
const gameVersionKey = '@utils|game|version|210629'
const gameDataKey = '@utils|game|data|210629'
let game = []
let gameFallback = []
let loaded = false

function getData() {
  if (!loaded) {
    if (gameFallback.length) return gameFallback
    return game
  }

  if (loaded && game.length) {
    return game
  }

  if (!gameFallback.length) {
    gameFallback = require('@assets/json/thirdParty/game.min.json')
  }
  return gameFallback
}

/**
 * 初始化数据
 */
export async function init() {
  if (loaded) return

  // 云版本
  // 版本没有 OTA 高需要重新请求数据
  const version = (await getStorage(gameVersionKey)) || VERSION_GAME
  const data = (await getStorage(gameDataKey)) || []

  const ota = getOTA()
  const needUpdate =
    (!loaded && !data.length) || parseInt(ota.VERSION_GAME) > parseInt(version)
  if (needUpdate) {
    // info('正在从云端拉取最新数据...')

    try {
      loaded = true
      const { _response } = await xhrCustom({
        url: CDN_STATIC_GAME()
      })
      game = JSON.parse(_response)
      setStorage(gameVersionKey, parseInt(ota.VERSION_GAME))
      setStorage(gameDataKey, game)
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
        url: CDN_STATIC_GAME()
      })
      game = JSON.parse(_response)
      setStorage(gameVersionKey, version)
      setStorage(gameDataKey, game)
    } catch (error) {
      // 404
    }
    return
  }

  // 有缓存直接返回
  loaded = true
  game = data
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

  const data = getData()
  data.forEach((item, index) => {
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
      _list = _list.sort((a, b) => SORT.begin(data[a], data[b], 'en'))
      break

    case '排名':
      _list = _list.sort((a, b) => SORT.rating(data[a], data[b], 'sc', 'r'))
      break

    case '外网评分':
      _list.sort((a, b) => SORT.score(data[a], data[b], 'vs'))
      break

    case '外网热度':
      _list.sort((a, b) => SORT.score(data[a], data[b], 'vc'))
      break

    case '随机':
      _list = _list.sort(() => SORT.random())
      break

    case '名称':
      _list = _list.sort((a, b) => SORT.name(data[a], data[b], 't'))
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
