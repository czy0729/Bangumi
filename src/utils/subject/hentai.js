/*
 * @Author: czy0729
 * @Date: 2020-07-15 00:12:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-06-30 11:09:59
 */
import { DATA_ALPHABET } from '@constants'
import { VERSION_HENTAI, CDN_STATIC_HENTAI, getOTA } from '@constants/cdn'
import { getTimestamp, getStorage, setStorage } from '../index'
import { xhrCustom } from '../fetch'
import { info } from '../ui'
import { getPinYinFirstCharacter } from '../thirdParty/pinyin'
import { ANIME_YEAR, SORT } from './anime'

export const HENTAI_FIRST = DATA_ALPHABET
export const HENTAI_YEAR = ANIME_YEAR
export const HENTAI_SORT = ['排名', '上映时间', '随机', '名称']
export const HENTAI_CHARA = [
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
export const HENTAI_JOB = [
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
export const HENTAI_BODY = [
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
export const HENTAI_CONTENT = [
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
export const HENTAI_TAGS = [
  ...HENTAI_CHARA, // 0-7
  ...HENTAI_JOB, // 8-24
  ...HENTAI_BODY, // 25-39
  ...HENTAI_CONTENT // 40-80+
]

/**
 * v5.0.0 后从包抽离, 需对比版本号
 * 若版本比 OTA.VERSION_HENTAI 的小, 请求 OTA.VERSION_STATIC 数据然后替换缓存
 * 否则直接读缓存
 */
const hentaiVersionKey = '@utils|hentai|version|210629'
const hentaiDataKey = '@utils|hentai|data|210629'
const hentaiFallback = []
let hentai = []
let loaded = false

function getData() {
  if (!loaded) {
    if (hentaiFallback.length) return hentaiFallback
    return hentai
  }

  if (loaded && hentai.length) {
    return hentai
  }

  // hentai 不做本地静态数据
  // if (!hentaiFallback.length) {
  //   hentaiFallback = require('@constants/json/thirdParty/hentai.min.json')
  // }
  return hentaiFallback
}

/**
 * 初始化番剧数据
 */
export async function init() {
  if (loaded) return

  // 云版本
  // 版本没有 OTA 高需要重新请求数据
  const version = (await getStorage(hentaiVersionKey)) || VERSION_HENTAI
  const data = (await getStorage(hentaiDataKey)) || []

  const ota = getOTA()
  const needUpdate =
    (!loaded && !data.length) ||
    parseInt(ota.VERSION_HENTAI) > parseInt(version)
  if (needUpdate) {
    info('正在从云端拉取最新数据...')

    try {
      loaded = true
      const { _response } = await xhrCustom({
        url: CDN_STATIC_HENTAI()
      })
      hentai = JSON.parse(_response).data
      setStorage(hentaiVersionKey, parseInt(ota.VERSION_HENTAI))
      setStorage(hentaiDataKey, hentai)
    } catch (error) {
      // 404
    }
    return
  }

  // 没缓存也要请求数据
  if (!data.length) {
    info('正在从云端拉取最新数据...')

    try {
      loaded = true
      const { _response } = await xhrCustom({
        url: CDN_STATIC_HENTAI()
      })
      hentai = JSON.parse(_response)
      setStorage(hentaiVersionKey, version)
      setStorage(hentaiDataKey, hentai)
    } catch (error) {
      // 404
    }
    return
  }

  // 有缓存直接返回
  loaded = true
  hentai = data
}

/**
 * 只返回下标数组对象
 */
const searchCache = {}
export function search(query = {}) {
  init()

  // 查询指纹
  const { first, year, chara, job, body, content, sort } = query
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
  const tagsMap = {}
  HENTAI_TAGS.forEach((item, index) => {
    tagsMap[item] = index
  })
  data.forEach((item, index) => {
    let match = true

    // c: '风筝'
    if (match && first) {
      match = first === getPinYinFirstCharacter(item.c || item.j)
    }

    //  a: '1998-02-25'
    if (match && year) match = yearReg.test(item.a)

    if (match && chara) match = item.t?.includes(tagsMap[chara])
    if (match && job) match = item.t?.includes(tagsMap[job])
    if (match && body) match = item.t?.includes(tagsMap[body])
    if (match && content) match = item.t?.includes(tagsMap[content])

    if (match) _list.push(index)
  })

  switch (sort) {
    case '上映时间':
      _list = _list.sort((a, b) => SORT.begin(data[a], data[b], 'a'))
      break

    case '名称':
      _list = _list.sort((a, b) => SORT.name(data[a], data[b], 'c'))
      break

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
 * {
 *   id: 25469,
 *   h: 22824,
 *   c: '风筝',
 *   j: 'A KITE',
 *   i: 'b5/75/25469_APhI3',
 *   n: 1247,
 *   a: '1998-02-25',
 *   e: 2,
 *
 *   // 可能没有的键值, 使用默认值
 *   [s: 7.6]
 *   [r: 766]
 *   [t: [13,73,54,26,41,78,48,53,55,1,50,10]]
 * }
 */
export function unzip(item = {}) {
  return {
    id: item.id || 0,
    hId: item.h || 0,
    cn: item.c || '',
    jp: item.j || '',
    image: item.i || '',
    air: item.a || '',
    ep: item.e || '',
    score: item.s || 0,
    rank: item.r || 0,
    total: item.n || 0,
    tags: item.t || []
  }
}
