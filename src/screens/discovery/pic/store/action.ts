/*
 * @Author: czy0729
 * @Date: 2025-06-09 14:52:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-12 00:58:14
 */
import { feedback, info, queue, updateVisibleBottom } from '@utils'
import Fetch from './fetch'

export default class Action extends Fetch {
  onPage = (page: number) => {
    feedback(true)
    if (this.state.fetching) {
      info('请先等待请求结束再跳转')
      return
    }

    this.setState({
      show: false,
      page
    })

    setTimeout(() => {
      this.setState({
        show: true
      })
    }, 80)

    return queue([() => this.fetchList(), () => this.fetchSrcs()], 1)
  }

  onFilter = (label: string) => {
    let filter = (label.split(' (')?.[0] || '').trim()
    if (filter === '全部') filter = ''
    this.setState({
      filter
    })
    feedback(true)
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
