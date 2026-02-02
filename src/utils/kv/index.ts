/*
 * @Author: czy0729
 * @Date: 2022-06-23 01:47:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-02 13:38:46
 */
import Constants from 'expo-constants'
import { WEB } from '@constants/device'
import Crypto from '../crypto'
import { isDevtoolsOpen } from '../dom'
import { axios } from '../thirdParty'
import hash from '../thirdParty/hash'
import { getTimestamp } from '../utils'
import { err, log } from './utils'
import {
  HEADERS,
  HOST,
  HOST_C2,
  HOST_C2_CONFIG,
  HOST_COMPLETIONS,
  HOST_HM,
  HOST_PIC_LIST,
  UPDATE_CACHE_MAP
} from './ds'

import type { TranslateResult, UserId } from '@types'
import type { Result, ResultCollectList, ResultHeatmap, ResultPicList, ResultTemp } from './type'

let userAgent = ''

/** 获取 */
export async function get<T = any>(key: string): Promise<T | null> {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  // 部分没有登录的用户, 出现了预料之外的请求, 统一过滤掉
  if (typeof key !== 'string' || /["//]/.test(key)) return Promise.reject('denied')

  try {
    const { data } = await axios({
      method: 'get',
      url: `${HOST}/v1/get/${key}`
    })

    const response = Crypto.get<Result<T>>(data)
    if (response?.code === 200) return response?.data
  } catch (error) {
    err('get', error, key)
  }

  return null
}

/** 批量获取 */
export async function gets<
  T = any,
  K extends keyof T = keyof T,
  Keys extends readonly string[] = string[]
>(
  keys: Keys,
  picker?: K[]
): Promise<
  | {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      [P in Keys[number]]: T | null
    }
  | null
> {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  const query: {
    data: {
      keys: Keys
      picker?: K[]
    }
  } = {
    data: { keys }
  }
  if (picker) query.data.picker = picker

  try {
    const { data } = await axios({
      method: 'post',
      url: `${HOST}/v1/get`,
      headers: HEADERS,
      ...query
    })

    const response = Crypto.get<Result<Record<Keys[number], T | null>>>(data)
    if (response?.code === 200) {
      log('gets', keys.slice(0, 8), keys.length)
      return response.data
    }
  } catch (error) {
    err('gets', error, keys.slice(0, 8), keys.length)
  }

  return null
}

/** 更新 */
export async function update(
  key: string,
  value: string | object,
  updateTS: boolean = true,
  allowWebCommit: boolean = false,
  fingerCheck: boolean = true
): Promise<Result | null> {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  if (WEB && !allowWebCommit) return

  const fingerValue =
    typeof value === 'string'
      ? { key, value, updateTS }
      : { key, value: { ...value, _loaded: true }, updateTS }
  if (fingerCheck) {
    const finger = hash(JSON.stringify(fingerValue)).slice(0, 4)
    if (UPDATE_CACHE_MAP.has(finger)) return

    UPDATE_CACHE_MAP.set(finger, true)
    log('update', key, finger)
  } else {
    log('update', key)
  }

  const payload =
    typeof value === 'string'
      ? value
      : updateTS
      ? { ...value, ts: getTimestamp() }
      : { ts: getTimestamp(), ...value }

  try {
    const { data } = await axios({
      method: 'post',
      url: `${HOST}/v1/update`,
      headers: HEADERS,
      data: { key, value: payload }
    })

    return Crypto.get(data)
  } catch (error) {
    err('update', error, key)
  }

  return null
}

/** 查询在线 */
export async function onlines(): Promise<Result | null> {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  try {
    const { data } = await axios({
      method: 'get',
      url: `${HOST}/v1/online/get`
    })

    const response = Crypto.get<Result>(data)
    if (response?.code === 200) return response?.data || {}
  } catch (error) {
    err('onlines', error)
  }

  return null
}

/** 在线上报 */
export async function report(userID: string | number): Promise<Result | null> {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  try {
    const { data } = await axios({
      method: 'post',
      url: `${HOST}/v1/online/report`,
      headers: HEADERS,
      data: { userID }
    })

    return Crypto.get<Result>(data)
  } catch (error) {
    err('report', error)
  }

  return null
}

/** 是否收藏 */
export async function is(userID: string | number, topicID: string): Promise<Result | null> {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  try {
    const { data } = await axios({
      method: 'get',
      url: `${HOST}/v1/collect/user/is?topicID=${topicID}&userID=${userID}`
    })

    return Crypto.get<Result>(data)
  } catch (error) {
    err('is', error)
  }

  return null
}

/** 收藏 */
export async function collect(
  userID: string | number,
  topicID: string,
  value: boolean = true
): Promise<Result | null> {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  try {
    const { data } = await axios({
      method: 'post',
      url: `${HOST}/v1/collect/user/update`,
      headers: HEADERS,
      data: {
        topicID,
        userID,
        collect: value
      }
    })

    return Crypto.get<Result>(data)
  } catch (error) {
    err('collect', error)
  }

  return null
}

/** 所有收藏 */
export async function collectList(userID: string | number): Promise<ResultCollectList | null> {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  try {
    const { data } = await axios({
      method: 'get',
      url: `${HOST}/v1/collect/user/list?userID=${userID}`
    })

    return Crypto.get<ResultCollectList>(data)
  } catch (error) {
    err('collectList', error)
  }

  return null
}

/** 临时文件 */
export async function temp(
  fileName: string,
  fileContent: string,
  fileExpire?: -1 | undefined
): Promise<ResultTemp | null> {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  try {
    const { data } = await axios({
      method: 'post',
      url: `${HOST}/v1/temp/upload`,
      headers: HEADERS,
      data: {
        fileName,
        fileContent,
        fileExpire
      }
    })

    return Crypto.get<ResultTemp>(data)
  } catch (error) {
    err('temp', error)
  }

  return null
}

/** 下载文件 */
export function download(downloadKey: string) {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  return `${HOST}/v1/temp/download/${downloadKey}`
}

/** 搜索 */
export async function search(q: string, withMessage: boolean = false): Promise<Result | null> {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  try {
    const { data } = await axios({
      method: 'post',
      url: `${HOST}/v1/topic/search`,
      headers: HEADERS,
      data: {
        search: q,
        withMessage
      }
    })

    return Crypto.get<Result>(data)
  } catch (error) {
    err('search', error)
  }

  return null
}

/**
 * 分词
 * @returns [关键词, 权重整数数字的字符串][]
 * */
export async function extract(q: string) {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  try {
    const { data } = await axios({
      method: 'post',
      url: `${HOST}/v1/jieba/extract`,
      headers: HEADERS,
      data: {
        sentence: q,
        threshold: Math.max(10, Math.min(80, Math.ceil(q.length / 40)))
      }
    })

    const response = Crypto.get<
      {
        word: string
        weight: number
      }[]
    >(data)
    return response.map(item => [item.word, item.weight.toFixed(0)]) as [string, string][]
  } catch (error) {
    err('extract', error)
  }

  return null
}

/** 收藏排名 */
export async function collectRank(count: number = 300) {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  try {
    const { data } = await axios({
      method: 'post',
      url: `${HOST}/v1/collect/rank`,
      headers: HEADERS,
      data: {
        // startTime: dayjs().subtract(30, 'day').unix(),
        // endTime: dayjs().unix(),
        // startsWith,
        count
      }
    })

    return Crypto.get<Result>(data)
  } catch (error) {
    err('collectRank', error)
  }

  return null
}

/** 收藏排名 */
export async function list(count: number = 100) {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  try {
    const { data } = await axios({
      method: 'post',
      url: `${HOST}/v1/collect/rank`,
      headers: HEADERS,
      data: {
        // startTime: dayjs().subtract(30, 'day').unix(),
        // endTime: dayjs().unix(),
        // startsWith,
        count
      }
    })

    return Crypto.get<Result>(data)
  } catch (error) {
    err('list', error)
  }

  return null
}

export async function lx(text: string, advance?: boolean): Promise<false | TranslateResult> {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  // 云缓存, 因每个月免费翻译额度有限, 避免过多调用
  const q = text.split('\r\n').join('\n')
  const k = `fanyi_glm_${hash(q)}`
  const cache = await get(k)
  if (Array.isArray(cache?.data) && cache.data.length) return cache.data

  const responseText = await completions(
    '你是一位擅长自然语言表达的日语到中文翻译，请让译文自然流畅、符合中文口语习惯，但不要添加解释或注释。',
    '',
    text,
    advance
  )
  if (typeof responseText !== 'string' || !responseText.trim().length) return false

  const response = responseText.trim()
  const transResult =
    // splitAndKeepPunctuation(response)
    [response].map(item => ({
      src: '',
      dst: item
    }))
  setTimeout(() => {
    update(k, {
      data: transResult
    })
  }, 0)

  return transResult
}

export async function completions(
  prompt: string,
  roleSystem: string,
  roleUser: string,
  advance?: boolean
) {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  try {
    if (advance) {
      const version = await get('completions_v')
      if (version === '2') return c2(prompt, roleSystem, roleUser)
    }

    const response = await axios({
      method: 'post',
      url: HOST_COMPLETIONS,
      headers: {
        ...HEADERS,
        'Content-Type': 'application/json'
      },
      data: {
        messages: [
          {
            role: 'system',
            content: `${prompt}${roleSystem}`
          },
          {
            role: 'user',
            content: roleUser
          }
        ],
        temperature: 1.2
      }
    })

    const text = response?.data?.choices?.[0]?.message?.content || ''
    return text
  } catch (error) {
    return ''
  }
}

async function c2(prompt: string, roleSystem: string, roleUser: string) {
  if (!userAgent) userAgent = await Constants.getWebViewUserAgentAsync()

  try {
    const response = await axios({
      method: 'post',
      url: HOST_C2,
      headers: {
        ...JSON.parse(HOST_C2_CONFIG),
        'User-Agent': userAgent
      },
      data: {
        messages: [
          {
            role: 'system',
            content: `${prompt}${roleSystem}`
          },
          {
            role: 'user',
            content: roleUser
          }
        ],
        temperature: 1.2,
        model: 'gemini-2.0-flash-exp',
        stream: false
      }
    })

    const text = response?.data?.choices?.[0]?.message?.content || ''
    return text
  } catch (error) {
    return ''
  }
}

export async function picList(prefix: string, maxKeys: number = 100): Promise<ResultPicList> {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  try {
    const { data } = await axios({
      method: 'get',
      url: `${HOST_PIC_LIST}?prefix=${decodeURIComponent(prefix)}&maxKeys=${maxKeys}`
    })

    if (data?.success && Array.isArray(data?.files) && data.files.length) {
      return data.files
    }
  } catch (error) {}

  return null
}

export async function heatmap(username: UserId): Promise<false | ResultHeatmap> {
  if (!userAgent) userAgent = await Constants.getWebViewUserAgentAsync()

  try {
    const response = await axios({
      method: 'get',
      url: `${HOST_HM}/${username}`,
      headers: {
        'User-Agent': userAgent
      }
    })

    return response?.data
  } catch (error) {
    return false
  }
}
