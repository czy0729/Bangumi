/*
 * @Author: czy0729
 * @Date: 2024-11-09 06:39:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-04 20:13:38
 */
import { discoveryStore, subjectStore } from '@stores'
import { CatalogDetail } from '@stores/discovery/types'
import { getTimestamp, HTMLDecode, removeHTMLTag } from '@utils'
import { queue } from '@utils/fetch'
import { get, update } from '@utils/kv'
import { D7 } from '@constants'
import { Id, Override } from '@types'
import { SnapshotId } from '../types'
import Computed from './computed'

/** 若更新过则不会再主动更新 */
const THIRD_PARTY_UPDATED: SnapshotId[] = []

export default class Fetch extends Computed {
  /** 包含条目的目录 */
  fetchSubjectCatalogs = async (refresh: boolean = false) => {
    if (refresh) this.fetchThirdParty()

    const data = await subjectStore.fetchSubjectCatalogs(
      {
        subjectId: this.subjectId
      },
      refresh
    )

    if (
      data.list.length &&
      // 只有明确知道云快照没有这个 key 的数据, 才主动更新云快照数据
      this.thirdPartyKey in this.state.ota
    ) {
      const ts = this.ota?.ts || 0
      const _loaded = getTimestamp()
      if (_loaded - ts >= D7) this.updateThirdParty()
    }

    queue(data.list.map(item => () => this.fetchCatalogDetail(item.id)))
    return true
  }

  /** 目录详情 */
  fetchCatalogDetail = async (id: Id) => {
    if (
      discoveryStore.catalogDetail(id)._loaded ||
      discoveryStore.catalogDetailFromOSS(id)._loaded
    ) {
      return true
    }

    const result = await discoveryStore.fetchCatalogDetailFromOSS({
      id
    })
    if (result) return true

    const data = await discoveryStore.fetchCatalogDetail({
      id
    })
    this.updateCatalogDetail({
      ...data,
      id
    })

    return true
  }

  /** 获取云快照 */
  fetchThirdParty = async () => {
    if (!this.ota && !this.list._loaded) {
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
        list: this.list.list
      })
      THIRD_PARTY_UPDATED.push(this.thirdPartyKey)
    }, 0)
  }

  /** 上传目录详情 */
  updateCatalogDetail = (
    data: Override<
      CatalogDetail,
      {
        id: Id
        info?: string
        _loaded?: any
      }
    >
  ) => {
    setTimeout(() => {
      if (!data?.list?.length) return

      const { id, title, info, content, avatar, nickname, userId, time, collect, list } = data
      const desc = HTMLDecode(removeHTMLTag(info || content))
      update(`catalog_${id}`, {
        id,
        title,
        info: desc ? desc.slice(0, 40) : '',
        avatar,
        nickname,
        userId,
        time,
        collect,
        list: list
          .filter((_item, index: number) => index < 3)
          .map(item => ({
            id: item.id,
            image: item.image,
            title: item.title,
            type: item.type,
            info: item.info,
            comment: item.comment
          })),
        total: list.length
      })
    }, 2000)
  }
}
