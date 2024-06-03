/*
 * @Author: czy0729
 * @Date: 2024-06-03 07:50:57
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-06-03 07:50:57
 */
import { info, updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import { MODEL_TAG_ORDERBY } from '@constants'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 隐藏后延迟显示列表 (用于重置滚动位置) */
  resetScrollView = () => {
    this.setState({
      hide: true
    })

    setTimeout(() => {
      this.setState({
        hide: false
      })
      this.save()
    }, 0)
  }

  /** 排序选择 */
  onOrderSelect = (label: any) => {
    this.resetScrollView()

    t('用户标签.排序选择', {
      label
    })

    this.setState({
      order: MODEL_TAG_ORDERBY.getValue(label)
    })
    this.fetchTag(true)
  }

  /** 年选择 */
  onAirdateSelect = (airtime: string) => {
    this.resetScrollView()

    t('用户标签.年选择', {
      airtime
    })

    this.setState({
      airtime: airtime === '全部' ? '' : airtime,
      month: ''
    })
    this.fetchTag(true)
  }

  /** 月选择 */
  onMonthSelect = (month: string) => {
    const { airtime } = this.state
    if (airtime === '') {
      info('请先选择年')
      return
    }

    this.resetScrollView()

    t('用户标签.月选择', {
      month
    })

    this.setState({
      month: month === '全部' ? '' : month
    })
    this.fetchTag(true)
  }

  /** 切换布局 */
  onToggleList = () => {
    this.resetScrollView()

    const { list } = this.state
    t('用户标签.切换布局', {
      list: !list
    })

    this.setState({
      list: !list
    })
  }

  /** 切换固定 */
  onToggleFixed = () => {
    const { fixed } = this.state

    this.setState({
      fixed: !fixed
    })
    this.save()
  }

  /** 切换显示收藏 */
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
