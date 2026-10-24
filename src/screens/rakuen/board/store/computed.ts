/*
 * @Author: czy0729
 * @Date: 2026-10-24 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-24 10:00:00
 *
 * 页面派生数据
 */
import { computed } from 'mobx'
import { rakuenStore } from '@stores'
import { computedFn } from '@utils/computed-fn'
import { HTML_BOARD, LIST_EMPTY } from '@constants'
import State from './state'
import { NAMESPACE } from './ds'

import type { Board } from '@stores/rakuen/types'
import type { TopicId } from '@types'
import type { SnapshotId } from '../types'

export default class Computed extends State {
  @computed get subjectId() {
    const { subjectId = '' } = this.params
    return subjectId
  }

  @computed get key() {
    return `${NAMESPACE}|${this.subjectId}`
  }

  @computed get board() {
    const board = rakuenStore.board(this.subjectId)
    if (!board._loaded) {
      return (
        this.ota
          ? {
              ...this.ota,
              pagination: {
                page: 1,
                pageTotal: 10
              }
            }
          : LIST_EMPTY
      ) as Board
    }

    return board
  }

  @computed get url() {
    return HTML_BOARD(this.subjectId)
  }

  /** 帖子历史查看记录 */
  readed = computedFn((topicId: TopicId) => {
    return rakuenStore.readed(topicId)
  })

  /** 云快照 */
  @computed get ota() {
    const { ota } = this.state
    return ota[this.thirdPartyKey]
  }

  @computed get thirdPartyKey(): SnapshotId {
    return `board_${this.subjectId}`
  }

  @computed get hm() {
    return [this.url, 'Board']
  }
}
