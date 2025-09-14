/*
 * @Author: czy0729
 * @Date: 2024-07-29 14:00:04
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-07-29 14:00:04
 */
import { discoveryStore } from '@stores'
import { CatalogDetail } from '@stores/discovery/types'
import { HTMLDecode, removeHTMLTag } from '@utils'
import { queue } from '@utils/fetch'
import { update } from '@utils/kv'
import { decode } from '@utils/protobuf'
import { Id, Override } from '@types'
import Computed from './computed'

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
      data = await discoveryStore.fetchCatalog({
        type,
        page
      })
    }
    queue(data.map(item => () => this.fetchCatalogDetail(item.id)))

    return data
  }

  /** 目录详情 */
  fetchCatalogDetail = async (id: Id) => {
    if (discoveryStore.catalogDetail(id)._loaded) return true

    const oss = discoveryStore.catalogDetailFromOSS(id)
    if (oss?._loaded && oss?.list?.length) return true

    if (!oss?._loaded) {
      const result = await discoveryStore.fetchCatalogDetailFromOSS({
        id
      })
      if (result) return true
    }

    const data = await discoveryStore.fetchCatalogDetail({
      id
    })

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
