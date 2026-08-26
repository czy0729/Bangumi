/*
 * @Author: czy0729
 * @Date: 2026-08-27 02:35:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-27 03:53:24
 */
import { computed } from 'mobx'
import { collectionStore, userStore } from '@stores'
import { desc, freeze, t2s } from '@utils'
import { computedFn } from '@utils/computed-fn'
import { IOS, MODEL_COLLECTION_STATUS, MODEL_SUBJECT_TYPE, WEB } from '@constants'
import State from '../state'
import { INIT_ITEM } from '../ds'
import { getCollection, getTabs, getTopMap, matchFilter } from '../utils'

import type { UserCollections, UserCollectionsItem } from '@stores/collection/types'
import type { UserCollectionItem } from '@utils/fetch.v0/types'
import type { CollectionStatus, SubjectId, SubjectType } from '@types'
import type { TabsLabel } from '../../types'

export default class Base extends State {
  /** 置顶的映射 */
  @computed get topMap() {
    return getTopMap(this.state.top)
  }

  /** 标签页配置 */
  @computed get tabs() {
    return freeze(getTabs())
  }

  /** 标签页导航状态 */
  @computed get navigationState() {
    const { tabs } = this
    return freeze({
      index: Math.min(Math.max(0, this.state.page), tabs.length - 1),
      routes: tabs
    })
  }

  /** 自己用户 ID */
  @computed get userId() {
    return userStore.userInfo.username || userStore.myUserId
  }

  /** 自己用户信息 */
  @computed get usersInfo() {
    return freeze(userStore.usersInfo(userStore.myUserId))
  }

  /** 当前标签页类型 */
  @computed get tabsLabel() {
    return this.tabs[this.state.page]?.title
  }

  /** 跳转到搜索页面后默认选择类型 */
  @computed get searchType() {
    return this.tabsLabel !== '全部' && this.tabs.length >= 2 ? this.tabsLabel : ''
  }

  /** 收藏项状态 */
  $Item = computedFn((subjectId: SubjectId) => this.state.item[subjectId] || INIT_ITEM)

  /** 是否登录 (API) */
  @computed get isLogin() {
    return WEB ? userStore.isStorybookLogin : userStore.isLogin
  }

  /** 在看的用户收藏 */
  @computed get collection() {
    return getCollection()
  }

  /** 收藏项映射 (subjectId → item) */
  @computed get collectionMap() {
    const { list } = this.collection
    const map: Record<SubjectId, UserCollectionItem> = {}
    list.forEach(item => {
      map[item.subject_id] = item
    })
    return freeze(map)
  }

  /** 过滤条件文字 (转大写和简体) */
  @computed get filter() {
    return t2s(this.state.filter.toUpperCase())
  }

  /** 实际过滤框的值 */
  filterValue = computedFn((title: TabsLabel) => {
    const { filterPage } = this.state
    if (filterPage >= 0 && filterPage < this.tabs.length) {
      if (title === this.tabs[filterPage]?.title) return this.state.filter
    }
    return ''
  })

  /** 当前列表有过滤 */
  isFilter = computedFn((title: TabsLabel) => {
    const { filterPage } = this.state
    if (filterPage >= 0 && filterPage < this.tabs.length) {
      return this.tabs[filterPage]?.title === title && !!this.state.filter
    }

    return false
  })

  /** 原始游戏数据 */
  @computed get rawGames() {
    return collectionStore.userCollections(
      this.usersInfo.username || this.userId,
      MODEL_SUBJECT_TYPE.getLabel<SubjectType>('游戏'),
      MODEL_COLLECTION_STATUS.getValue<CollectionStatus>('在看')
    )
  }

  /** 过滤后的游戏数据 */
  @computed get filteredGames() {
    if (!this.filter.length) return this.rawGames.list

    return this.rawGames.list.filter(item => {
      const cn = (item.nameCn || item.name || '').toUpperCase()
      return matchFilter(cn, this.filter)
    })
  }

  /** 在玩的游戏（排序后） */
  @computed get games() {
    const topMap = this.topMap

    return freeze({
      ...this.rawGames,
      list: this.filteredGames
        .slice()
        .map(item => [item, topMap[item.id] || 0] as [UserCollectionsItem, number])
        .sort(([, a], [, b]) => desc(a, b))
        .map(([item]) => item)
    }) as UserCollections
  }

  /** 是否渲染 Item */
  showItem = computedFn((title: TabsLabel) => {
    if (!IOS || this.tabs.length <= 1) return true

    const index = this.tabs.findIndex(item => item.title === title)
    return this.state.renderedTabsIndex.includes(index)
  })

  @computed get hm() {
    return (
      this.isLogin ? [`?id=${this.userId}`, 'Home'] : [`?id=${this.userId}&login=0`, 'Home']
    ) as [string, string]
  }
}
