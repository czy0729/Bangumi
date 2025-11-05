/*
 * @Author: czy0729
 * @Date: 2024-05-27 10:43:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-27 11:00:19
 */
import { computed } from 'mobx'
import { systemStore, timelineStore, userStore } from '@stores'
import { x18 } from '@utils'
import { IOS, URL_DEFAULT_AVATAR } from '@constants'
import { TimeLineScope, TimeLineType } from '@types'
import { TABS } from '../ds'
import { TabLabel } from '../types'
import State from './state'

export default class Computed extends State {
  /** Tab navigationState */
  @computed get navigationState() {
    return {
      index: this.state.page,
      routes: TABS
    }
  }

  /**
   * 筛选逻辑
   *  - 主动设置屏蔽默认头像用户相关信息
   *  - 主动设置屏蔽 18x
   *  - 限制用户群体 (iOS 的游客和审核员) 强制屏蔽默认头像用户和 18x
   */
  timeline(scope: TimeLineScope, type: TimeLineType) {
    return computed(() => {
      const timeline = timelineStore.timeline(scope, type)
      let { list } = timeline
      if (systemStore.setting.filterDefault || systemStore.setting.filter18x || userStore.isLimit) {
        list = list.filter(item => {
          if (
            (systemStore.setting.filterDefault || userStore.isLimit) &&
            item.avatar?.src?.includes(URL_DEFAULT_AVATAR)
          ) {
            return false
          }

          if ((systemStore.setting.filter18x || userStore.isLimit) && item?.p3?.url?.[0]) {
            const url = String(item.p3.url[0])
            if (url.match(/\/subject\/\d+/)) return !x18(url.replace('https://bgm.tv/subject/', ''))
          }

          return true
        })
      }

      return {
        ...timeline,
        list: list.map((item, index) => ({
          ...item,
          date: index === 0 || list[index - 1]?.date !== item.date ? item.date : ''
        }))
      }
    }).get()
  }

  /** 是否渲染 Item */
  showItem(title: TabLabel) {
    return computed(() => {
      if (!IOS) return true

      const index = TABS.findIndex(item => item.title === title)
      return this.state.renderedTabsIndex.includes(index)
    }).get()
  }
}
