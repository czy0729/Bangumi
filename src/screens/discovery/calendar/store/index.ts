/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-01 21:52:50
 */
import { calendarStore } from '@stores'
import { queue } from '@utils/fetch'
import { get } from '@utils/thirdParty/protobuf'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, RESET_STATE } from './ds'

import type { STATE } from './ds'

export default class ScreenCalendar extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      loadedBangumiData: !!get('bangumi-data')?.length,
      _loaded: true
    })

    try {
      await queue(
        [
          () => calendarStore.fetchOnAir(),
          () => calendarStore.fetchCalendar(),
          () => this.fetchBangumiData(),
          () => this.fetchCollectionsQueue()
        ],
        1
      )
    } catch {}

    // 请求完成后检查是否换季后放送数据缺失, 即使请求失败也有本地缓存可判定
    this.checkAirTimeMissing()
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
