/*
 * @Author: czy0729
 * @Date: 2024-08-26 08:24:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-26 08:28:59
 */
import { t } from '@utils/fetch'
import { TABS } from '../ds'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 标签页切换 */
  onChange = (page: number) => {
    this.setState({
      page
    })
    this.save()

    const status = TABS[page].key
    if (!this.rating(status)._loaded) this.fetchRating(true)

    t('用户评分.标签页切换', {
      page
    })
  }

  /** 切换类型 */
  onToggleFilter = (label: '所有' | '好友') => {
    const { page, isFriend } = this.state
    if (label) {
      if (label === '所有' && !isFriend) return
      if (label === '好友' && isFriend) return
    }

    const value = !isFriend
    this.setState({
      isFriend: value
    })
    this.save()

    const status = TABS[page].key
    if (!this.rating(status)._loaded) this.fetchRating(true)

    t('用户评分.切换类型', {
      isFriend: value
    })
  }
}
