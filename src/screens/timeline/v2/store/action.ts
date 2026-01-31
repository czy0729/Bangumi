/*
 * @Author: czy0729
 * @Date: 2024-05-27 10:55:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-27 10:56:23
 */
import type { ScrollToIndex } from '@components'
import { timelineStore } from '@stores'
import { feedback, updateVisibleBottom } from '@utils'
import { logger } from '@utils/dev'
import { fetchHTML, t } from '@utils/fetch'
import { MODEL_TIMELINE_SCOPE, TIMELINE_TYPE } from '@constants'
import { TABS } from '../ds'
import Fetch from './fetch'
import { NAMESPACE } from './ds'

import type { TimeLineScope, UserId } from '@types'

export default class Action extends Fetch {
  /** 保存滚动到顶方法的引用 */
  private _scrollToIndex: Record<number, ScrollToIndex> = {}

  /** 下拉刷新 */
  onHeaderRefresh = () => {
    return this.fetchTimeline(true)
  }

  /** 标签页切换 */
  onChange = (page: number) => {
    const renderedTabsIndex = [...this.state.renderedTabsIndex]
    if (!renderedTabsIndex.includes(page)) renderedTabsIndex.push(page)
    this.setState({
      page,
      renderedTabsIndex
    })

    const { scope } = this.state
    if (!this.timeline(scope, TIMELINE_TYPE[page].value)._loaded) {
      this.fetchTimeline(true)
    }
    this.save()

    t('时间胶囊.标签页切换', {
      page,
      scope
    })
  }

  /** 切换类型 */
  onSelectScope = (label: string) => {
    const scope = MODEL_TIMELINE_SCOPE.getValue<TimeLineScope>(label)
    if (scope === this.state.scope) return

    this.setState({
      scope
    })
    this.fetchTimeline(true)
    this.save()

    t('时间胶囊.切换类型', {
      label
    })
  }

  /** 底部 TabBar 再次点击滚动到顶并刷新数据 */
  forwardRef = (ref: { scrollToIndex: ScrollToIndex }, index: number) => {
    this._scrollToIndex[index] = ref?.scrollToIndex
  }

  /** 刷新到顶 */
  onRefreshThenScrollTop = async () => {
    try {
      const { page } = this.state
      if (typeof this._scrollToIndex[page] === 'function') {
        this._scrollToIndex[page]({
          animated: true,
          index: 0,
          viewOffset: 8000
        })

        await this.onHeaderRefresh()
        feedback()

        t('其他.刷新到顶', {
          screen: 'Timeline'
        })
      }
    } catch (error) {
      logger.error(NAMESPACE, 'onRefreshThenScrollTop', error)
    }
  }

  /** 隐藏 */
  onHidden = (title: string, userId: UserId) => {
    let day: number
    if (title === '1天不看TA') {
      day = 1
    } else if (title === '3天不看TA') {
      day = 3
    } else if (title === '7天不看TA') {
      day = 7
    } else {
      day = 0
    }
    timelineStore.updateHidden(userId, day)

    t('时间胶囊.隐藏', {
      userId,
      day
    })
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)

  // -------------------- action --------------------
  /** 删除时间线 */
  doDelete = async (clearHref: string) => {
    if (!clearHref) return false

    const { scope, page } = this.state
    const responseText = await fetchHTML({
      method: 'POST',
      url: `${clearHref}&ajax=1`
    })
    feedback()

    try {
      if (JSON.parse(responseText)?.status === 'ok') {
        timelineStore.removeTimeline(clearHref, scope, TABS[page].key)

        t('时间胶囊.删除时间线', {
          scope
        })
      }
    } catch (error) {
      logger.error(NAMESPACE, 'doDelete', error)
    }

    return true
  }
}
