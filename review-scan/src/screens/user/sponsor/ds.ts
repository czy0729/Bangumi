/*
 * @Author: czy0729
 * @Date: 2022-09-07 14:38:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-10 12:10:48
 */
import { desc } from '@utils'
import advanceJSON from '@assets/json/advance.json'
import USERS_MAP from '@assets/json/user.json'

export { USERS_MAP }

export const COMPONENT = 'Sponsor'

export const LIST = Object.entries(advanceJSON)
  .filter(([, value]) => !(value != 1 && typeof value !== 'string'))
  .map(([key, value]) => {
    const item = String(value)
    if (item === '1') {
      return {
        data: key,
        weight: 10
      }
    }

    const [, weight] = item.split('|')
    // weight = Number(weight)
    // if (weight >= 300) {
    //   weight = 300
    // } else if (weight >= 200) {
    //   weight = 200
    // } else if (weight >= 100) {
    //   weight = 100
    // } else if (weight >= 50) {
    //   weight = 50
    // }

    return {
      data: key,
      weight: Number(weight)
    }
  })
  .sort((a, b) => desc(a.weight, b.weight))

/** 过滤比例 */
export const FILTER_RATE = 0.002
