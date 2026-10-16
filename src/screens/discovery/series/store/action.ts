/*
 * @Author: czy0729
 * @Date: 2024-11-30 19:35:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 23:12:51
 *
 * 关联系列交互: 工具栏筛选与分页加载
 */
import { toJS } from 'mobx'
import { feedback, info } from '@utils'
import { t } from '@utils/fetch'
import { TEXT_MENU_TOOLBAR } from '@constants'
import { SORT_DEFAULT } from '../ds'
import Fetch from './fetch'

import type { SubjectId } from '@types'

export default class Action extends Fetch {
  /** 配合 PaginationList 的下一页 */
  onPage = (list: (SubjectId | SubjectId[])[] = []) => {
    const subjectIds: SubjectId[] = []
    list.forEach(item => {
      const _item = toJS(item)
      if (Array.isArray(_item)) {
        subjectIds.push(..._item)
      } else {
        subjectIds.push(_item)
      }
    })

    this.fetchSubjects(subjectIds)
  }

  /** 锁定工具栏 */
  onToggleFixed = () => {
    this.setState({
      fixed: !this.state.fixed
    })
    this.save()

    info(this.toolBar?.[0])
    feedback(true)
  }

  /** 排序选择 */
  onSortSelect = (title: string) => {
    const sort = title === SORT_DEFAULT ? '' : title
    if (sort !== this.state.sort) {
      this.setState({
        sort
      })
      this.save()

      // 排序变化会重置分页, 顺带把列表滚回顶部
      this.scrollToOffset?.({
        offset: 0,
        animated: false
      })
    }

    t('关联系列.排序选择', {
      title
    })
  }

  /** 类型选择 */
  onFilterSelect = (title: string) => {
    this.setState({
      filter: title === '全部' ? '' : title
    })
    this.save()

    t('关联系列.类型选择', {
      title
    })
  }

  /** 年选择 */
  onAirtimeSelect = (title: string) => {
    this.setState({
      airtime: title === '全部' ? '' : title
    })
    this.save()

    t('关联系列.年选择', {
      title
    })
  }

  /** 状态选择 */
  onStatusSelect = (title: string) => {
    this.setState({
      status: title === '全部' ? '' : title
    })
    this.save()

    t('关联系列.状态选择', {
      title
    })
  }

  /** 展开/收起系列组的子条目 */
  onExpand = (id: SubjectId) => {
    const { expand } = this.state
    this.setState({
      expand: expand.includes(id) ? expand.filter(item => item !== id) : [...expand, id]
    })
  }

  /** 工具栏设置 */
  onToolBar = (title: string) => {
    if (title.includes(TEXT_MENU_TOOLBAR)) return this.onToggleFixed()
  }
}
