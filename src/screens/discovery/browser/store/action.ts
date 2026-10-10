/*
 * @Author: czy0729
 * @Date: 2024-05-25 08:09:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 10:20:00
 *
 * 索引操作: 筛选选择 / 年月前后翻页 / 工具栏与布局切换
 */
import { feedback, info, updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import {
  MODEL_SUBJECT_TYPE,
  TEXT_MENU_FAVOR,
  TEXT_MENU_LAYOUT,
  TEXT_MENU_TOOLBAR
} from '@constants'
import Fetch from './fetch'
import { EXCLUDE_STATE } from './ds'

import type { ScrollToOffset } from '@components'
import type { SubjectType } from '@types'
import type { Airtime, Month } from '../types'

/** 前后翻页方向 */
type Direction = -1 | 1

export default class Action extends Fetch {
  scrollToOffset: ScrollToOffset = null

  forwardRef = (ref: { scrollToOffset: ScrollToOffset }) => {
    if (ref?.scrollToOffset) this.scrollToOffset = ref.scrollToOffset
  }

  /** 隐藏后延迟显示列表 (用于重置滚动位置) */
  resetScrollView = async (refresh?: boolean) => {
    this.save()

    if (refresh) {
      if (!this.browser._loaded) {
        await this.fetchBrowser(true)
      } else {
        this.fetchBrowser(true)
      }
    }

    setTimeout(() => {
      if (typeof this.scrollToOffset === 'function') {
        this.scrollToOffset({
          offset: 0,
          animated: false
        })
      }
    }, 0)
  }

  /** 下拉刷新 */
  onHeaderRefresh = () => {
    return this.fetchBrowser(true)
  }

  /** 类型选择 */
  onTypeSelect = (type: string) => {
    this.setState({
      type: MODEL_SUBJECT_TYPE.getLabel<SubjectType>(type),
      visibleBottom: EXCLUDE_STATE.visibleBottom
    })
    this.resetScrollView(true)

    t('索引.类型选择', {
      type
    })
  }

  /** 年选择 */
  onAirdateSelect = (airtime: Airtime) => {
    this.setState({
      airtime: airtime === '全部' ? '' : airtime,
      visibleBottom: EXCLUDE_STATE.visibleBottom
    })
    this.resetScrollView(true)

    t('索引.年选择', {
      airtime
    })
  }

  /** 月选择 */
  onMonthSelect = (month: Month) => {
    if (!this.state.airtime) {
      info('请先选择年')
      return
    }

    this.setState({
      month: month === '全部' ? '' : month,
      visibleBottom: EXCLUDE_STATE.visibleBottom
    })
    this.resetScrollView(true)

    t('索引.月选择', {
      month
    })
  }

  /** 前后翻页, 未选择月时只变年, 跨年时月做进退 */
  private shiftAirtime = (direction: Direction) => {
    const { airtime, month } = this.state
    if (!airtime) {
      info('请先选择年')
      return false
    }

    // 非数字的月 (如历史缓存的 '不选择') 视作未选择月
    const monthNum = Number(month)
    const showMonth = !!month && !Number.isNaN(monthNum)

    let _airtime = Number(airtime)
    let _month = showMonth ? monthNum + direction : ''

    // 1 月的前一月是去年 12 月, 12 月的后一月是次年 1 月
    if (showMonth && _month === 0) {
      _airtime -= 1
      _month = 12
    } else if (showMonth && _month === 13) {
      _airtime += 1
      _month = 1
    }

    this.setState({
      airtime: _airtime,
      month: _month,
      visibleBottom: EXCLUDE_STATE.visibleBottom
    })

    return true
  }

  /** 前一月 */
  onAirdatePrev = () => {
    if (!this.shiftAirtime(-1)) return

    this.resetScrollView(true)

    t('索引.前一月')
  }

  /** 后一月 */
  onAirdateNext = () => {
    if (!this.shiftAirtime(1)) return

    this.resetScrollView(true)

    t('索引.后一月')
  }

  /** 切换布局 */
  switchLayout = () => {
    const layout = this.isList ? 'grid' : 'list'
    this.setState({
      layout
    })
    this.save()

    info(this.toolBar[1])
    feedback(true)

    t('索引.切换布局', {
      layout
    })
  }

  /** 切换固定 (工具条) */
  onToggleFixed = () => {
    this.setState({
      fixed: !this.state.fixed
    })
    this.save()

    info(this.toolBar[0])
    feedback(true)
  }

  /** 切换显示收藏 (工具条) */
  onToggleCollected = () => {
    this.setState({
      collected: !this.state.collected
    })
    this.save()

    info(this.toolBar[2])
    feedback(true)
  }

  /** 工具栏设置 */
  onToolBar = (title: string) => {
    if (title.includes(TEXT_MENU_TOOLBAR)) return this.onToggleFixed()
    if (title.includes(TEXT_MENU_LAYOUT)) return this.switchLayout()
    if (title.includes(TEXT_MENU_FAVOR)) return this.onToggleCollected()
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
