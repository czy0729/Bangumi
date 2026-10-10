/*
 * @Author: czy0729
 * @Date: 2024-08-09 03:15:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 日志派生
 */
import { computed } from 'mobx'
import { discoveryStore, userStore } from '@stores'
import { x18s } from '@utils'
import { computedFn } from '@utils/computed-fn'
import { TABS } from '../ds'
import State from './state'

import type { BlogType } from '../types'

export default class Computed extends State {
  /** 当前标签页 key */
  @computed get type() {
    return TABS[this.state.page]?.key || 'all'
  }

  /** 全站日志 */
  blog = computedFn((type: BlogType) => {
    const blog = discoveryStore.blog(type, this.state.currentPage[type])
    if (userStore.isLimit) {
      return {
        ...blog,
        list: blog.list.filter(item => !x18s(item.title))
      }
    }
    return blog
  })
}
