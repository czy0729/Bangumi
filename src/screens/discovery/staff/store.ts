/*
 * @Author: czy0729
 * @Date: 2020-03-22 18:47:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 10:07:34
 */
import { observable, computed } from 'mobx'
import { usersStore, discoveryStore } from '@stores'
import { updateVisibleBottom } from '@utils'
import store from '@utils/store'
import { queue } from '@utils/fetch'
import { update } from '@utils/kv'
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
  updateCatalogDetail = data => {
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
          .filter((item, index) => index < 100)
          .map(item => ({
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

  // -------------------- get --------------------
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
