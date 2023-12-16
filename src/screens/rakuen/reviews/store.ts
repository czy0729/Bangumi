/*
 * @Author: czy0729
 * @Date: 2021-07-15 17:28:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 06:47:09
 */
import { observable, computed } from 'mobx'
import { rakuenStore } from '@stores'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { get, update } from '@utils/kv'
import { HTML_REVIEWS, LIST_EMPTY } from '@constants'
import { TopicId } from '@types'
import { NAMESPACE, STATE } from './ds'
import { Params } from './types'

/** 若更新过则不会再主动更新 */
const THIRD_PARTY_UPDATED = []

export default class ScreenBoard extends store<typeof STATE> {
  params: Params

  state = observable(STATE)

  init = async () => {
    const state = await this.getStorage(this.key)
    this.setState({
      ...state,
      ota: {},
      _loaded: true
    })

    return this.fetchReviews()
  }

  // -------------------- fetch --------------------
  /** 条目影评列表 (日志) */
  fetchReviews = async () => {
    this.fetchThirdParty()

    const data = await rakuenStore.fetchReviews({
      subjectId: this.subjectId
    })

    if (
      data.list.length &&
      // 只有明确知道云快照没有这个 key 的数据, 才主动更新云快照数据
      this.thirdPartyKey in this.state.ota
    ) {
      const ts = this.ota?.ts || 0
      const _loaded = getTimestamp()
      if (_loaded - ts >= 60 * 60 * 24 * 7) this.updateThirdParty()
    }

    return data
  }

  /** 获取云快照 */
  fetchThirdParty = async () => {
    if (!this.ota && !this.reviews._loaded) {
      const data = await get(this.thirdPartyKey)
      if (!data) {
        // 就算没有数据也插入 key, 用于判断是否需要更新云数据
        this.setState({
          ota: {
            [this.thirdPartyKey]: {
              list: [],
              _loaded: 0
            }
          }
        })
        return
      }

      this.setState({
        ota: {
          [this.thirdPartyKey]: {
            ...data,
            _loaded: getTimestamp()
          }
        }
      })
    }
  }

  /** 上传预数据 */
  updateThirdParty = async () => {
    if (THIRD_PARTY_UPDATED.includes(this.thirdPartyKey)) return

    setTimeout(() => {
      update(this.thirdPartyKey, {
        list: this.reviews.list
      })
      THIRD_PARTY_UPDATED.push(this.thirdPartyKey)
    }, 0)
  }

  // -------------------- get --------------------
  @computed get subjectId() {
    const { subjectId = '' } = this.params
    return subjectId
  }

  @computed get key() {
    return `${NAMESPACE}|${this.subjectId}`
  }

  @computed get reviews() {
    const reviews = rakuenStore.reviews(this.subjectId)
    if (!reviews._loaded) {
      return this.ota
        ? {
            ...this.ota,
            pagination: {
              page: 1,
              pageTotal: 10
            }
          }
        : LIST_EMPTY
    }

    return reviews
  }

  @computed get url() {
    return HTML_REVIEWS(this.subjectId)
  }

  /** 帖子历史查看记录 */
  readed(topicId: TopicId) {
    return computed(() => rakuenStore.readed(topicId)).get()
  }

  /** 云快照 */
  @computed get ota() {
    const { ota } = this.state
    return ota[this.thirdPartyKey]
  }

  @computed get thirdPartyKey() {
    return `reviews_${this.subjectId}`
  }

  // -------------------- page --------------------
  onItemPress = (topicId: TopicId, replies?: number) => {
    return rakuenStore.updateTopicReaded(topicId, replies)
  }
}
