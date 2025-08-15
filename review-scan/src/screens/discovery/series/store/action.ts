/*
 * @Author: czy0729
 * @Date: 2024-11-30 19:35:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 23:12:51
 */
import { toJS } from 'mobx'
import { feedback, info, updateVisibleBottom } from '@utils'
import { TEXT_MENU_TOOLBAR } from '@constants'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 配合 PaginationList 的下一页 */
  onPage = (list = []) => {
    const subjectIds = []
    list.forEach(item => {
      if (Array.isArray(toJS(item))) {
        subjectIds.push(...item)
      } else {
        subjectIds.push(item)
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

  onSortSelect = (title: string) => {
    if (title === '默认') {
      this.setState({
        sort: ''
      })

      return
    }

    this.setState({
      sort: title
    })
    this.save()
  }

  onFilterSelect = (title: string) => {
    if (title === '全部') {
      this.setState({
        filter: ''
      })
      return
    }

    this.setState({
      filter: title
    })
    this.save()
  }

  onAirtimeSelect = (title: string) => {
    if (title === '全部') {
      this.setState({
        airtime: ''
      })
      return
    }

    this.setState({
      airtime: title
    })
    this.save()
  }

  onStatusSelect = (title: string) => {
    if (title === '全部') {
      this.setState({
        status: ''
      })
      return
    }

    this.setState({
      status: title
    })
    this.save()
  }

  /** 工具栏设置 */
  onToolBar = (title: string) => {
    if (title.includes(TEXT_MENU_TOOLBAR)) return this.onToggleFixed()
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
