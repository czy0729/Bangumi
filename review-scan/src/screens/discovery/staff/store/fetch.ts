/*
 * @Author: czy0729
 * @Date: 2024-08-21 17:12:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-21 17:13:05
 */
import { discoveryStore, usersStore } from '@stores'
import { CatalogDetail } from '@stores/discovery/types'
import { HTMLDecode, removeHTMLTag } from '@utils'
import { queue } from '@utils/fetch'
import { update } from '@utils/kv'
import { Id, Override } from '@types'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 用户目录 */
  fetchCatalogs = async (refresh: boolean = false) => {
    const data = await usersStore.fetchCatalogs(
      {
        userId: this.userId,
        isCollect: false
      },
      refresh
    )

    queue(data.list.map(item => () => this.fetchCatalogDetail(item.id)))

    return data
  }

  /** 目录详情 */
  fetchCatalogDetail = async (id: Id) => {
    const catalogDetail = discoveryStore.catalogDetail(id)
    if (
      (catalogDetail._loaded && catalogDetail.list.length) ||
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
