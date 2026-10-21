/*
 * @Author: czy0729
 * @Date: 2024-08-26 08:24:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-21 12:00:00
 *
 * 用户评分页面交互: 标签页切换与好友筛选
 */
import { t } from '@utils/fetch'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 标签页切换 */
  onChange = (page: number) => {
    this.setState({
      page
    })
    this.save()

    if (!this.rating(this.status)._loaded) this.fetchRating(true)

    t('用户评分.标签页切换', {
      page
    })
  }

  /** 切换类型 */
  onToggleFilter = (label: '所有' | '好友') => {
    const { isFriend } = this.state
    if (label === '所有' && !isFriend) return
    if (label === '好友' && isFriend) return

    const value = !isFriend
    this.setState({
      isFriend: value
    })
    this.save()

    if (!this.rating(this.status)._loaded) this.fetchRating(true)

    t('用户评分.切换类型', {
      isFriend: value
    })
  }
}
