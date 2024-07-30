/*
 * @Author: czy0729
 * @Date: 2024-05-25 08:09:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-28 06:37:05
 */
import { ScrollToOffset } from '@components'
import { info, updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import { MODEL_BROWSER_SORT, MODEL_SUBJECT_TYPE } from '@constants'
import Fetch from './fetch'

export default class Action extends Fetch {
  scrollToOffset: ScrollToOffset

  forwardRef = (ref: any) => {
    if (ref) this.scrollToOffset = ref.scrollToOffset
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

  /** 类型选择 */
  onTypeSelect = (type: any) => {
    this.setState({
      type: MODEL_SUBJECT_TYPE.getLabel(type)
    })
    this.resetScrollView(true)

    t('索引.类型选择', {
      type
    })
  }

  /** 年选择 */
  onAirdateSelect = (airtime: any) => {
    this.setState({
      airtime: airtime === '全部' ? '' : airtime
    })
    this.resetScrollView(true)

    t('索引.年选择', {
      airtime
    })
  }

  /** 月选择 */
  onMonthSelect = (month: any) => {
    if (!this.state.airtime) {
      info('请先选择年')
      return
    }

    this.setState({
      month: month === '全部' ? '' : month
    })
    this.resetScrollView(true)

    t('索引.月选择', {
      month
    })
  }

  /** 前一月 */
  onAirdatePrev = () => {
    const { airtime, month } = this.state
    if (!airtime) {
      info('请先选择年')
      return
    }

    if (!month) {
      this.setState({
        airtime: Number(airtime) - 1
      })
    } else {
      let _airtime = Number(airtime)
      let _month = Number(month)
      if (month == 1) {
        _airtime -= 1
        _month = 12
      } else {
        _month -= 1
      }
      this.setState({
        airtime: _airtime,
        month: _month
      })
    }
    this.resetScrollView(true)

    t('索引.前一月')
  }

  /** 后一月 */
  onAirdateNext = () => {
    const { airtime, month } = this.state
    if (!airtime) {
      info('请先选择年')
      return
    }

    if (!month) {
      this.setState({
        airtime: Number(airtime) + 1
      })
    } else {
      let _airtime = Number(airtime)
      let _month = Number(month)
      if (month == 12) {
        _airtime += 1
        _month = 1
      } else {
        _month += 1
      }
      this.setState({
        airtime: _airtime,
        month: _month
      })
    }
    this.resetScrollView(true)

    t('索引.后一月')
  }

  /** 排序选择 */
  onOrderSelect = (label: any) => {
    const value = MODEL_BROWSER_SORT.getValue(label)
    this.setState({
      sort: value
    })
    this.resetScrollView(true)

    t('索引.排序选择', {
      sort: value
    })
  }

  /** 切换布局 */
  switchLayout = () => {
    const value = this.isList ? 'grid' : 'list'
    this.setState({
      layout: value
    })
    this.save()

    t('索引.切换布局', {
      layout: value
    })
  }

  /** 切换固定 (工具条) */
  onToggleFixed = () => {
    this.setState({
      fixed: !this.state.fixed
    })
    this.save()
  }

  /** 切换显示收藏 (工具条) */
  onToggleCollected = () => {
    this.setState({
      collected: !this.state.collected
    })
    this.save()
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
