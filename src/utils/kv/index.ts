/*
 * OSS 快照
 * @Author: czy0729
 * @Date: 2022-06-23 01:47:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-03 02:49:27
 */
import axios from '@utils/thirdParty/axios'
import { STORYBOOK } from '@constants/device'
import { DEV } from '@/config'
import { getTimestamp } from '../utils'
import hash from '../thirdParty/hash'
import { HOST, UPDATE_CACHE_MAP } from './ds'
import { Result, ResultTemp } from './type'

/** 获取 */
export async function get(key: string): Promise<any> {
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

  if (data?.code === 200) return data?.data

  return null
}

/** 更新 */
export async function update(
  key: string,
  value: object,
  updateTS: boolean = true,
  test?: boolean
): Promise<Result> {
  if (STORYBOOK && !test) return

  const finger = hash(
    JSON.stringify({
      key,
      value,
      updateTS
    })
  ).slice(0, 4)
  if (UPDATE_CACHE_MAP.has(finger)) return

  UPDATE_CACHE_MAP.set(finger, true)
  if (DEV) console.info('update', key, finger)

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
  return `${HOST}/v1/temp/download/${downloadKey}`
}

/** 搜索 */
export async function search(q: string, withMessage: boolean = false) {
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
