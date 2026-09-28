/*
 * @Author: czy0729
 * @Date: 2024-07-17 03:41:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 05:19:21
 *
 * 发现页数据请求: 在线人数 / 频道聚合 / 放送数据初始化编排与随机首页数据
 */
import { calendarStore, discoveryStore, usersStore, userStore } from '@stores'
import { appRandom, getTimestamp } from '@utils'
import { queue } from '@utils/fetch'
import { D, H6, WEB } from '@constants'
import Computed from './computed'

import type { SubjectType } from '@types'

export default class Fetch extends Computed {
  /** 在线人数 */
  fetchOnline = () => {
    return discoveryStore.fetchOnline()
  }

  /** 频道聚合（用于获取好友时间线）*/
  fetchChannel = (type: SubjectType = 'anime') => {
    return discoveryStore.fetchChannel(type)
  }

  /** 初始化请求 */
  initFetch = async () => {
    setTimeout(() => {
      // 仅用于错峰编排请求, 各回调返回值不消费
      queue<unknown>([
        () => {
          if (WEB) return true

          return this.fetchOnline()
        },
        () => {
          if (!userStore.isWebLogin) return true

          return this.fetchChannel()
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
            } catch {}
          }

          await calendarStore.fetchCalendar()
          return true
        },
        () => {
          if (WEB) return true

          return usersStore.fetchUsers()
        }
      ])
    }, 800)

    await calendarStore.fetchHome()
    this.updateRandomHome()
  }

  /** 更新随机打乱的首页数据 */
  updateRandomHome = async () => {
    const { home } = calendarStore
    if (!home?.anime?.length) return false

    this.setState({
      randomHome: {
        anime: appRandom(home.anime, 'info'),
        book: appRandom(home.book, 'info'),
        game: appRandom(home.game, 'info'),
        music: appRandom(home.music, 'info'),
        real: appRandom(home.real, 'info')
      }
    })
    this.save()

    return true
  }
}
