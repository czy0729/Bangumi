/*
 * @Author: czy0729
 * @Date: 2024-07-29 14:00:04
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-07-29 14:00:04
 */
import { discoveryStore } from '@stores'
import { HTMLDecode, removeHTMLTag } from '@utils'
import { queue } from '@utils/fetch'
import { update } from '@utils/kv'
import { decode } from '@utils/protobuf'
import Computed from './computed'

import type { CatalogDetail } from '@stores/discovery/types'
import type { Id, Override } from '@types'

export default class Fetch extends Computed {
  /** 目录 */
  fetchCatalog = async () => {
    const { type, page, loadedCatalog } = this.state
    let data: any[]
    if (type === 'advance') {
      if (!loadedCatalog) {
        await decode('catalog')
        this.setState({
          loadedCatalog: true
        })
      }

      data = this.catalogAdvanceFilter.list
    } else {
      const { list } = await discoveryStore.fetchCatalog(type, page)
      data = list
    }

    // 批量拉取 OSS 缓存，避免逐条 kv.get
    await discoveryStore.fetchCatalogDetailFromOSSBatch(data.map(item => item.id))

    // 只对没有 OSS 缓存的条目执行 HTML 降级
    queue(
      data
        .filter(item => !discoveryStore.catalogDetailFromOSS(item.id)._loaded)
        .map(item => () => this.fetchCatalogDetail(item.id))
    )

    return data
  }

  /** 目录详情 */
  fetchCatalogDetail = async (id: Id) => {
    if (discoveryStore.catalogDetail(id)._loaded) return true

    // batch 已拉过 OSS，不再单独调 fetchCatalogDetailFromOSS
    const oss = discoveryStore.catalogDetailFromOSS(id)
    if (oss?._loaded && oss?.list?.length) return true

    const data = await discoveryStore.fetchCatalogDetail(id)

    // 因为新账号是访问不到带有 NSFW 条目的目录的, 没有数据的情况不能缓存快照
    if (data?.list?.length) {
      this.updateCatalogDetail({
        ...data,
        id
      })
    }

    return true
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
