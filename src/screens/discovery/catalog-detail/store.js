/*
 * @Author: czy0729
 * @Date: 2020-01-05 22:24:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-09-12 22:44:29
 */
import { computed } from 'mobx'
import { discoveryStore, collectionStore } from '@stores'
import store from '@utils/store'
import { info, feedback } from '@utils/ui'
import { t, fetchHTML } from '@utils/fetch'
import { HOST } from '@constants'

export default class ScreenCatalogDetail extends store {
  init = () => this.fetchCatalogDetail()

  // -------------------- fetch --------------------
  fetchCatalogDetail = () =>
    discoveryStore.fetchCatalogDetail({
      id: this.catalogId
    })

  // -------------------- get --------------------
  @computed get catalogId() {
    const { catalogId = '' } = this.params
    return catalogId
  }

  @computed get catalogDetail() {
    return discoveryStore.catalogDetail(this.catalogId)
  }

  @computed get isCollect() {
    const { byeUrl } = this.catalogDetail
    return !!byeUrl
  }

  @computed get userCollectionsMap() {
    return collectionStore.userCollectionsMap
  }

  // -------------------- page --------------------
  /**
   * 收藏或取消目录
   */
  toggleCollect = () => {
    const { byeUrl } = this.catalogDetail
    if (byeUrl) {
      this.doErase()
      return
    }

    this.doCollect()
  }

  // -------------------- action --------------------
  /**
   * 收藏目录
   */
  doCollect = async () => {
    const { joinUrl } = this.catalogDetail
    if (!joinUrl) {
      return false
    }

    t('目录详情.收藏', {
      catalogId: this.catalogId
    })

    await fetchHTML({
      method: 'POST',
      url: `${HOST}${joinUrl}`
    })
    feedback()
    info('已收藏')

    return this.fetchCatalogDetail()
  }

  /**
   * 取消收藏目录
   */
  doErase = async () => {
    const { byeUrl } = this.catalogDetail
    if (!byeUrl) {
      return false
    }

    t('目录详情.取消收藏', {
      catalogId: this.catalogId
    })

    await fetchHTML({
      method: 'POST',
      url: `${HOST}${byeUrl}`
    })
    feedback()
    info('已取消收藏')

    return this.fetchCatalogDetail()
  }
}
