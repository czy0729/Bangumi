/*
 * @Author: czy0729
 * @Date: 2020-03-22 18:47:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-05 13:02:09
 */
import { computed, observable } from 'mobx'
import { discoveryStore, usersStore } from '@stores'
import { updateVisibleBottom } from '@utils'
import { queue } from '@utils/fetch'
import { update } from '@utils/kv'
import store from '@utils/store'
import { Id } from '@types'
import { STATE } from './ds'

export default class ScreenStaff extends store<typeof STATE> {
  state = observable(STATE)

  init = () => {
    this.setState({
      _loaded: true
    })

    return this.fetchCatalogs(true)
  }

  // -------------------- fetch --------------------
  /** 用户目录 */
  fetchCatalogs = async (refresh: boolean = false) => {
    const data = await usersStore.fetchCatalogs(
      {
        userId: this.userId,
        isCollect: false
      },
      refresh
    )

    const { list } = data
    queue(list.map(item => () => this.fetchCatalogDetail(item.id)))

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
          .filter((item: any, index: number) => index < 100)
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

  /** 下拉刷新 */
  onHeaderRefresh = () => {
    return this.fetchCatalogs(true)
  }

  // -------------------- get --------------------
  /** 目录创建者 */
  @computed get userId() {
    return 'lilyurey'
  }

  /** 用户目录 */
  @computed get catalogs() {
    return usersStore.catalogs(this.userId, false)
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
