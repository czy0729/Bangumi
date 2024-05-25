/*
 * @Author: czy0729
 * @Date: 2024-05-25 08:09:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-25 10:51:16
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
  onTypeSelect = type => {
    t('索引.类型选择', {
      type
    })

    this.setState({
      type: MODEL_SUBJECT_TYPE.getLabel(type)
    })
    this.resetScrollView(true)
  }

  /** 年选择 */
  onAirdateSelect = airtime => {
    t('索引.年选择', {
      airtime
    })

    this.setState({
      airtime: airtime === '全部' ? '' : airtime
    })
    this.resetScrollView(true)
  }

  /** 月选择 */
  onMonthSelect = month => {
    if (!this.state.airtime) {
      info('请先选择年')
      return
    }

    t('索引.月选择', {
      month
    })

    this.setState({
      month: month === '全部' ? '' : month
    })
    this.resetScrollView(true)
  }

  /** 前一年 */
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
  }

  /** 后一年 */
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
  }

  /** 排序选择 */
  onOrderSelect = label => {
    // t('索引.排序选择', {
    //   sort
    // })

    this.setState({
      sort: MODEL_BROWSER_SORT.getValue(label)
    })
    this.resetScrollView(true)
  }

  /** 切换布局 */
  switchLayout = () => {
    const _layout = this.isList ? 'grid' : 'list'
    t('索引.切换布局', {
      layout: _layout
    })

    this.setState({
      layout: _layout
    })
    this.save()
  }

  /** 切换固定 (工具条) */
  onToggleFixed = () => {
    const { fixed } = this.state

    this.setState({
      fixed: !fixed
    })
    this.save()
  }

  /** 切换显示收藏 (工具条) */
  onToggleCollected = () => {
    const { collected } = this.state

    this.setState({
      collected: !collected
    })
    this.save()
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
