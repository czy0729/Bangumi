/*
 * @Author: czy0729
 * @Date: 2024-08-26 08:13:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-21 12:00:00
 *
 * 派生: 当前评分状态、评分列表 (带默认头像过滤)、数目统计缓存、页面地址
 */
import { computed } from 'mobx'
import { subjectStore, systemStore } from '@stores'
import { ensureRecordLimit } from '@utils/cache'
import { computedFn } from '@utils/computed-fn'
import { HTML_SUBJECT_RATING, URL_DEFAULT_AVATAR } from '@constants'
import { DEFAULT_PAGE, TABS } from '../ds'
import State from './state'

import type { RatingStatus } from '@types'

/** 数目统计缓存上限 (按条目累积, 不加界会随浏览条目增长) */
const COUNTS_LIMIT = 20

export default class Computed extends State {
  @computed get subjectId() {
    return this.params.subjectId
  }

  /** 当前标签页对应的评分状态 (缓存页码可能越界, 回退到默认标签) */
  @computed get status(): RatingStatus {
    return TABS[this.state.page]?.key || TABS[DEFAULT_PAGE].key
  }

  /** 好友评分列表 */
  rating = computedFn((status: RatingStatus) => {
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
  })

  /** 按条目缓存的数目统计, 避免边切换时先显示上一个条目的数字 */
  private _countsBySubject: Record<string, Record<RatingStatus, number>> = {}

  /** 各评分状态的数目统计 (未加载时沿用该条目上次结果, 避免切换标签时数字闪空) */
  @computed get counts() {
    const key = this.subjectId
    const { counts, _loaded } = this.rating(this.status)
    if (_loaded) {
      this._countsBySubject[key] = counts
      ensureRecordLimit(this._countsBySubject, COUNTS_LIMIT)
    }

    return this._countsBySubject[key] || counts
  }

  /** 所有人评分 */
  @computed get url() {
    return HTML_SUBJECT_RATING(this.subjectId, this.status, this.state.isFriend)
  }

  @computed get hm() {
    return [this.url, 'Rating'] as const
  }
}
