/*
 * @Author: czy0729
 * @Date: 2024-08-21 17:14:13
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-08-21 17:14:13
 *
 * 新番档期交互: 切换目录编纂者 / 下拉刷新与滚动
 */
import { updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import Fetch from './fetch'
import { RESET_STATE } from './ds'

import type { ScrollToOffset } from '@components'
import type { UserId } from '@types'

export default class Action extends Fetch {
  /** 列表滚动方法 (连接列表后可用) */
  scrollToOffset: ScrollToOffset = null

  /** 连接页面列表 */
  forwardRef = (ref: { scrollToOffset: ScrollToOffset }) => {
    this.scrollToOffset = ref?.scrollToOffset ?? null
  }

  /** 切换目录编纂者 */
  onUserSelect = (userId: UserId) => {
    if (userId === this.userId) return

    this.setState({
      userId,
      ...RESET_STATE
    })
    this.save()

    this.scrollToOffset?.({
      offset: 0,
      animated: false
    })

    this.fetchCatalogs(true)
    t('新番档期.切换用户', {
      userId
    })
  }

  /** 下拉刷新 */
  onHeaderRefresh = () => {
    return this.fetchCatalogs(true)
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
