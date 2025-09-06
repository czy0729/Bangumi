/*
 * @Author: czy0729
 * @Date: 2025-09-06 20:51:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-06 21:04:39
 */
import axios from '@utils/thirdParty/axios'
import { HOST_DOGE } from '@constants/cdn'

export async function getData() {
  try {
    // @ts-expect-error
    const { data } = await axios({
      method: 'get',
      url: `${HOST_DOGE}/advance.json`
    })
    if (data && typeof data === 'object') return data
  } catch (error) {}

  return {}
}
