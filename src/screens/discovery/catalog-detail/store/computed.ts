/*
 * @Author: czy0729
 * @Date: 2024-07-29 19:28:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-22 10:46:01
 */
import { computed } from 'mobx'
import { _, discoveryStore, subjectStore, userStore } from '@stores'
import { desc, getTimestamp } from '@utils'
import CacheManager from '@utils/cache-manager'
import State from './state'
import { NAMESPACE } from './ds'

import type { List } from '../types'

export default class Computed extends State {
  /** 目录 ID */
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

  /** 目录详情 (实际用于显示) */
  @computed get detail() {
    return this.catalogDetail.title ? this.catalogDetail : this.catalogDetailFromOSS
  }

  /** 目录详情列表 */
  @computed get list() {
    const key = `${NAMESPACE}|${this.catalogId}`
    if (this.state.progress.fetching) {
      const data = CacheManager.get<List>(key)
      if (data) return data
    }

    let list: List = []
    if (this.catalogDetail.list.length) {
      list = this.catalogDetail.list
    } else if (this.catalogDetailFromOSS.list.length) {
      list = this.catalogDetailFromOSS.list
    }

    // 尽量补全评分信息
    list = list.map(item => {
      const { id } = item
      return {
        ...item,
        score: subjectStore.ratingScore(id),
        rank: subjectStore.ratingRank(id),
        total: subjectStore.ratingTotal(id)
      }
    })

    // 收藏
    const { collect, sort } = this.state
    if (collect === 'collected') {
      list = list.filter(item => item.isCollect)
    } else if (collect === 'uncollect') {
      list = list.filter(item => !item.isCollect)
    }

    // 时间
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
    } else if (String(sort) === '2') {
      // 分数
      return CacheManager.set(
        key,
        list
          .slice()
          .sort((a, b) => desc(a, b, item => (item.rank ? 10000 - item.rank : item.score)))
      )
    } else if (String(sort) === '3') {
      // 评分人数
      return CacheManager.set(
        key,
        list.slice().sort((a, b) => desc(a, b, item => item.total || 0))
      )
    }

    return CacheManager.set(key, list)
  }

  /** 目录列表拥有的类型 */
  @computed get typeData() {
    const { list, crt, prsn, ep } = this.catalogDetail || {}

    const data: string[] = []
    if (list?.length) data.push(`动画 ${list.length}`)
    if (crt?.length) data.push(`角色 ${crt.length}`)
    if (prsn?.length) data.push(`人物 ${prsn.length}`)
    if (ep?.length) data.push(`章节 ${ep.length}`)

    return data
  }

  /** 目录列表当前筛选类型 */
  @computed get type() {
    const DEFAULT_TYPE = '动画'
    const { list = [] } = this.catalogDetail || {}
    const { typeData } = this
    const onlyOneType = typeData.length <= 1

    // 情况 1: 若只有一种类型，直接用默认
    if (list.length && onlyOneType) return DEFAULT_TYPE

    // 情况 2: 若动画无内容但当前选中动画 -> 自动切换到第一个类型
    if (!list.length && this.state.type === DEFAULT_TYPE) {
      const firstType = typeData?.[0]?.split(' ')?.[0]
      return firstType || DEFAULT_TYPE
    }

    // 情况 3: 否则返回当前选中或默认
    return this.state.type || DEFAULT_TYPE
  }

  /** 当前类型列表 */
  @computed get data() {
    const { reverse } = this.state
    const { catalogDetail } = this
    const { type } = this

    const map = {
      角色: () => catalogDetail.crt || [],
      人物: () => catalogDetail.prsn || [],
      章节: () => catalogDetail.ep || []
    }
    const getter = map[type] ?? (() => this.list)
    const data = getter()

    return reverse ? data.slice().reverse() : data
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

  @computed get hm() {
    return [`index/${this.catalogId}`, 'CatalogDetail'] as const
  }
}
