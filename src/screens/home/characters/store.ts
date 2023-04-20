/*
 * @Author: czy0729
 * @Date: 2020-05-21 16:37:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 14:33:21
 */
import { observable, computed } from 'mobx'
import { _, monoStore } from '@stores'
import store from '@utils/store'
import { get, update } from '@utils/kv'
import { HTML_SUBJECT_CHARACTERS, LIST_EMPTY } from '@constants'
import { Params } from './types'
import { getTimestamp } from '@utils'

/** 若更新过则不会再主动更新 */
const THIRD_PARTY_UPDATED = []

export default class ScreenCharacters extends store {
  params: Params

  state = observable({
    /** 可视范围底部 y */
    visibleBottom: _.window.height,

    /** 云快照 */
    ota: {}
  })

  init = () => {
    return this.fetchCharacters()
  }

  // -------------------- get --------------------
  @computed get subjectId() {
    const { subjectId = '' } = this.params
    return subjectId
  }

  /** 更多角色 */
  @computed get characters() {
    const characters = monoStore.characters(this.subjectId)
    if (!characters._loaded) {
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

    return characters
  }

  @computed get url() {
    return HTML_SUBJECT_CHARACTERS(this.subjectId)
  }

  /** 云快照 */
  @computed get ota() {
    const { ota } = this.state
    return ota[this.thirdPartyKey]
  }

  @computed get thirdPartyKey() {
    return `characters_${this.subjectId}`
  }

  // -------------------- fetch --------------------
  /** 更多角色 */
  fetchCharacters = async () => {
    this.fetchThirdParty()

    const data = await monoStore.fetchCharacters({
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
    if (!this.ota && !this.characters._loaded) {
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
        list: this.characters.list
      })
      THIRD_PARTY_UPDATED.push(this.thirdPartyKey)
    }, 0)
  }

  /** 更新可视范围底部 y */
  onScroll = ({ nativeEvent }) => {
    const { contentOffset, layoutMeasurement } = nativeEvent
    const screenHeight = layoutMeasurement.height
    this.setState({
      visibleBottom: contentOffset.y + screenHeight
    })
  }
}
