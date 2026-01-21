/*
 * @Author: czy0729
 * @Date: 2024-06-20 17:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-28 21:06:43
 */
import { feedback, info, updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import { TEXT_MENU_FAVOR, TEXT_MENU_LAYOUT } from '@constants'
import Fetch from './fetch'

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
    let value: string
    if (adapt === '全部') {
      value = ''
    } else {
      value = adapt.split(' (')?.[0] || ''
    }
    this.setState({
      adapt: value
    })

    t('每日放送.切换改编', {
      adapt: value
    })
  }

  /** 切换标签 */
  onTag = (tag: string) => {
    let value: string
    if (tag === '全部') {
      value = ''
    } else {
      value = tag.split(' (')?.[0] || ''
    }
    this.setState({
      tag: value
    })

    t('每日放送.切换标签', {
      tag: value
    })
  }

  /** 切换标签 */
  onOrigin = (origin: string) => {
    let value: string
    if (origin === '全部') {
      value = ''
    } else {
      value = origin.split(' (')?.[0] || ''
    }
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

  /** 工具栏设置 */
  onToolBar = (title: string) => {
    if (title.includes(TEXT_MENU_LAYOUT)) return this.onSwitchLayout()
    if (title.includes(TEXT_MENU_FAVOR)) return this.onToggleType()
    if (title.includes('未知时间番剧')) return this.onToggleExpand()
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
