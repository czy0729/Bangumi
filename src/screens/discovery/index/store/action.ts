/*
 * @Author: czy0729
 * @Date: 2024-07-17 03:43:57
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-09-29 05:19:21
 *
 * 发现页用户操作: 刷新 / 剪贴板识别 / 菜单编辑拖拽与滚动联动
 */
import { _, calendarStore, systemStore } from '@stores'
import { updateVisibleBottom } from '@utils'
import { logger } from '@utils/dev'
import { queue, t, withT } from '@utils/fetch'
import { SUBJECT_TYPE } from '@constants'
import Fetch from './fetch'

import type { ScrollToIndex } from '@components'
import type { ScrollEvent, SubjectType } from '@types'

/** 已请求过的频道类型, 避免重复请求 */
const fetchedChannelTypes = new Set<SubjectType>(['anime'])

export default class Action extends Fetch {
  /** 下拉刷新 */
  onHeaderRefresh = withT(async () => {
    await queue([
      () => this.fetchOnline(),
      () => calendarStore.fetchOnAir(true),
      () => calendarStore.fetchCalendar(),
      () => calendarStore.fetchHome()
    ])
    this.updateRandomHome()
  }, '发现.下拉刷新')

  /** 刷新到顶函数引用 */
  scrollToIndex: ScrollToIndex

  /** 底部 TabBar 再次点击滚动到顶并刷新数据 */
  forwardRef = (ref: { scrollToIndex: ScrollToIndex }) => {
    this.scrollToIndex = ref?.scrollToIndex
  }

  /** 刷新到顶 */
  onRefreshThenScrollTop = withT(
    () => {
      try {
        if (typeof this.scrollToIndex === 'function') {
          this.fetchOnline()
          this.scrollToIndex({
            animated: true,
            index: 0,
            viewOffset: 8000
          })
        }
      } catch (error) {
        logger.error('Discovery', 'onRefreshThenScrollTop', error)
      }
    },
    '其他.刷新到顶',
    {
      screen: 'Discovery'
    }
  )

  /** 切换是否拖拽中 */
  toggleDragging = () => {
    const { dragging } = this.state
    try {
      if (!dragging) {
        this.scrollToIndex({
          animated: false,
          index: 0,
          viewOffset: 8000
        })
      }
    } catch (error) {
      logger.error('Discovery', 'toggleDragging', error)
    }

    setTimeout(() => {
      this.setState({
        dragging: !dragging
      })
    }, 0)
  }

  /** 是否显示年鉴 2021 的动画 */
  toggleBlockTrain = () => {
    this.setState({
      showBlockTrain: !this.state.showBlockTrain
    })
    this.save()
  }

  /** 更新菜单的自定义配置 */
  saveDiscoveryMenu = (discoveryMenu: typeof systemStore.setting.discoveryMenu) => {
    systemStore.setSetting('discoveryMenu', discoveryMenu)

    t('发现.更新菜单', {
      length: discoveryMenu.length
    })
  }

  /** 更新可视范围底部 y, 并按需请求进入视口的频道数据 */
  onScroll = (event: ScrollEvent) => {
    updateVisibleBottom.call(this, event)
    if (fetchedChannelTypes.size >= SUBJECT_TYPE.length) return

    const { visibleBottom } = this.state
    const headerY = Math.floor(_.window.height * 0.64)
    SUBJECT_TYPE.forEach(({ label }, index) => {
      if (index === 0 || fetchedChannelTypes.has(label)) return

      const y = headerY + index * 640
      if (visibleBottom >= y) {
        fetchedChannelTypes.add(label)
        this.fetchChannel(label)
      }
    })
  }
}
