/*
 * @Author: czy0729
 * @Date: 2024-06-20 17:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-20 17:35:36
 */
import { updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 切换布局 */
  onSwitchLayout = () => {
    const layout = this.state.layout === 'list' ? 'grid' : 'list'
    this.setState({
      layout
    })
    this.save()

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

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
