/*
 * @Author: czy0729
 * @Date: 2024-06-20 17:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-01 21:52:50
 */
import { confirm, feedback, getTimestamp, info, updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import { D1, TEXT_MENU_FAVOR, TEXT_MENU_LAYOUT } from '@constants'
import { calendarStore } from '@stores'
import Fetch from './fetch'

/** 解析筛选菜单选中值（'全部' 或 '名称 (数量)' → 名称） */
const parseFilterValue = (value: string) => {
  if (value === '全部') return ''
  return value.split(' (')?.[0] || ''
}

export default class Action extends Fetch {
  /** 切换布局 */
  onSwitchLayout = () => {
    const layout = this.isList ? 'grid' : 'list'
    this.setState({
      layout
    })
    this.save()

    info(this.toolBar?.[0])
    feedback(true)

    t('每日放送.切换布局', {
      layout
    })
  }

  /** 切换类型 */
  onToggleType = () => {
    const type = this.state.type === 'all' ? 'collect' : 'all'
    this.setState({
      type
    })
    this.save()

    info(this.toolBar?.[1])
    feedback(true)

    t('每日放送.切换类型', {
      type
    })
  }

  /** 切换展开 */
  onToggleExpand = () => {
    this.setState({
      expand: !this.state.expand
    })
    this.save()

    info(this.toolBar?.[2])
    feedback(true)
  }

  /** 切换改编 */
  onAdapt = (adapt: string) => {
    const value = parseFilterValue(adapt)
    this.setState({
      adapt: value
    })

    t('每日放送.切换改编', {
      adapt: value
    })
  }

  /** 切换标签 */
  onTag = (tag: string) => {
    const value = parseFilterValue(tag)
    this.setState({
      tag: value
    })

    t('每日放送.切换标签', {
      tag: value
    })
  }

  /** 切换动画制作 */
  onOrigin = (origin: string) => {
    const value = parseFilterValue(origin)
    this.setState({
      origin: value
    })

    t('每日放送.切换动画制作', {
      origin: value
    })
  }

  /** 清除筛选 */
  onClear = () => {
    this.setState({
      adapt: '',
      tag: '',
      origin: ''
    })
  }

  /**
   * 换季后放送数据缺失检查
   * 新番全部没有放送时间数据时, 先静默重拉一次线上数据, 仍缺失则主动询问是否显示未知时间番剧
   */
  checkAirTimeMissing = async () => {
    if (this.state.expand || !this.isAirTimeMissing) return
    if (getTimestamp() - this.state._airTimeTiped <= D1) return

    await calendarStore.fetchOnAir(true)
    if (!this.isAirTimeMissing) return

    this.setState({
      _airTimeTiped: getTimestamp()
    })
    this.save()

    confirm(
      '当前大部分新番没有放送时间数据, 可能因刚换季, 线上与内置数据尚未同步\n是否显示未知时间番剧?',
      this.onToggleExpand,
      '提示'
    )
  }

  /** 工具栏设置 */
  onToolBar = (title: string) => {
    if (title.includes(TEXT_MENU_LAYOUT)) return this.onSwitchLayout()
    if (title.includes(TEXT_MENU_FAVOR)) return this.onToggleType()
    if (title.includes('未知时间番剧')) return this.onToggleExpand()
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
