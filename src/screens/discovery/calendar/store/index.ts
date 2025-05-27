/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-20 17:36:30
 */
import { calendarStore } from '@stores'
import { queue } from '@utils/fetch'
import { get } from '@utils/protobuf'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, RESET_STATE, STATE } from './ds'

export default class ScreenCalendar extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      loadedBangumiData: !!get('bangumi-data')?.length,
      _loaded: true
    })

    return queue(
      [
        () => calendarStore.fetchOnAir(),
        () => calendarStore.fetchCalendar(),
        () => this.fetchBangumiData(),
        () => this.fetchCollectionsQueue()
      ],
      1
    )
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
