/*
 * @Author: czy0729
 * @Date: 2025-09-06 20:51:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-28 01:11:50
 */
import { axios } from '@utils/thirdParty'
import { HOST_DOGE } from '@constants/cdn'

import type { Advance } from './types'

export async function getData() {
  try {
    const { data } = await axios<Record<string, Advance>>({
      method: 'get',
      url: `${HOST_DOGE}/advance.json`
    })
    if (data && typeof data === 'object') return data
  } catch {}

  return {}
}
