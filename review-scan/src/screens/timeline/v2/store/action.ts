/*
 * @Author: czy0729
 * @Date: 2024-05-27 10:55:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-27 10:56:23
 */
import { ScrollToIndex } from '@components'
import { timelineStore } from '@stores'
import { feedback, updateVisibleBottom } from '@utils'
import { fetchHTML, t } from '@utils/fetch'
import { MODEL_TIMELINE_SCOPE, TIMELINE_TYPE } from '@constants'
import { TimeLineScope, UserId } from '@types'
import { TABS } from '../ds'
import Fetch from './fetch'

export default class Action extends Fetch {
  onHeaderRefresh = () => {
    return this.fetchTimeline(true)
  }

  /** 标签页切换 */
  onChange = (page: number) => {
    const { scope } = this.state
    t('时间胶囊.标签页切换', {
      page,
      scope
    })

    const renderedTabsIndex = [...this.state.renderedTabsIndex]
    if (!renderedTabsIndex.includes(page)) renderedTabsIndex.push(page)

    this.setState({
      page,
      renderedTabsIndex
    })

    if (!this.timeline(scope, TIMELINE_TYPE[page].value)._loaded) {
      this.fetchTimeline(true)
    }
    this.save()
  }

  /** 切换类型 */
  onSelectScope = (label: string) => {
    t('时间胶囊.切换类型', {
      label
    })

    const { scope } = this.state
    const nextScope = MODEL_TIMELINE_SCOPE.getValue<TimeLineScope>(label)
    if (nextScope !== scope) {
      this.setState({
        scope: nextScope
      })
      this.fetchTimeline(true)
      this.save()
    }
  }

  /** 保存滚动到顶方法的引用 */
  scrollToIndex: Record<number, ScrollToIndex> = {}

  /** 底部 TabBar 再次点击滚动到顶并刷新数据 */
  forwardRef = (ref: { scrollToIndex: ScrollToIndex }, index: number) => {
    this.scrollToIndex[index] = ref?.scrollToIndex
  }

  /** 刷新到顶 */
  onRefreshThenScrollTop = async () => {
    try {
      const { page } = this.state
      if (typeof this.scrollToIndex[page] === 'function') {
        t('其他.刷新到顶', {
          screen: 'Timeline'
        })

        this.scrollToIndex[page]({
          animated: true,
          index: 0,
          viewOffset: 8000
        })

        await this.onHeaderRefresh()
        feedback()
      }
    } catch (error) {
      console.error('Timeline', 'onRefreshThenScrollTop', error)
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
    t('时间胶囊.删除时间线', {
      scope
    })

    const responseText = await fetchHTML({
      method: 'POST',
      url: `${clearHref}&ajax=1`
    })
    feedback()

    try {
      if (JSON.parse(responseText)?.status === 'ok') {
        timelineStore.removeTimeline(clearHref, scope, TABS[page].key)
      }
    } catch (error) {}

    return true
  }
}
