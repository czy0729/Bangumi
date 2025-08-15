/*
 * @Author: czy0729
 * @Date: 2024-08-18 05:57:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-18 07:44:30
 */
import { t } from '@utils/fetch'
import { TABS } from '../ds'
import { getType, loadTyperankIdsData } from '../utils'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 标签页切换 */
  onChange = async (page: number) => {
    if (page === this.state.page) return

    const type = getType(page)
    if (this.state.rec) await loadTyperankIdsData(type)

    this.setState({
      page
    })
    this.tabChangeCallback(page)
    this.save()

    t('标签索引.标签页切换', {
      type
    })
  }

  /** 标签类型切换 */
  onValueChange = async (title: string) => {
    const value = title === '排名'
    if (value) await loadTyperankIdsData(this.type)

    this.setState({
      rec: value
    })
    this.save()

    t('标签索引.标签类型切换', {
      rec: value
    })
  }

  /** 标签页切换回调 */
  tabChangeCallback = (page: number) => {
    const { key } = TABS[page]
    if (!this.list(key)._loaded) this.fetchList(key, true)
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
      this.fetchList(this.type, true)
      this.save()

      t('标签索引.筛选', {
        filter: ipt.slice(0, 8),
        type: this.type
      })
    }
  }
}
