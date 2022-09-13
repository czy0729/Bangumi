/*
 * OTA 更新逻辑，暂时没使用
 * @Author: czy0729
 * @Date: 2021-05-05 03:29:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-13 21:12:17
 */
import { VERSION_GAME, CDN_STATIC_GAME, getOTA } from '@constants/cdn'
import { getTimestamp, getStorage, setStorage } from '../../index'
import { xhrCustom } from '../../fetch'
import { getPinYinFirstCharacter } from '../../thirdParty/pinyin'
import { SORT } from './../anime'
import { ItemType, QueryType } from './types'

const gameVersionKey = '@utils|game|version|210629'
const gameDataKey = '@utils|game|data|210629'
let game = []
let gameFallback = []
let loaded = false

/**
 * v5.0.0 后从包抽离, 需对比版本号
 * 若版本比 OTA.VERSION_GAME 的小, 请求 OTA.VERSION_STATIC 数据然后替换缓存
 * 否则直接读缓存
 */
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

/** 初始化数据 */
export async function init() {
  if (loaded) return

  // 云版本，版本没有 OTA 高需要重新请求数据
  const version = (await getStorage(gameVersionKey)) || VERSION_GAME
  const data = (await getStorage(gameDataKey)) || []

  const ota = getOTA()
  const needUpdate =
    (!loaded && !data.length) || parseInt(ota.VERSION_GAME) > parseInt(version)

  if (needUpdate) {
    try {
      loaded = true
      const { _response } = await xhrCustom({
        url: CDN_STATIC_GAME()
      })
      game = JSON.parse(_response)
      setStorage(gameVersionKey, parseInt(ota.VERSION_GAME))
      setStorage(gameDataKey, game)
    } catch (error) {}
    return
  }

  // 没缓存也要请求数据
  if (!data.length) {
    try {
      loaded = true
      const { _response } = await xhrCustom({
        url: CDN_STATIC_GAME()
      })
      game = JSON.parse(_response)
      setStorage(gameVersionKey, version)
      setStorage(gameDataKey, game)
    } catch (error) {}
    return
  }

  // 有缓存直接返回
  loaded = true
  game = data
}

export function pick(index: string | number) {
  init()
  return unzip(getData()[index])
}

export function find(id: any) {
  init()
  return unzip(getData().find(item => item.id == id))
}

const searchCache = {}

/** 只返回下标数组对象 */
export function search(query: QueryType) {
  init()

  // 查询指纹
  const { first, year, platform, cate, dev, pub, sort } = query || {}
  const finger = JSON.stringify(query)

  if (sort !== '随机' && searchCache[finger]) {
    return searchCache[finger]
  }

  let _list = []
  let yearReg: RegExp
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
export function unzip(item: ItemType) {
  return {
    id: item?.id || 0,
    length: item?.l || 0,
    title: item?.t || '',
    sub: item?.s || '',
    cover: item?.c || '',
    tag: item?.ta || [],
    lang: item?.lg || [],
    dev: item?.d || [],
    publish: item?.p || [],
    platform: item?.pl || [],
    time: item?.en || '',
    timeCn: item?.cn || '',
    score: item?.sc || 0,
    rank: item?.r || 0,
    vid: item?.v || 0,
    vgScore: item?.vs || 0,
    vgCount: item?.vc || 0
  }
}
