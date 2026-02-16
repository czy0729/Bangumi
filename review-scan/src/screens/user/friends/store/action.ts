/*
 * @Author: czy0729
 * @Date: 2024-09-13 05:03:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-13 05:05:51
 */
import { debounce, updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import { Sort } from '../types'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 排序 */
  onSort = (title: string) => {
    let sort: Sort = ''
    if (title === '同步率') sort = 'percent'
    if (title === '最近') sort = 'recent'
    this.setState({
      sort
    })
    this.save()

    t('好友.排序', {
      title
    })
  }

  /** 过滤 */
  onFilterChange = debounce((filter: string) => {
    this.setState({
      filter: filter.trim()
    })
  })

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
