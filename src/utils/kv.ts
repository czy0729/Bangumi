/*
 * @Author: czy0729
 * @Date: 2022-06-23 01:47:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-23 02:26:33
 */
import axios from '@utils/thirdParty/axios'
import { getTimestamp } from './utils'

export async function get(key: string) {
  // @ts-ignore
  const { data } = await axios({
    method: 'get',
    url: `https://bangumi-app-db.5t5.top/v1/get/${key}`
  })

  if (data?.code === 200) return data?.data

  return null
}

export async function update(key: string, value: object) {
  // @ts-ignore
  const { data } = await axios({
    method: 'post',
    url: 'https://bangumi-app-db.5t5.top/v1/update',
    data: {
      key,
      value: {
        ...value,
        ts: getTimestamp()
      }
    }
  })

  return data
}
