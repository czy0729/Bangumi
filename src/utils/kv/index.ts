/*
 * @Author: czy0729
 * @Date: 2022-06-23 01:47:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-13 21:07:04
 */
import axios from '@utils/thirdParty/axios'
import { STORYBOOK } from '@constants/device'
import { isDevtoolsOpen } from '../dom'
import hash from '../thirdParty/hash'
import { getTimestamp } from '../utils'
import { Result, ResultTemp } from './type'
import { log } from './utils'
import { HOST, UPDATE_CACHE_MAP } from './ds'

/** 获取 */
export async function get(key: string): Promise<any> {
  if (isDevtoolsOpen()) return Promise.reject('denied')

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
  allowWebCommit: boolean = false
): Promise<Result> {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  if (STORYBOOK && !allowWebCommit) return

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
  const finger = hash(JSON.stringify(fingerValue)).slice(0, 4)
  if (UPDATE_CACHE_MAP.has(finger)) return

  UPDATE_CACHE_MAP.set(finger, true)
  log('update', key, finger)

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
export async function collectList(userID: string | number): Promise<Result> {
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
