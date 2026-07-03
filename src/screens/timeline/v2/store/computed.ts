/*
 * @Author: czy0729
 * @Date: 2024-05-27 10:43:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-03 20:38:15
 */
import { computed } from 'mobx'
import { systemStore, timelineStore, userStore } from '@stores'
import { computedFn } from '@utils/computed-fn'
import { IOS } from '@constants'
import { TABS } from '../ds'
import { deduplicateDates, filter18xContent, filterDefaultAvatar } from './utils'
import State from './state'

import type { TimeLineScope, TimeLineType } from '@types'
import type { TabLabel } from '../types'

export default class Computed extends State {
  /** Tab navigationState */
  @computed get navigationState() {
    return {
      index: this.state.page,
      routes: TABS
    } as const
  }

  /**
   * 筛选逻辑 (使用 computedFn 缓存，相同参数不重复计算)
   *  - 主动设置屏蔽默认头像用户相关信息
   *  - 主动设置屏蔽 18x
   *  - 限制用户群体 (iOS 的游客和审核员) 强制屏蔽默认头像用户和 18x
   */
  timeline = computedFn((scope: TimeLineScope, type: TimeLineType) => {
    const timeline = timelineStore.timeline(scope, type)
    let { list } = timeline

    const { filterDefault, filter18x } = systemStore.setting
    const needFilter = filterDefault || filter18x || userStore.isLimit

    if (needFilter) {
      list = list.filter(item => {
        // 过滤默认头像用户
        if ((filterDefault || userStore.isLimit) && !filterDefaultAvatar(item)) {
          return false
        }

        // 过滤 18x 内容
        if ((filter18x || userStore.isLimit) && !filter18xContent(item)) {
          return false
        }

        return true
      })
    }

    return {
      ...timeline,
      list: deduplicateDates(list)
    }
  })

  /** 是否渲染 Item */
  showItem = computedFn((title: TabLabel) => {
    if (!IOS) return true

    const index = TABS.findIndex(item => item.title === title)
    return this.state.renderedTabsIndex.includes(index)
  })
}
