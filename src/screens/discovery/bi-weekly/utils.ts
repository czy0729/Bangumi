/*
 * @Author: czy0729
 * @Date: 2024-05-14 06:15:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-29 07:16:50
 */
import { axios } from '@utils/thirdParty'
import { URL_SOURCE } from './ds'

import type { Data } from './types'

export async function getData(): Promise<Data> {
  try {
    const { data } = await axios({
      method: 'get',
      url: URL_SOURCE
    })
    if (Array.isArray(data)) return data
  } catch {}

  return []
}
