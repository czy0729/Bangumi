/*
 * @Author: czy0729
 * @Date: 2022-09-07 14:38:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 11:31:14
 */
import { desc } from '@utils'
import DS from '@assets/json/advance.json'
import USERS_MAP from '@assets/json/user.json'
import { Loaded } from '@types'

export { USERS_MAP }

export const STATE = {
  list: true,
  _loaded: false as Loaded
}

export const LIST = Object.keys(DS)
  .map(key => {
    const item = DS[key]
    if (item == 1) {
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
export const FILTER_RATE = 0.005
