/*
 * @Author: czy0729
 * @Date: 2020-03-22 18:47:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 20:46:04
 */
import { observable, computed } from 'mobx'
import { _, usersStore, discoveryStore } from '@stores'
import store from '@utils/store'
import { queue } from '@utils/fetch'
import { update } from '@utils/kv'
import { Id } from '@types'

export default class ScreenStaff extends store {
  state = observable({
    /** 可视范围底部 y */
    visibleBottom: _.window.height
  })

  init = () => {
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

  onScroll = ({ nativeEvent }) => {
    const { contentOffset, layoutMeasurement } = nativeEvent
    const screenHeight = layoutMeasurement.height
    this.setState({
      visibleBottom: contentOffset.y + screenHeight
    })
  }
}
