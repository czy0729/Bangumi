/*
 * @Author: czy0729
 * @Date: 2024-07-17 03:41:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-17 03:42:49
 */
import { discoveryStore } from '@stores'
import { queue } from '@utils/fetch'
import { SUBJECT_TYPE } from '@constants'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 在线人数 */
  fetchOnline = () => {
    return discoveryStore.fetchOnline()
  }

  /** 频道聚合 */
  fetchChannel = () => {
    return queue(
      SUBJECT_TYPE.map(
        item => () =>
          discoveryStore.fetchChannel({
            type: item.label
          })
      ),
      1
    )
  }
}
