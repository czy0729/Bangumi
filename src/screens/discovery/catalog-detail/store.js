/*
 * @Author: czy0729
 * @Date: 2020-01-05 22:24:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-06-09 06:07:40
 */
import { observable, computed } from 'mobx'
import {
  discoveryStore,
  collectionStore,
  subjectStore,
  userStore
} from '@stores'
import store from '@utils/store'
import { info, feedback } from '@utils/ui'
import { t, fetchHTML } from '@utils/fetch'
import { HOST } from '@constants'
import rateData from '@constants/json/rate.json'

const namespace = 'ScreenCatalogDetail'
const excludeState = {
  visible: false,
  defaultEditItem: null
}

export default class ScreenCatalogDetail extends store {
  state = observable({
    sort: 0,
    ...excludeState,
    _loaded: false
  })

  init = async () => {
    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      ...excludeState,
      _loaded: true
    })

    return this.fetchCatalogDetail()
  }

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
    const { sort } = this.state
    const catalogDetail = discoveryStore.catalogDetail(this.catalogId)
    let list = catalogDetail.list.map(item => ({
      ...item,
      score:
        subjectStore.subject(item.id)?.rating?.score || rateData[item.id] || 0
    }))

    if (sort === 1) {
      // 时间
      list = list.sort((a, b) => b.info.localeCompare(a.info))
    } else if (sort === 2) {
      // 分数
      list = list.sort((a, b) => b.score - a.score)
    }
    return {
      ...catalogDetail,
      list
    }
  }

  @computed get isCollect() {
    const { byeUrl } = this.catalogDetail
    return !!byeUrl
  }

  @computed get userCollectionsMap() {
    return collectionStore.userCollectionsMap
  }

  @computed get hideScore() {
    const { _hideScore } = this.params
    return _hideScore
  }

  /**
   * 是否自己创建的目录
   */
  @computed get isSelf() {
    const { joinUrl, byeUrl } = this.catalogDetail
    return userStore.isLogin && !joinUrl && !byeUrl
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

  sort = title => {
    const sort = title === '评分' ? 2 : title === '时间' ? 1 : 0
    t('目录详情.排序', {
      sort
    })

    this.setState({
      sort
    })
    this.setStorage(undefined, undefined, namespace)
  }

  onEdit = modify => {
    const { list } = this.catalogDetail
    const item = list.find(i => i.modify == modify)
    if (!item) {
      info('目录不属于你或者登陆状态失效了')
      return
    }

    t('目录详情.管理', {
      id: this.catalogId
    })

    if (item) {
      this.setState({
        visible: true,
        defaultEditItem: item
      })
    }
  }

  onClose = () => {
    this.setState({
      visible: false,
      defaultEditItem: null
    })
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
