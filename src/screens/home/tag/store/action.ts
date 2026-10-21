/*
 * @Author: czy0729
 * @Date: 2024-06-03 07:50:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-22 12:00:00
 *
 * 操作: 排序 / 年月 / 公共标签筛选, 布局与工具栏切换
 */
import { feedback, info, updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import { MODEL_TAG_ORDERBY, TEXT_MENU_FAVOR, TEXT_MENU_LAYOUT, TEXT_MENU_TOOLBAR } from '@constants'
import Fetch from './fetch'
import { EXCLUDE_STATE } from './ds'

import type { ScrollToOffset } from '@components'
import type { TagOrderCn } from '@types'

/** 长列表实例 (只用到滚动方法) */
type ListRef = { scrollToOffset: ScrollToOffset }

export default class Action extends Fetch {
  /** 长列表实例 */
  protected listRef: ListRef | null = null

  /** 收集长列表 ref, 卸载时置空 */
  forwardRef = (ref: ListRef | null) => {
    this.listRef = ref?.scrollToOffset ? ref : null
  }

  /** 重置滚动位置 (列表不重建, 直接回到顶部) */
  resetScrollView = () => {
    this.setState({
      visibleBottom: EXCLUDE_STATE.visibleBottom
    })

    setTimeout(() => {
      const scrollToOffset = this.listRef?.scrollToOffset
      if (typeof scrollToOffset === 'function') {
        scrollToOffset({
          offset: 0,
          animated: false
        })
      }
    }, 0)
  }

  /** 排序选择 */
  onOrderSelect = (label: TagOrderCn) => {
    this.resetScrollView()
    this.setState({
      order: MODEL_TAG_ORDERBY.getValue(label)
    })
    this.fetchTag(true)
    // order 属于持久化字段, 需在 setState 之后保存
    this.save()

    t('用户标签.排序选择', {
      label
    })
  }

  /** 年选择 */
  onAirdateSelect = (airtime: string) => {
    this.resetScrollView()
    this.setState({
      airtime: airtime === '全部' ? '' : airtime,
      month: ''
    })
    this.fetchTag(true)

    t('用户标签.年选择', {
      airtime
    })
  }

  /** 月选择 */
  onMonthSelect = (month: string) => {
    const { airtime } = this.state
    if (airtime === '') {
      info('请先选择年')
      return
    }

    this.resetScrollView()
    this.setState({
      month: month === '全部' ? '' : month
    })
    this.fetchTag(true)

    t('用户标签.月选择', {
      month
    })
  }

  /** 公共标签选择 */
  onMetaSelect = () => {
    if (!this.tag.meta) {
      info('此标签不是公共标签')
      return
    }

    this.resetScrollView()

    const value = !this.state.meta
    this.setState({
      meta: value
    })
    this.fetchTag(true)

    t('用户标签.公共标签', {
      meta: value
    })
  }

  /** 切换布局 (会改变列数, 列表重建后自然回到顶部) */
  onToggleList = () => {
    const value = !this.state.list
    this.setState({
      list: value
    })
    this.save()

    info(this.toolBar?.[1])
    feedback(true)

    t('用户标签.切换布局', {
      list: value
    })
  }

  /** 切换固定 */
  onToggleFixed = () => {
    const value = !this.state.fixed
    this.setState({
      fixed: value
    })
    this.save()

    info(this.toolBar?.[0])
    feedback(true)
  }

  /** 切换显示收藏 */
  onToggleCollected = () => {
    const value = !this.state.collected
    this.setState({
      collected: value
    })
    this.save()

    info(this.toolBar?.[2])
    feedback(true)
  }

  /** 工具栏设置 */
  onToolBar = (title: string) => {
    if (title.includes(TEXT_MENU_TOOLBAR)) return this.onToggleFixed()
    if (title.includes(TEXT_MENU_LAYOUT)) return this.onToggleList()
    if (title.includes(TEXT_MENU_FAVOR)) return this.onToggleCollected()
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
