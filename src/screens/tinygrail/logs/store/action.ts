/*
 * @Author: czy0729
 * @Date: 2025-04-20 16:27:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-06 14:54:25
 */
import { t } from '@utils/fetch'
import Fetch from './fetch'

import type { ItemsType } from '../types'

export default class Action extends Fetch {
  /** 标签页切换 */
  onChange = (page: number) => {
    if (page === this.state.page) return

    this.setState({
      page
    })
    this.save()
    this.tabChangeCallback()

    t('资金日志.标签页切换', {
      page
    })
  }

  /** 设置前往 */
  onSelectGo = (title: string) => {
    this.setState({
      go: title
    })
    this.save()

    t('资金日志.设置前往', {
      title
    })
  }

  onItemsTypeChange = (itemsType: ItemsType) => {
    this.setState({
      itemsType
    })
    this.save()
  }

  tabChangeCallback = () => {
    if (!this.balance._loaded) this.fetchBalance()
  }
}
