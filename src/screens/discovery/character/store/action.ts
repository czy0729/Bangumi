/*
 * @Author: czy0729
 * @Date: 2024-12-03 15:39:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-18 21:13:24
 */
import { updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import Fetch from './fetch'

import type { ScrollToOffset } from '@components'

export default class Action extends Fetch {
  scrollToOffset: ScrollToOffset = null

  forwardRef = (ref: { scrollToOffset: ScrollToOffset }) => {
    if (ref?.scrollToOffset) this.scrollToOffset = ref.scrollToOffset
  }

  /** 标签页切换 */
  onChange = (page: number) => {
    if (page === this.state.page) return

    this.setState({
      page
    })

    if (!this.list(this.id)._loaded) this.fetchList(this.id, true)

    t('收藏的人物.标签页切换')
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
