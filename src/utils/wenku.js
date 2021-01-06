/*
 * @Author: czy0729
 * @Date: 2020-09-02 18:26:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-06 17:57:09
 */
// import { VERSION_WENKU, CDN_STATIC_WENKU, getOTA } from '@constants/cdn'
// import wenkuData from '@constants/json/wenku.min.json'
import {
  getTimestamp
  // getStorage, setStorage
} from './index'
// import { xhrCustom } from './fetch'
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
  '评分',
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
// const wenkuVersionKey = '@utils|wenku|version'
// const wenkuDataKey = '@utils|wenku|data'
let wenku = []

/**
 * 初始化文库数据
 */
export async function init() {
  if (!wenku.length) {
    wenku = require('@constants/json/wenku.min.json')
  }
  return true

  // // 版本没有OTA高需要重新请求数据
  // const version = (await getStorage(wenkuVersionKey)) || VERSION_WENKU
  // const ota = getOTA()
  // const needUpdate = parseInt(ota.VERSION_WENKU) > parseInt(version)
  // if (needUpdate) {
  //   const { _response } = await xhrCustom({
  //     url: CDN_STATIC_WENKU()
  //   })
  //   wenku = JSON.parse(_response)
  //   setStorage(wenkuVersionKey, version)
  //   setStorage(wenkuDataKey, wenku)
  //   return
  // }

  // // 没缓存也要请求数据
  // const data = (await getStorage(wenkuDataKey)) || []
  // if (!data.length) {
  //   const { _response } = await xhrCustom({
  //     url: CDN_STATIC_WENKU()
  //   })
  //   wenku = JSON.parse(_response)
  //   setStorage(wenkuVersionKey, version)
  //   setStorage(wenkuDataKey, wenku)
  //   return
  // }

  // // 有缓存直接返回
  // wenku = data
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
      match = first === getPinYinFirstCharacter(item.c || item.j)
    }

    // begin: 2009
    if (match && year) match = yearReg.test(item.b)

    // status: 1
    if (match && status) {
      match = status === '连载' ? item.st === 1 : !item.st
    }

    // anime: 1, 是否动画化
    if (match && anime) {
      match = anime === '是' ? item.an === 1 : !item.an
    }

    if (match) _list.push(index)
  })

  switch (sort) {
    case '发行':
      _list = _list.sort((a, b) =>
        String(wenku[b].b).localeCompare(String(wenku[a].b))
      )
      break

    case '更新':
      _list = _list.sort((a, b) =>
        String(wenku[b].up).localeCompare(String(wenku[a].up))
      )
      break

    case '名称':
      _list = _list.sort((a, b) =>
        getPinYinFirstCharacter(wenku[a].c || wenku[a].j).localeCompare(
          getPinYinFirstCharacter(wenku[b].c || wenku[a].j)
        )
      )
      break

    case '评分':
      _list = _list.sort((a, b) => (wenku[b].s || 0) - (wenku[a].s || 0))
      break

    case '热度':
      _list = _list.sort((a, b) => {
        if (wenku[a].h === wenku[b].h) {
          return (wenku[b].s || 0) - (wenku[a].s || 0)
        }
        return wenku[b].h - wenku[a].h
      })
      break

    case '趋势':
      _list = _list.sort((a, b) => {
        if (wenku[a].u === wenku[b].u) {
          return (wenku[b].s || 0) - (wenku[a].s || 0)
        }
        return wenku[b].u - wenku[a].u
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
  return unzip(wenku[index])
}

export function find(id) {
  return unzip(wenku.find(item => item.id == id))
}

/**
 * 转换压缩数据的key名
 * @param {*} item
 *
 * {
 *   id: 44637,
 *   w: 1359,
 *   a: '丸户史明',
 *   e: '番外 FD2 插图',
 *   c: '不起眼女主角培育法(路人女主的养成方法)',
 *   j: '冴えない彼女の育てかた',
 *   i: 'e5/21/44637_5h36F',
 *   b: '2012-07',
 *   up: '2020-02-17',
 *   ca: '富士见文库',
 *   h: 5,
 *   u: 3,
 *   l: 163.2
 *
 *   // 可能没有的键值, 使用默认值
 *   [st: 1]  1: 连载
 *   [an: 1]  1: 动画化
 *   [s: 7.8]
 *   [r: 896]
 * }
 */
export function unzip(item = {}) {
  return {
    id: item.id || 0,
    wid: item.w || 0,
    status: item.st || 0,
    anime: item.an || 0,
    author: item.a || '',
    ep: item.e || '',
    cn: item.c || '',
    jp: item.j || '',
    image: item.i || '',
    begin: item.b || '',
    update: item.up || '',
    cate: item.ca || '',
    hot: item.h || 0,
    up: item.u || 0,
    len: item.l || '',
    score: item.s || 0,
    rank: item.r || 0
  }
}
