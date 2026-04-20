/*
 * @Author: czy0729
 * @Date: 2024-08-26 08:22:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-26 08:23:00
 */
import { subjectStore } from '@stores'
import { TABS } from '../ds'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 所有人评分 */
  fetchRating = async (refresh: boolean = false) => {
    if (this.state._fetching) return true

    const { page, isFriend } = this.state
    const status = TABS[page].key

    this.setState({
      _fetching: true
    })
    await subjectStore.fetchRating(
      {
        subjectId: this.subjectId,
        status,
        isFriend
      },
      refresh
    )
    this.setState({
      _fetching: false
    })

    return true
  }
}
