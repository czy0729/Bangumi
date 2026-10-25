/*
 * @Author: czy0729
 * @Date: 2026-10-24 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-24 10:00:00
 *
 * 页面派生数据: 小组信息 / 帖子列表 / 缩略图
 */
import { computed } from 'mobx'
import { rakuenStore, systemStore } from '@stores'
import { CDN_OSS_MAGMA_PIC } from '@utils/cdn'
import { computedFn } from '@utils/computed-fn'
import { HOST, HOST_IMAGE, LIST_EMPTY } from '@constants'
import { ENABLE_SNAPSHOT } from '../ds'
import State from './state'
import { NAMESPACE } from './ds'

import type { Group } from '@stores/rakuen/types'
import type { TopicId } from '@types'
import type { SnapshotId } from '../types'

export default class Computed extends State {
  @computed get groupId() {
    const { groupId = '' } = this.params
    return groupId
  }

  @computed get key() {
    return `${NAMESPACE}|${this.groupId}`
  }

  /** 小组信息 */
  @computed get groupInfo() {
    return rakuenStore.groupInfo(this.groupId)
  }

  /** 小组帖子列表 */
  @computed get group(): Group {
    const { page } = this.state
    const group = rakuenStore.group(this.groupId, page)
    if (!group._loaded) {
      if (ENABLE_SNAPSHOT && this.ota) {
        return {
          ...this.ota,
          pagination: {
            page: 1,
            pageTotal: 10
          }
        } as Group
      }

      return LIST_EMPTY as Group
    }

    return group
  }

  /** 小组缩略图缓存 */
  @computed get groupThumb() {
    let src = ''

    const { cover } = this.groupInfo
    if (cover) {
      src = cover || ''
    } else {
      const { _title } = this.params
      if (_title) {
        src = rakuenStore.groupThumb(_title) || ''
      }
    }

    const { cdn, cdnOrigin } = systemStore.setting
    if (cdn && cdnOrigin === 'magma' && typeof src === 'string' && src.includes(HOST_IMAGE)) {
      src = CDN_OSS_MAGMA_PIC(src)
    }

    return src
  }

  @computed get url() {
    return `${HOST}/group/${this.groupId}`
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
    const { page } = this.state
    const query = [this.groupId, page].join('_').replace('/', '_')
    return `group_${query}`
  }

  @computed get hm() {
    return [this.url, 'Group']
  }
}
