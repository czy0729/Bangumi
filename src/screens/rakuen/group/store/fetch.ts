/*
 * @Author: czy0729
 * @Date: 2026-10-24 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-28 00:00:00
 *
 * 小组信息 / 帖子列表 / 云快照请求
 */
import { rakuenStore } from '@stores'
import { getTimestamp } from '@utils'
import { get, update } from '@utils/kv'
import { D7 } from '@constants'
import { ENABLE_SNAPSHOT } from '../ds'
import Computed from './computed'

import type { Group } from '@stores/rakuen/types'
import type { ResultData } from '@utils/kv/type'

/** 若更新过则不会再主动更新 */
const THIRD_PARTY_UPDATED = []

export default class Fetch extends Computed {
  /** 小组信息 */
  fetchGroupInfo = () => {
    return rakuenStore.fetchGroupInfo({
      groupId: this.groupId
    })
  }

  /** 小组帖子列表 */
  fetchGroup = async (page: number) => {
    if (ENABLE_SNAPSHOT) this.fetchThirdParty()

    const data = await rakuenStore.fetchGroup({
      groupId: this.groupId,
      page
    })

    if (
      ENABLE_SNAPSHOT &&
      data.list.length &&
      // 只有明确知道云快照没有这个 key 的数据, 才主动更新云快照数据
      this.thirdPartyKey in this.state.ota
    ) {
      const ts = this.ota?.ts || 0
      const _loaded = getTimestamp()
      if (_loaded - ts >= D7) this.updateThirdParty()
    }

    return data
  }

  /** 获取云快照 */
  fetchThirdParty = async () => {
    if (!this.ota && !this.group._loaded) {
      const data = await get<ResultData<Group>>(this.thirdPartyKey)
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
        list: this.group.list
      })
      THIRD_PARTY_UPDATED.push(this.thirdPartyKey)
    }, 0)
  }
}
