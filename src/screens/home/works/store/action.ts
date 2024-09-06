/*
 * @Author: czy0729
 * @Date: 2024-09-06 01:12:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-06 01:13:38
 */
import { updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import { MODEL_MONO_WORKS_ORDERBY } from '@constants'
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
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
