/*
 * @Author: czy0729
 * @Date: 2024-08-20 14:49:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 频道操作: 条目类型切换 / 滚动
 */
import { updateVisibleBottom } from '@utils'
import Fetch from './fetch'
import { EXCLUDE_STATE } from './ds'

import type { ScrollTo } from '@components'
import type { SubjectType } from '@types'

export default class Action extends Fetch {
  /** 页面滚动方法 (连接 ScrollView 后可用) */
  private _scrollTo: ScrollTo | null = null

  /** 连接页面 ScrollView */
  forwardRef = (scrollTo: ScrollTo | null) => {
    this._scrollTo = scrollTo
  }

  /** 滚动到顶部 */
  scrollToTop = (animated: boolean = true) => {
    this._scrollTo?.({ y: 0, animated })
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)

  /** 切换条目类型 */
  toggleType = (type: SubjectType) => {
    this.setState({
      type,
      visibleBottom: EXCLUDE_STATE.visibleBottom
    })
    this.fetchChannel()
    this.scrollToTop()
  }
}
