/*
 * @Author: czy0729
 * @Date: 2022-06-23 01:47:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-05 05:21:42
 */
import axios from '@utils/thirdParty/axios'
import { WEB } from '@constants/device'
import { TranslateResult } from '@types'
import { isDevtoolsOpen } from '../dom'
import hash from '../thirdParty/hash'
import { getTimestamp } from '../utils'
import { Result, ResultCollectList, ResultTemp } from './type'
import { log } from './utils'
import { HOST, HOST_COMPLETIONS, HOST_LX, UPDATE_CACHE_MAP } from './ds'

/** 获取 */
export async function get(key: string): Promise<any> {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  // 部分没有登录的用户, 出现了预料之外的请求, 统一过滤掉
  if (typeof key !== 'string' || /["//]/.test(key)) return Promise.reject('denied')

  // @ts-expect-error
  const { data } = await axios({
    method: 'get',
    url: `${HOST}/v1/get/${key}`
  })

  if (data?.code === 200) return data?.data

  return null
}

/** 批量获取 */
export async function gets(keys: string[], picker?: string[]): Promise<Result> {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  const query = {
    method: 'post',
    url: `${HOST}/v1/get`,
    data: {
      keys
    } as {
      keys: string[]
      picker?: string[]
    }
  }
  if (Array.isArray(picker)) query.data.picker = picker

  // @ts-expect-error
  const { data } = await axios(query)

  if (data?.code === 200) {
    log('gets', keys)
    return data?.data
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
): Promise<Result> {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  if (WEB && !allowWebCommit) return

  const fingerValue = {
    key,
    value:
      typeof value === 'string'
        ? value
        : {
            ...value,
            _loaded: true
          },
    updateTS
  }

  if (fingerCheck) {
    const finger = hash(JSON.stringify(fingerValue)).slice(0, 4)
    if (UPDATE_CACHE_MAP.has(finger)) return

    UPDATE_CACHE_MAP.set(finger, true)
    log('update', key, finger)
  } else {
    log('update', key)
  }

  // @ts-expect-error
  const { data } = await axios({
    method: 'post',
    url: `${HOST}/v1/update`,
    data: {
      key,
      value:
        typeof value === 'string'
          ? value
          : updateTS
          ? {
              ...value,
              ts: getTimestamp()
            }
          : {
              ts: getTimestamp(),
              ...value
            }
    }
  })

  return data
}

/** 查询在线 */
export async function onlines(): Promise<Result> {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  // @ts-expect-error
  const { data } = await axios({
    method: 'get',
    url: `${HOST}/v1/online/get`
  })

  if (data?.code === 200) return data?.data

  return null
}

/** 在线上报 */
export async function report(userID: string | number): Promise<Result> {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  // @ts-expect-error
  const { data } = await axios({
    method: 'post',
    url: `${HOST}/v1/online/report`,
    data: {
      userID
    }
  })

  return data
}

/** 是否收藏 */
export async function is(userID: string | number, topicID: string): Promise<Result> {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  // @ts-expect-error
  const { data } = await axios({
    method: 'get',
    url: `${HOST}/v1/collect/user/is?topicID=${topicID}&userID=${userID}`
  })

  return data
}

/** 收藏 */
export async function collect(
  userID: string | number,
  topicID: string,
  value: boolean = true
): Promise<Result> {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  // @ts-expect-error
  const { data } = await axios({
    method: 'post',
    url: `${HOST}/v1/collect/user/update`,
    data: {
      topicID,
      userID,
      collect: value
    }
  })

  return data
}

/** 所有收藏 */
export async function collectList(userID: string | number): Promise<ResultCollectList> {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  // @ts-expect-error
  const { data } = await axios({
    method: 'get',
    url: `${HOST}/v1/collect/user/list?userID=${userID}`
  })

  return data
}

/** 临时文件 */
export async function temp(
  fileName: string,
  fileContent: string,
  fileExpire?: -1 | undefined
): Promise<ResultTemp> {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  // @ts-expect-error
  const { data } = await axios({
    method: 'post',
    url: `${HOST}/v1/temp/upload`,
    data: {
      fileName,
      fileContent,
      fileExpire
    }
  })

  return data
}

/** 下载文件 */
export function download(downloadKey: string) {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  return `${HOST}/v1/temp/download/${downloadKey}`
}

/** 搜索 */
export async function search(q: string, withMessage: boolean = false) {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  // @ts-expect-error
  const { data } = await axios({
    method: 'post',
    url: `${HOST}/v1/topic/search`,
    data: {
      search: q,
      withMessage
    }
  })

  return data
}

/**
 * 分词
 * @returns [关键词, 权重整数数字的字符串][]
 * */
export async function extract(q: string) {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  // @ts-expect-error
  const { data } = await axios({
    method: 'post',
    url: `${HOST}/v1/jieba/extract`,
    data: {
      sentence: q,
      threshold: Math.max(10, Math.min(80, Math.ceil(q.length / 40)))
    }
  })

  return (
    data as {
      word: string
      weight: number
    }[]
  ).map(item => [item.word, item.weight.toFixed(0)]) as [string, string][]
}

/** 收藏排名 */
export async function collectRank(count: number = 300) {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  // @ts-expect-error
  const { data } = await axios({
    method: 'post',
    url: `${HOST}/v1/collect/rank`,
    data: {
      // startTime: dayjs().subtract(30, 'day').unix(),
      // endTime: dayjs().unix(),
      // startsWith,
      count
    }
  })

  return data
}

/** 收藏排名 */
export async function list(count: number = 100) {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  // @ts-expect-error
  const { data } = await axios({
    method: 'post',
    url: `${HOST}/v1/collect/rank`,
    data: {
      // startTime: dayjs().subtract(30, 'day').unix(),
      // endTime: dayjs().unix(),
      // startsWith,
      count
    }
  })

  return data
}

export async function lx(text: string): Promise<false | TranslateResult> {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  // 云缓存, 因每个月免费翻译额度有限, 避免过多调用
  const q = text.split('\r\n').join('\n')
  const k = `fanyi_lx_${hash(q)}`
  const cache = await get(k)
  if (Array.isArray(cache?.data) && cache.data.length) return cache.data

  // @ts-expect-error
  const { data } = await axios({
    method: 'post',
    url: HOST_LX,
    data: {
      text,
      source_lang: 'JP',
      target_lang: 'ZH'
    }
  })

  if (!Array.isArray(data?.alternatives)) return false

  const response: string = data.alternatives?.[0] || ''
  if (!response.length) return false

  const transResult = splitAndKeepPunctuation(response).map(item => ({
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

export async function completions(prompt: string, roleSystem: string, roleUser: string) {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  try {
    // @ts-expect-error
    const response = await axios({
      method: 'post',
      url: HOST_COMPLETIONS,
      headers: {
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
    console.info('completions', text)

    return text
  } catch (error) {
    return ''
  }
}

function splitAndKeepPunctuation(str: string) {
  // 首先，使用正则表达式分割字符串，保留分隔符
  const parts = str.split(/(。|！|？)/)
  const result = []

  for (let i = 0; i < parts.length; i++) {
    // 如果是分隔符，将前一个元素和分隔符合并，然后添加到结果数组
    if (['。', '！', '？'].includes(parts[i])) {
      if (result.length > 0) {
        result[result.length - 1] += parts[i]
      }
    } else {
      // 如果不是分隔符，直接添加到结果数组
      result.push(parts[i])
    }
  }

  return result
}
