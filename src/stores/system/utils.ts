/*
 * @Author: czy0729
 * @Date: 2025-09-06 20:51:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-29 07:22:57
 */
import { axios } from '@utils/thirdParty'
import { HOST_DOGE } from '@constants/cdn'

export async function getData() {
  try {
    const { data } = await axios({
      method: 'get',
      url: `${HOST_DOGE}/advance.json`
    })
    if (data && typeof data === 'object') return data
  } catch {}

  return {}
}
