/*
 * @Author: czy0729
 * @Date: 2024-09-10 11:30:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-11 22:41:54
 */
import { info, updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import State from './state'

export default class Action extends State {
  onToggle = () => {
    const value = !this.state.list
    this.setState({
      list: value
    })
    this.save()
    info(value ? '列表显示' : '按打赏金额分布显示')

    t('赞助者.切换布局', {
      list: value
    })
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
