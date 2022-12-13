/*
 * OSS 快照
 *
 * @Author: czy0729
 * @Date: 2022-06-23 01:47:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-12-13 16:23:53
 */
import axios from '@utils/thirdParty/axios'
import { getTimestamp } from '../utils'
import { HOST } from './ds'
import { Result, ResultTemp } from './type'

/** 获取 */
export async function get(key: string): Promise<Result> {
  // @ts-ignore
  const { data } = await axios({
    method: 'get',
    url: `${HOST}/v1/get/${key}`
  })

  if (data?.code === 200) return data?.data

  return null
}

/** 批量获取 */
export async function gets(keys: string[]): Promise<Result> {
  // @ts-ignore
  const { data } = await axios({
    method: 'post',
    url: `${HOST}/v1/get`,
    data: {
      keys
    }
  })

  if (data?.code === 200) return data?.data

  return null
}

/** 更新 */
export async function update(
  key: string,
  value: object,
  updateTS: boolean = true
): Promise<Result> {
  // @ts-ignore
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
  // @ts-ignore
  const { data } = await axios({
    method: 'get',
    url: `${HOST}/v1/online/get`
  })

  if (data?.code === 200) return data?.data

  return null
}

/** 在线上报 */
export async function report(userID: string | number): Promise<Result> {
  // @ts-ignore
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
  // @ts-ignore
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
  // @ts-ignore
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
  // @ts-ignore
  const { data } = await axios({
    method: 'get',
    url: `${HOST}/v1/collect/user/list?userID=${userID}`
  })

  return data
}

/** 临时文件 */
export async function temp(fileName: string, fileContent: string): Promise<ResultTemp> {
  // @ts-ignore
  const { data } = await axios({
    method: 'post',
    url: `${HOST}/v1/temp/upload`,
    data: {
      fileName,
      fileContent
    }
  })

  return data
}

/** 下载文件 */
export function download(downloadKey: string) {
  return `${HOST}/v1/temp/download/${downloadKey}`
}
