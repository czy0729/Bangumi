/*
 * @Author: czy0729
 * @Date: 2024-08-21 17:12:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-21 17:13:05
 */
import { discoveryStore, usersStore } from '@stores'
import { queue } from '@utils/fetch'
import { update } from '@utils/kv'
import { Id } from '@types'
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
  updateCatalogDetail = (data: any) => {
    setTimeout(() => {
      const { id, title, avatar, nickname, userId, time, collect, list } = data
      update(`catalog_${id}`, {
        id,
        title,
        avatar,
        nickname,
        userId,
        time,
        collect,
        list: list
          .filter((_item: any, index: number) => index < 100)
          .map((item: any) => ({
            id: item.id,
            image: item.image,
            title: item.title,
            type: item.type,
            info: item.info,
            comment: item.comment
          }))
      })
    }, 2000)
  }
}
