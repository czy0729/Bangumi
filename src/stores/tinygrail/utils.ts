/*
 * @Author: czy0729
 * @Date: 2021-03-06 16:26:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-02 10:32:08
 */
import { ToastAndroid } from 'react-native'
import { getTimestamp, throttle, titleCase, toFixed } from '@utils'
import { info } from '@utils/ui'
import { IOS } from '@constants'
import { INIT_CHARACTERS_ITEM } from './init'

/**
 * 计算角色当前股息
 *  - version 2021/03/05
 *
 * @param {*} rate
 * @param {*} rank
 * @param {*} stars
 */
export function calculateRate(rate = 0, rank = 0, stars = 0) {
  if (rank < 501 && rate > 0) return (601 - rank) * 0.005 * rate
  return stars * 2
}

function _info(message) {
  info(message, 0.4)
}

/**
 * 批量请求时用的提示
 * @param {*} message
 */
export const throttleInfo = throttle(_info, IOS ? 400 : ToastAndroid.SHORT)

const defaultToCharacterKeys = Object.keys(INIT_CHARACTERS_ITEM)

/**
 * 把服务器的返回结果后处理成APP内使用的结构
 */
export function toCharacter(item, keys = defaultToCharacterKeys) {
  const data = {
    _loaded: getTimestamp()
  }
  keys.forEach(key => {
    const _key = titleCase(key)
    switch (key) {
      case 'fluctuation':
        data[key] = item[_key] ? Number(toFixed((item[_key] || 0) * 100, 2)) : 0
        break

      case 'rate':
        data[key] = Number(toFixed(item[_key] || 0, 2))
        break

      case 'sa':
        data[key] = item.Sacrifices
        break

      case 'monoId':
        data[key] = item.CharacterId || item.Id
        break

      default:
        data[key] = item[_key] || INIT_CHARACTERS_ITEM[key]
        break
    }
  })
  return data
}
