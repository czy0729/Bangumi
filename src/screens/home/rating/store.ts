/*
 * @Author: czy0729
 * @Date: 2020-07-28 10:22:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 10:53:52
 */
import { observable, computed } from 'mobx'
import { subjectStore, systemStore } from '@stores'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { HTML_SUBJECT_RATING, URL_DEFAULT_AVATAR } from '@constants'
import { RatingStatus } from '@types'
import { NAMESPACE, STATUS_MAP, TABS } from './ds'
import { Params } from './types'

export default class ScreenRating extends store {
  params: Params

  state = observable({
    page: 2,

    /** 登录用户默认 true */
    isFriend: false,
    _loaded: false,
    _fetching: false
  })

  init = async () => {
    const state = (await this.getStorage(NAMESPACE)) || {}
    const { status } = this.params
    if (status) state.page = STATUS_MAP[status] || 2
    this.setState({
      ...state,
      _loaded: true,
      _fetching: false
    })

    const { page } = this.state
    const { _loaded } = this.rating(TABS[page].key)
    if (!_loaded) return this.fetchRating(true)

    return true
  }

  // -------------------- get --------------------
  @computed get subjectId() {
    const { subjectId } = this.params
    return subjectId
  }

  /** 好友评分列表 */
  rating(status: RatingStatus) {
    return computed(() => {
      const { isFriend } = this.state
      const { filterDefault } = systemStore.setting
      const rating = subjectStore.rating(this.subjectId, status, isFriend)
      if (filterDefault) {
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

    const { page } = this.state
    const status = TABS[page].key
    const { counts, _loaded } = this.rating(status)
    if (_loaded) this._counts = counts

    return counts
  }

  /** 所有人评分 */
  @computed get url() {
    const { page, isFriend } = this.state
    const status = TABS[page].key
    return HTML_SUBJECT_RATING(this.subjectId, status, isFriend)
  }

  // -------------------- fetch --------------------
  /** 所有人评分 */
  fetchRating = async (refresh: boolean = false) => {
    const { _fetching } = this.state
    if (_fetching) return true

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

  // -------------------- page --------------------
  /** 标签页切换 */
  onChange = (page: number) => {
    t('用户评分.标签页切换', {
      page
    })
    this.setState({
      page
    })
    this.setStorage(NAMESPACE)

    const status = TABS[page].key
    const { _loaded } = this.rating(status)
    if (!_loaded) this.fetchRating(true)
  }

  /** 切换类型 */
  onToggleFilter = (label: '所有' | '好友') => {
    const { page, isFriend } = this.state
    if (label) {
      if (label === '所有' && !isFriend) return
      if (label === '好友' && isFriend) return
    }

    t('用户评分.切换类型', {
      isFriend: !isFriend
    })

    this.setState({
      isFriend: !isFriend
    })
    this.setStorage(NAMESPACE)

    const status = TABS[page].key
    const { _loaded } = this.rating(status)
    if (!_loaded) this.fetchRating(true)
  }
}
