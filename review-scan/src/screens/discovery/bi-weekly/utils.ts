/*
 * @Author: czy0729
 * @Date: 2024-05-14 06:15:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-14 06:16:51
 */
import axios from '@utils/thirdParty/axios'
import { URL_SOURCE } from './ds'

export async function getData() {
  try {
    // @ts-expect-error
    const { data } = await axios({
      method: 'get',
      url: URL_SOURCE
    })
    if (Array.isArray(data)) return data

    return []
  } catch (error) {}

  return []
}
