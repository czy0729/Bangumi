/*
 * @Author: czy0729
 * @Date: 2021-04-07 10:23:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 12:35:32
 */
import { computed, observable } from 'mobx'
import { rakuenStore } from '@stores'
import { Board } from '@stores/rakuen/types'
import { getTimestamp } from '@utils'
import { get, update } from '@utils/kv'
import store from '@utils/store'
import { HTML_BOARD, LIST_EMPTY } from '@constants'
import { TopicId } from '@types'
import { NAMESPACE, STATE } from './ds'
import { Params } from './types'

/** 若更新过则不会再主动更新 */
const THIRD_PARTY_UPDATED = []

export default class ScreenBoard extends store<typeof STATE> {
  params: Params

  state = observable(STATE)

  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE>(this.key)
    this.setState({
      ...storageData,
      ota: {},
      _loaded: true
    })

    return this.fetchBoard()
  }

  // -------------------- fetch --------------------
  /** 条目帖子列表 */
  fetchBoard = async () => {
    this.fetchThirdParty()

    const data = await rakuenStore.fetchBoard({
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
    if (!this.ota && !this.board._loaded) {
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
        list: this.board.list
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

  @computed get board(): Board {
    const board = rakuenStore.board(this.subjectId)
    if (!board._loaded) {
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

    return board
  }

  @computed get url() {
    return HTML_BOARD(this.subjectId)
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
    return `board_${this.subjectId}`
  }

  @computed get hm() {
    return [this.url, 'Board']
  }

  // -------------------- page --------------------
  /** 更新帖子历史查看信息 */
  onItemPress = (topicId: TopicId, replies: any) => {
    return rakuenStore.updateTopicReaded(topicId, replies)
  }
}
