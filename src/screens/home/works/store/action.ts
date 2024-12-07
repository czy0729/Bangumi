/*
 * @Author: czy0729
 * @Date: 2024-09-06 01:12:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-07 15:21:36
 */
import { feedback, info, updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import {
  MODEL_MONO_WORKS_ORDERBY,
  TEXT_MENU_FAVOR,
  TEXT_MENU_LAYOUT,
  TEXT_MENU_TOOLBAR
} from '@constants'
import { ToolBarKeys } from '../types'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 排序选择 */
  onOrderSelect = (label: string) => {
    this.setState({
      order: MODEL_MONO_WORKS_ORDERBY.getValue(label)
    })
    this.fetchMonoWorks(true)
    this.save()

    t('作品.排序选择', {
      label
    })
  }

  /** 职位选择 */
  onFilterSelect = (label: string, data: any[]) => {
    const { value = '' } = data.find(item => item.title === label) || {}
    this.setState({
      position: value
    })
    this.fetchMonoWorks(true)
    this.save()

    t('作品.职位选择', {
      label: label.split(' ')[0]
    })
  }

  /** 切换布局 */
  onToggleList = () => {
    const value = !this.state.list
    this.setState({
      list: value
    })
    this.save()

    info(this.toolBar?.[1])
    feedback(true)

    t('作品.切换布局', {
      list: value
    })
  }

  /** 工具栏 */
  onToggleToolbar = (key: ToolBarKeys) => {
    this.setState({
      [key]: !this.state[key]
    })
    this.save()

    info(this.toolBar?.[key === 'fixed' ? 0 : 2])
    feedback(true)
  }

  /** 工具栏设置 */
  onToolBar = (title: string) => {
    if (title.includes(TEXT_MENU_TOOLBAR)) return this.onToggleToolbar('fixed')
    if (title.includes(TEXT_MENU_LAYOUT)) return this.onToggleList()
    if (title.includes(TEXT_MENU_FAVOR)) return this.onToggleToolbar('collected')
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
