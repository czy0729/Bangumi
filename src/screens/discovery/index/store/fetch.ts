/*
 * @Author: czy0729
 * @Date: 2024-07-17 03:41:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-17 03:42:49
 */
import { discoveryStore } from '@stores'
import Computed from './computed'

import type { SubjectType } from '@types'

export default class Fetch extends Computed {
  /** 在线人数 */
  fetchOnline = () => {
    return discoveryStore.fetchOnline()
  }

  /** 频道聚合（用于获取好友时间线）*/
  fetchChannel = (type: SubjectType = 'anime') => {
    return discoveryStore.fetchChannel({
      type
    })
  }
}
