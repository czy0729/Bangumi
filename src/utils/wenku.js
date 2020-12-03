/*
 * @Author: czy0729
 * @Date: 2020-09-02 18:26:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-09-27 11:57:30
 */
import { VERSION_WENKU, CDN_STATIC_WENKU, getOTA } from '@constants/cdn'
import { getTimestamp, getStorage, setStorage } from './index'
import { xhrCustom } from './fetch'
import { getPinYinFirstCharacter } from './thirdParty/pinyin'

export const WENKU_FIRST = [
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
export const WENKU_YEAR = [
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
export const WENKU_STATUS = ['连载', '完结']
export const WENKU_ANIME = ['是', '否']
export const WENKU_SORT = [
  '发行',
  '排名',
  '热度',
  '趋势',
  '更新',
  '随机',
  '名称'
]

/**
 * v4.0.0后从包抽离, 需对比版本号
 * 若版本比OTA.VERSION_WENKU的小, 请求OTA.VERSION_STATIC数据然后替换缓存
 * 否则直接读缓存
 */
const wenkuVersionKey = '@utils|wenku|version'
const wenkuDataKey = '@utils|wenku|data'
let wenku = []

/**
 * 初始化文库数据
 */
export async function init() {
  if (wenku.length) {
    return
  }

  // 版本没有OTA高需要重新请求数据
  const version = (await getStorage(wenkuVersionKey)) || VERSION_WENKU
  const ota = getOTA()
  const needUpdate = parseInt(ota.VERSION_WENKU) > parseInt(version)
  if (needUpdate) {
    const { _response } = await xhrCustom({
      url: CDN_STATIC_WENKU()
    })
    wenku = JSON.parse(_response)
    setStorage(wenkuVersionKey, version)
    setStorage(wenkuDataKey, wenku)
    return
  }

  // 没缓存也要请求数据
  const data = (await getStorage(wenkuDataKey)) || []
  if (!data.length) {
    const { _response } = await xhrCustom({
      url: CDN_STATIC_WENKU()
    })
    wenku = JSON.parse(_response)
    setStorage(wenkuVersionKey, version)
    setStorage(wenkuDataKey, wenku)
    return
  }

  // 有缓存直接返回
  wenku = data
}

/**
 * 只返回下标数组对象
 */
const searchCache = {}
export function search({ sort, year, first, status, anime } = {}) {
  // 查询指纹
  const finger = JSON.stringify({
    sort,
    year,
    first,
    status,
    anime
  })

  if (sort !== '随机' && searchCache[finger]) {
    return searchCache[finger]
  }

  let _list = []
  let yearReg
  if (year) {
    yearReg = new RegExp(year === '2000以前' ? '^(2000|1\\d{3})' : `^(${year})`)
  }

  wenku.forEach((item, index) => {
    let match = true

    // cn: '云之彼端约定之地'
    if (match && first) {
      match = first === getPinYinFirstCharacter(item.cn || item.jp)
    }

    // begin: 2009
    if (match && year) {
      match = yearReg.test(item.begin)
    }

    // status: 1
    if (match && status !== '') {
      match = status === '完结' ? item.status === 1 : item.status === 0
    }

    // anime: 1, 是否动画化
    if (match && anime !== '') {
      match = anime === '是' ? item.anime === 1 : item.anime === 0
    }

    if (match) {
      _list.push(index)
    }
  })

  switch (sort) {
    case '发行':
      _list = _list.sort((a, b) =>
        String(wenku[b].begin).localeCompare(String(wenku[a].begin))
      )
      break

    case '更新':
      _list = _list.sort((a, b) =>
        String(wenku[b].update).localeCompare(String(wenku[a].update))
      )
      break

    case '名称':
      _list = _list.sort((a, b) =>
        getPinYinFirstCharacter(wenku[a].cn || wenku[a].jp).localeCompare(
          getPinYinFirstCharacter(wenku[b].cn || wenku[a].jp)
        )
      )
      break

    case '排名':
      _list = _list.sort(
        (a, b) => (wenku[a].rank || 9999) - (wenku[b].rank || 9999)
      )
      break

    case '热度':
      _list = _list.sort((a, b) => {
        if (wenku[a].hot === wenku[b].hot) {
          return (wenku[a].rank || 9999) - (wenku[b].rank || 9999)
        }
        return wenku[b].hot - wenku[a].hot
      })
      break

    case '趋势':
      _list = _list.sort((a, b) => {
        if (wenku[a].up === wenku[b].up) {
          return (wenku[a].rank || 9999) - (wenku[b].rank || 9999)
        }
        return wenku[b].up - wenku[a].up
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
  return wenku[index] || {}
}

export function find(id) {
  const item = wenku.find(item => item.id == id) || {}
  return item
}
