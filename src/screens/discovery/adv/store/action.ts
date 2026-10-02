/*
 * @Author: czy0729
 * @Date: 2024-07-14 15:53:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-14 16:05:16
 *
 * 找 Gal 用户操作
 */
import { otaStore } from '@stores'
import { updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import Fetch from './fetch'

import type { ScrollToOffset } from '@components'
import type { FilterType } from '../types'

export default class Action extends Fetch {
  /**
   * 筛选选择
   *
   * @param type 筛选维度
   * @param value 筛选值
   */
  onSelect = (type: FilterType, value: string) => {
    this.setState({
      query: {
        ...this.state.query,
        [type]: value
      }
    })

    setTimeout(() => {
      this.search()
      this.save()

      t('ADV.选择', {
        type,
        value
      })
    }, 0)
  }

  scrollToOffset: ScrollToOffset = null

  forwardRef = (ref: { scrollToOffset: ScrollToOffset }) => {
    if (ref?.scrollToOffset) this.scrollToOffset = ref.scrollToOffset
  }

  /** 到顶 */
  scrollToTop = () => {
    if (typeof this.scrollToOffset === 'function') {
      this.scrollToOffset({
        offset: 0,
        animated: true
      })

      t('ADV.到顶')
    }
  }

  /** 切换布局 */
  switchLayout = () => {
    const value = this.isList ? 'grid' : 'list'
    this.setState({
      layout: value
    })
    this.save()

    t('ADV.切换布局', {
      layout: value
    })
  }

  /** 展开 */
  onExpand = () => {
    this.setState({
      expand: !this.state.expand
    })
    this.save()
  }

  /** 加载下一页 */
  onPage = (pageData: number[], page: number) => {
    if (page && page % 5 === 0) {
      t('ADV.更多', {
        page
      })
    }

    return otaStore.onADVPage(pageData)
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
