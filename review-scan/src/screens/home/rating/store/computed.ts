/*
 * @Author: czy0729
 * @Date: 2024-08-26 08:13:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-06 15:59:57
 */
import { computed } from 'mobx'
import { subjectStore, systemStore } from '@stores'
import { HTML_SUBJECT_RATING, URL_DEFAULT_AVATAR } from '@constants'
import { RatingStatus } from '@types'
import { TABS } from '../ds'
import State from './state'

export default class Computed extends State {
  @computed get subjectId() {
    return this.params.subjectId
  }

  /** 好友评分列表 */
  rating(status: RatingStatus) {
    return computed(() => {
      const rating = subjectStore.rating(this.subjectId, status, this.state.isFriend)
      if (systemStore.setting.filterDefault) {
        return {
          ...rating,
          list: rating.list.filter(
            item => !(item.avatar.includes(URL_DEFAULT_AVATAR) && !item.comment)
          )
        }
      }

      return rating
    }).get()
  }

  _counts = null

  /** 各评分状态的数目统计 */
  @computed get counts() {
    if (this._counts) return this._counts

    const status = TABS[this.state.page].key
    const { counts, _loaded } = this.rating(status)
    if (_loaded) this._counts = counts
    return counts
  }

  /** 所有人评分 */
  @computed get url() {
    return HTML_SUBJECT_RATING(this.subjectId, TABS[this.state.page].key, this.state.isFriend)
  }

  @computed get hm() {
    return [this.url, 'Rating']
  }
}
