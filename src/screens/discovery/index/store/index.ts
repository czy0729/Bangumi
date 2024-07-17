/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-17 03:46:04
 */
import { calendarStore, usersStore, userStore } from '@stores'
import { getTimestamp } from '@utils'
import { queue } from '@utils/fetch'
import { D, H6, STORYBOOK } from '@constants'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

class ScreenDiscovery extends Action {
  init = async () => {
    const state = (await this.getStorage(NAMESPACE)) || {}
    const { showBlockTrain } = state
    this.setState({
      showBlockTrain,
      ...EXCLUDE_STATE
    })

    setTimeout(() => {
      queue([
        () => {
          if (STORYBOOK) return true

          return this.fetchOnline()
        },
        () => {
          if (userStore.isWebLogin) return this.fetchChannel()

          return true
        },
        async () => {
          await calendarStore.init('onAir')
          const { _loaded } = this.onAir
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
          if (STORYBOOK) return true

          return usersStore.fetchUsers()
        }
      ])
    }, 800)

    return calendarStore.fetchHome()
  }
}

export default ScreenDiscovery
