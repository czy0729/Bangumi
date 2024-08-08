/*
 * @Author: czy0729
 * @Date: 2024-08-09 03:15:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-09 04:37:31
 */
import { computed } from 'mobx'
import { discoveryStore, userStore } from '@stores'
import { x18s } from '@utils'
import { TABS } from '../ds'
import { BlogType } from '../types'
import State from './state'

export default class Computed extends State {
  get type() {
    return TABS[this.state.page].key || 'all'
  }

  /** 全站日志 */
  blog(type: BlogType) {
    return computed(() => {
      const blog = discoveryStore.blog(type, this.state.currentPage[type])
      if (userStore.isLimit) {
        return {
          ...blog,
          list: blog.list.filter(item => !x18s(item.title))
        }
      }
      return blog
    }).get()
  }
}
