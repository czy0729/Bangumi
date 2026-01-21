/*
 * @Author: czy0729
 * @Date: 2024-09-13 05:03:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-21 11:16:52
 */
import { debounce, feedback, updateVisibleBottom } from '@utils'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 过滤 */
  onFilterChange = debounce((filter: string) => {
    this.setState({
      filter: filter.trim()
    })
  })

  /** 切换显示分组 */
  toggleFriendGroup = (title: string) => {
    const { friendGroupShows } = this.state
    if (!(title in friendGroupShows)) return

    feedback(true)
    this.setState({
      friendGroupShows: {
        [title]: !friendGroupShows[title]
      }
    })
    this.save()
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
