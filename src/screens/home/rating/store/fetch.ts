/*
 * @Author: czy0729
 * @Date: 2024-08-26 08:22:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-21 12:00:00
 *
 * 请求: 各评分状态的用户评分列表
 */
import { subjectStore } from '@stores'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 请求期间被吞掉的调用条件, 本次结束后按同样条件补拉 */
  private _pending: { refresh: boolean } | null = null

  /** 在飞请求的 status + isFriend, 用于识别重复请求 */
  private _fetchingKey = ''

  /** 所有人评分 */
  fetchRating = async (refresh: boolean = false) => {
    const { isFriend } = this.state
    const key = `${this.status}|${isFriend ? 1 : 0}`

    if (this.state._fetching) {
      // 与在飞请求同参数时无需补拉
      if (key !== this._fetchingKey) {
        this._pending = {
          refresh: refresh || !!this._pending?.refresh
        }
      }
      return true
    }

    this._fetchingKey = key
    this.setState({
      _fetching: true
    })

    try {
      await subjectStore.fetchRating(
        {
          subjectId: this.subjectId,
          status: this.status,
          isFriend
        },
        refresh
      )
    } finally {
      // 请求异常也要复位, 否则后续无法再次拉取
      this.setState({
        _fetching: false
      })

      // 放在 finally 内: 异常路径同样要补拉, 且不能残留 _pending
      if (this._pending) {
        const { refresh: pendingRefresh } = this._pending
        this._pending = null
        this.fetchRating(pendingRefresh).catch(error => this.error('fetchRating', error))
      }
    }

    return true
  }
}
