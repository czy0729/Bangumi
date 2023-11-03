/*
 * @Author: czy0729
 * @Date: 2020-05-02 21:04:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-31 09:35:39
 */
import { observable, computed } from 'mobx'
import { discoveryStore, collectionStore } from '@stores'
import { getTimestamp, omit } from '@utils'
import store from '@utils/store'
import { get, update } from '@utils/kv'
import { HTML_CHANNEL, MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectType, SubjectTypeCn } from '@types'
import { Params } from './types'

/** 若更新过则不会再主动更新 */
const THIRD_PARTY_UPDATED = []

export default class ScreenChannel extends store {
  params: Params

  state = observable({
    type: '' as SubjectType,

    /** 云快照 */
    ota: {}
  })

  init = () => {
    this.setState({
      type: this.type
    })
    this.fetchChannel()
  }

  // -------------------- get --------------------
  @computed get type() {
    const { type } = this.state
    return type || this.params.type || 'anime'
  }

  @computed get typeCn() {
    return MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(this.type)
  }

  /** 云快照 */
  @computed get ota() {
    const { ota } = this.state
    return ota[this.thirdPartyKey]
  }

  /** 频道聚合 */
  @computed get channel() {
    const channel = discoveryStore.channel(this.type)
    if (!channel._loaded) return this.ota || { _loaded: 0 }

    return channel
  }

  @computed get url() {
    return HTML_CHANNEL(this.type)
  }

  @computed get userCollectionsMap() {
    return collectionStore.userCollectionsMap
  }

  @computed get thirdPartyKey() {
    return `channel_${this.type}`
  }

  // -------------------- fetch --------------------
  /** 频道聚合 */
  fetchChannel = async () => {
    this.fetchThirdParty()

    const data = await discoveryStore.fetchChannel({
      type: this.type
    })

    if (
      data &&
      // 只有明确知道云快照没有这个 key 的数据, 才主动更新云快照数据
      this.thirdPartyKey in this.state.ota
    ) {
      const ts = this.ota?.ts || 0
      const _loaded = getTimestamp()
      if (_loaded - ts >= 60 * 60 * 24) this.updateThirdParty()
    }

    return data
  }

  /** 获取云快照 */
  fetchThirdParty = async () => {
    if (!this.ota && !this.channel._loaded) {
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
      update(this.thirdPartyKey, omit(this.channel, ['friends', '_loaded']))
      THIRD_PARTY_UPDATED.push(this.thirdPartyKey)
    }, 0)
  }

  // -------------------- page --------------------
  toggleType = (type: SubjectType) => {
    this.setState({
      type
    })
    this.fetchChannel()
  }
}
