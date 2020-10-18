/*
 * @Author: czy0729
 * @Date: 2020-07-28 10:22:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-18 16:36:12
 */
import { observable, computed } from 'mobx'
import { subjectStore, systemStore } from '@stores'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { URL_DEFAULT_AVATAR } from '@constants'
import { MODEL_RATING_STATUS } from '@constants/model'

export const routes = MODEL_RATING_STATUS.data.map(item => ({
  key: item.value,
  title: item.label
}))

const namespace = 'ScreenRating'
const statusMap = {
  wish: 0,
  collect: 1,
  doing: 2,
  onHold: 3,
  dropped: 4
}

export default class ScreenRating extends store {
  state = observable({
    page: 2,
    isFriend: false, // 登陆用户默认true
    _loaded: false,
    _fetching: false
  })

  init = async () => {
    const state = (await this.getStorage(undefined, namespace)) || {}
    const { status } = this.params
    if (status) {
      state.page = statusMap[status] || 2
    }
    this.setState({
      ...state,
      _loaded: true,
      _fetching: false
    })

    const { page } = this.state
    const { _loaded } = this.rating(routes[page].key)
    if (!_loaded) {
      return this.fetchRating(true)
    }
    return true
  }

  // -------------------- get --------------------
  @computed get subjectId() {
    const { subjectId } = this.params
    return subjectId
  }

  rating(status) {
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
  @computed get counts() {
    if (this._counts) {
      return this._counts
    }

    const { page } = this.state
    const status = routes[page].key
    const { counts, _loaded } = this.rating(status)
    if (_loaded) {
      this._counts = counts
    }

    return counts
  }

  // -------------------- fetch --------------------
  fetchRating = async refresh => {
    const { _fetching } = this.state
    if (_fetching) {
      return true
    }

    const { page, isFriend } = this.state
    const status = routes[page].key

    this.setState({
      _fetching: true
    })
    const res = subjectStore.fetchRating(
      {
        subjectId: this.subjectId,
        status,
        isFriend
      },
      refresh
    )
    await res
    this.setState({
      _fetching: false
    })

    return res
  }

  // -------------------- page --------------------
  onChange = page => {
    t('用户评分.标签页切换', {
      page
    })
    this.setState({
      page
    })
    this.setStorage(undefined, undefined, namespace)

    const status = routes[page].key
    const { _loaded } = this.rating(status)
    if (!_loaded) {
      this.fetchRating(true)
    }
  }

  toggleFilter = () => {
    const { page, isFriend } = this.state
    t('用户评分.切换类型', {
      isFriend: !isFriend
    })

    this.setState({
      isFriend: !isFriend
    })
    this.setStorage(undefined, undefined, namespace)

    const status = routes[page].key
    const { _loaded } = this.rating(status)
    if (!_loaded) {
      this.fetchRating(true)
    }
  }
}
