/*
 * @Author: czy0729
 * @Date: 2024-07-29 19:28:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-29 19:33:06
 */
import { computed } from 'mobx'
import { _, discoveryStore, subjectStore, userStore } from '@stores'
import { desc, getTimestamp } from '@utils'
import CacheManager from '@utils/cache-manager'
import { List } from '../types'
import State from './state'
import { NAMESPACE } from './ds'

export default class Computed extends State {
  /** 目录 id */
  @computed get catalogId() {
    return this.params.catalogId || ''
  }

  /** 目录详情 */
  @computed get catalogDetail() {
    return discoveryStore.catalogDetail(this.catalogId)
  }

  /** 目录详情 (云缓存) */
  @computed get catalogDetailFromOSS() {
    return discoveryStore.catalogDetailFromOSS(this.catalogId)
  }

  /** 目录详情列表 */
  @computed get list(): List {
    const key = `${NAMESPACE}|${this.catalogId}`
    if (this.state.progress.fetching) {
      const data = CacheManager.get(key)
      if (data) return data
    }

    let list = []
    if (this.catalogDetail.list.length) {
      list = this.catalogDetail.list
    } else if (this.catalogDetailFromOSS.list.length) {
      list = this.catalogDetailFromOSS.list
    }
    list = list.map(item => {
      const { id } = item
      return {
        ...item,
        score:
          subjectStore.subject(id)?.rating?.score ||
          subjectStore.subjectFromOSS(id)?.rating?.score ||
          0,
        rank: subjectStore.subject(id)?.rank || subjectStore.subjectFromOSS(id)?.rank || '',
        total:
          subjectStore.subject(id)?.rating?.total ||
          subjectStore.subjectFromOSS(id)?.rating?.total ||
          ''
      }
    })

    // 时间
    const { sort } = this.state
    if (String(sort) === '1') {
      return CacheManager.set(
        key,
        list.slice().sort((a, b) => {
          return desc(
            getTimestamp((String(a.info).split(' / ')?.[0] || '').trim(), 'YYYY年M月D日'),
            getTimestamp((String(b.info).split(' / ')?.[0] || '').trim(), 'YYYY年M月D日')
          )
        })
      )
    }

    // 分数
    if (String(sort) === '2') {
      return CacheManager.set(
        key,
        list
          .slice()
          .sort((a, b) => desc(a, b, item => (item.rank ? 10000 - item.rank : item.score)))
      )
    }

    return CacheManager.set(key, list)
  }

  /** 目录是否已收藏 */
  @computed get isCollect() {
    return !!this.catalogDetail.byeUrl
  }

  /** 隐藏分数? */
  @computed get hideScore() {
    return this.params._hideScore
  }

  /** 是否自己创建的目录 */
  @computed get isSelf() {
    return userStore.isLogin && !this.catalogDetail.joinUrl && !this.catalogDetail.byeUrl
  }

  /** 是否列表布局 */
  @computed get isList() {
    return this.state.layout === 'list'
  }

  /** 网格布局个数 */
  @computed get gridNum() {
    return _.portrait(3, 5)
  }
}
