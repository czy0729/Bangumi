/*
 * @Author: czy0729
 * @Date: 2024-06-03 07:50:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-07 03:47:18
 */
import { feedback, info, updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import { MODEL_TAG_ORDERBY, TEXT_MENU_FAVOR, TEXT_MENU_LAYOUT, TEXT_MENU_TOOLBAR } from '@constants'
import Fetch from './fetch'
import { EXCLUDE_STATE } from './ds'

export default class Action extends Fetch {
  /** 隐藏后延迟显示列表 (用于重置滚动位置) */
  resetScrollView = () => {
    this.setState({
      hide: true,
      visibleBottom: EXCLUDE_STATE.visibleBottom
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
    this.setState({
      order: MODEL_TAG_ORDERBY.getValue(label)
    })
    this.fetchTag(true)

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

    const value = !this.state.meta
    this.setState({
      meta: value
    })
    this.fetchTag(true)

    t('用户标签.公共标签', {
      meta: value
    })
  }

  /** 切换布局 */
  onToggleList = () => {
    this.resetScrollView()

    const value = !this.state.list
    this.setState({
      list: value
    })

    info(this.toolBar?.[1])
    feedback(true)

    t('用户标签.切换布局', {
      list: !value
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
