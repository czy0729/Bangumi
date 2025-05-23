/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-30 08:03:58
 */
import { calendarStore, usersStore, userStore } from '@stores'
import { getTimestamp } from '@utils'
import { queue, withT } from '@utils/fetch'
import { D, H6, WEB } from '@constants'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

export default class ScreenDiscovery extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    setTimeout(() => {
      queue([
        () => {
          if (WEB) return true

          return this.fetchOnline()
        },
        () => {
          if (userStore.isWebLogin) return this.fetchChannel()

          return true
        },
        async () => {
          await calendarStore.init('onAir')
          const { _loaded } = calendarStore.onAir
          if (getTimestamp() - Number(_loaded || 0) < D) return true

          return calendarStore.fetchOnAir()
        },
        async () => {
          await calendarStore.init('calendar')
          const { list, _loaded } = calendarStore.calendar
          if (getTimestamp() - Number(_loaded || 0) < H6) {
            try {
              // 出现过成功请求过数据, 但是里面全为空的奇怪情况
              if (list.length && !list.every(item => item.items.length === 0)) {
                return true
              }
            } catch (error) {}
          }

          return calendarStore.fetchCalendar()
        },
        () => {
          if (WEB) return true

          return usersStore.fetchUsers()
        }
      ])
    }, 800)

    return calendarStore.fetchHome()
  }

  onHeaderRefresh = withT(() => {
    return queue([
      () => this.fetchOnline(),
      () => calendarStore.fetchOnAir(true),
      () => calendarStore.fetchCalendar(),
      () => calendarStore.fetchHome()
    ])
  }, '发现.下拉刷新')
}
