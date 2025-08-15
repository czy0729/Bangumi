/*
 * @Author: czy0729
 * @Date: 2024-08-19 06:35:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-19 06:52:48
 */
import { t } from '@utils/fetch'
import { loadGroupData } from '../utils'
import Computed from './computed'

export default class Action extends Computed {
  /** 类型切换 */
  onChange = async (label: string) => {
    if (label) {
      const { type } = this.state
      if (label === '我的' && type === 'mine') return
      if (label === '全部' && type === 'all') return
    }

    if (label === '全部') await loadGroupData()

    const value = label === '全部' ? 'all' : 'mine'
    this.setState({
      type: value
    })
    this.save()

    t('我的小组.类型切换', {
      type: value
    })
  }

  /** 筛选输入框改变 */
  onFilterChange = (ipt: string) => {
    const value = ipt.trim()
    if (!value) {
      this.setState({
        ipt: value,
        filter: ''
      })
      return
    }

    this.setState({
      ipt: value
    })
  }

  /** 输入法键盘按钮提交 */
  onSubmitEditing = () => {
    const { ipt } = this.state
    if (ipt && ipt.length) {
      this.setState({
        filter: ipt
      })

      t('我的小组.筛选', {
        filter: ipt.slice(0, 8)
      })
    }
  }
}
