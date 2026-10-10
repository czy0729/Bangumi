/*
 * @Author: czy0729
 * @Date: 2024-05-14 06:15:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 11:00:00
 *
 * 半月刊远端数据请求
 */
import { axios } from '@utils/thirdParty'
import { URL_SOURCE } from './ds'

import type { Data } from './types'

/** 拉取远端数据 */
export async function getData(): Promise<Data> {
  try {
    const { data }: { data: unknown } = await axios({
      method: 'get',
      url: URL_SOURCE
    })
    if (Array.isArray(data)) return data as Data
  } catch {}

  return []
}
