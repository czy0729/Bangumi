/*
 * @Author: czy0729
 * @Date: 2026-08-27 02:45:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-27 03:51:05
 */
import { debounce, updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import { STATE } from '../ds'
import Fetch from '../fetch'

import type { ScrollToIndex } from '@components'
import type { SubjectId, TimerRef } from '@types'
import type { TabsLabel } from '../../types'

export default class Base extends Fetch {
  /** 标签页切换 */
  onChange = (page: number) => {
    const renderedTabsIndex = [...this.state.renderedTabsIndex]
    if (!renderedTabsIndex.includes(page)) renderedTabsIndex.push(page)

    const state: {
      page: number
      grid?: typeof STATE.grid
      renderedTabsIndex: number[]
    } = {
      page,
      renderedTabsIndex
    }

    // 游戏需要初始化 state.grid
    if (this.tabs[page]?.key === 'game') state.grid = STATE.grid
    this.setState(state)
    this.save()

    t('首页.标签页切换', {
      page
    })
  }

  /** 页面筛选文字变化 (页码取输入时刻捕获, 避免防抖触发前切换 Tab 记错页) */
  onFilterChange = (filter: string) => {
    this._onFilterChangeDebounced(filter, this.state.page)
  }

  /** 筛选防抖提交 */
  private _onFilterChangeDebounced = debounce((...args: unknown[]) => {
    const [filter, page] = args as [string, number]
    this.setState({
      filter: filter.trim(),
      filterPage: page
    })
  }, 800)

  private _flipTimeoutId: TimerRef = null

  /** 章节按钮做动画前, 需要先设置开启 */
  prepareEpsFlip = (subjectId: SubjectId) => {
    if (this._flipTimeoutId) clearTimeout(this._flipTimeoutId)

    this.setState({
      flip: subjectId
    })

    this._flipTimeoutId = setTimeout(() => {
      this.afterEpsFlip()
    }, 8000)
  }

  /** 章节按钮完成动画后, 需要设置关闭才能做下一次动画 */
  afterEpsFlip = debounce(() => {
    if (this._flipTimeoutId) {
      clearTimeout(this._flipTimeoutId)
      this._flipTimeoutId = null
    }

    this.setState({
      flip: 0
    })
  })

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)

  /** 各 Tab 列表的 scrollToIndex 方法映射 (index 为 Tab 序号) */
  scrollToIndex: Record<number, ScrollToIndex> = {}

  /** 底部 TabBar 再次点击滚动到顶并刷新数据 */
  forwardRef = (
    ref: {
      scrollToIndex: ScrollToIndex
    },
    title: TabsLabel
  ) => {
    const index = this.tabs.findIndex(item => item.title === title)
    if (!this.scrollToIndex[index] && ref?.scrollToIndex) {
      this.scrollToIndex[index] = ref?.scrollToIndex
    }
  }
}
