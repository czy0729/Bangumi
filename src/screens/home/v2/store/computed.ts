/*
 * @Author: czy0729
 * @Date: 2023-02-27 20:14:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 07:01:09
 */
import { computed } from 'mobx'
import { _, calendarStore, collectionStore, subjectStore, systemStore, userStore } from '@stores'
import { desc, freeze, getOnAir, t2s } from '@utils'
import CacheManager from '@utils/cache-manager'
import { logger } from '@utils/dev'
import {
  IOS,
  MODEL_COLLECTION_STATUS,
  MODEL_SETTING_HOME_LAYOUT,
  MODEL_SETTING_HOME_SORTING,
  MODEL_SUBJECT_TYPE,
  WEB
} from '@constants'
import {
  calcSortWeightClient,
  calcSortWeightOnair,
  formatCountRight,
  getCollection,
  getCurrentOnAir,
  getEpsCount,
  getEpsNoSp,
  getLastWatchedSort,
  getNextWatchEp,
  getOnlineOrigins,
  getSubjectFilterName,
  getTabs,
  getTopMap,
  getVisibleEps,
  getWatchedCount,
  hasNewEp as checkHasNewEp,
  isOnairNextDay,
  isOnairToday,
  matchFilter,
  sortByWeightAndTop
} from './utils'
import State from './state'
import { INIT_ITEM, NAMESPACE, PAGE_LIMIT_GRID, PAGE_LIMIT_LIST } from './ds'

import type { UserCollections } from '@stores/collection/types'
import type { UserCollection, UserCollectionItem } from '@stores/user/types'
import type {
  CollectionStatus,
  Id,
  SettingHomeSorting,
  SubjectId,
  SubjectType,
  SubjectTypeValue
} from '@types'
import type { TabsLabel } from '../types'

export default class Computed extends State {
  /** 置顶的映射 */
  getTopMap() {
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
  $Item(subjectId: SubjectId) {
    return freeze(computed(() => this.state.item[subjectId] || INIT_ITEM).get())
  }

  /** 是否登录 (API) */
  @computed get isLogin() {
    return WEB ? userStore.isStorybookLogin : userStore.isLogin
  }

  /** 在看的用户收藏 */
  @computed get collection() {
    return getCollection()
  }

  /** 过滤条件文字 (转大写和简体) */
  @computed get filter() {
    return t2s(this.state.filter.toUpperCase())
  }

  /** 实际过滤框的值 */
  filterValue(title: TabsLabel) {
    return computed(() => {
      const { filterPage } = this.state
      if (filterPage >= 0 && filterPage < this.tabs.length) {
        if (title === this.tabs[filterPage]?.title) return this.state.filter
      }
      return ''
    }).get()
  }

  /** 列表当前数据 */
  currentCollection(title: TabsLabel) {
    return computed(() => {
      const key = `${NAMESPACE}|${title}`

      // 优先检查缓存
      if (this.state.progress.fetching) {
        const cachedData = CacheManager.get<UserCollection>(key)
        if (cachedData) return cachedData
      }

      // 游戏特殊处理
      if (title === '游戏') return CacheManager.set<UserCollections>(key, this.games)

      // 基础数据
      const data = { ...this.collection }

      // 过滤条目类型
      const type = MODEL_SUBJECT_TYPE.getValue<SubjectTypeValue>(title)
      if (type) {
        data.list = data.list.filter(item => item?.subject?.type == type)
      }

      // 文字过滤处理
      if (this.isFilter(title) && this.filter.length) {
        data.list = data.list.filter(item => {
          const cnName = getSubjectFilterName(this.subject(item.subject_id).name_cn, item)
          return matchFilter(cnName, this.filter)
        })
      }

      if (title === '全部' && systemStore.setting.showGame) {
        // @ts-expect-error
        data.list = [...this.sortList(data.list), ...this.games.list]
      } else {
        data.list = [...this.sortList(data.list)]
      }

      if (WEB) data.list = data.list.slice(0, 50)

      return CacheManager.set(key, data)
    }).get()
  }

  /**
   * 列表排序（优先度从上到下）
   *  - 放送中还有未看
   *  - 放送中没未看
   *  - 明天放送还有未看
   *  - 明天放送中没未看
   *  - 未完结新番还有未看
   *  - 默认排序
   */
  sortList = (list: UserCollectionItem[]) => {
    return computed(() => {
      if (!list?.length) return freeze([]) as UserCollectionItem[]

      const topMap = this.getTopMap()

      // 网页顺序: 不需要处理
      if (
        systemStore.setting.homeSorting ===
        MODEL_SETTING_HOME_SORTING.getValue<SettingHomeSorting>('网页')
      ) {
        return freeze(list.slice().sort((a, b) => desc(a, b, item => topMap[item.subject_id] || 0)))
      }

      try {
        // 计算每一个条目看过章节的数量
        const weightMap: Record<number, number> = {}

        // 放送顺序: 根据今天星期几每天递减, 放送中优先
        if (this.sortOnAir) {
          const day = new Date().getDay()
          list.forEach(item => {
            const { subject_id: subjectId } = item
            const { weekDay, isOnair } = this.onAirCustom(subjectId)
            weightMap[subjectId] = calcSortWeightOnair({
              weekDay,
              isOnair,
              day,
              hasNewEp: this.hasNewEp(subjectId),
              homeSortSink: systemStore.setting.homeSortSink
            })
          })
          return freeze(sortByWeightAndTop(list, weightMap, topMap))
        }

        // 客户端顺序：未看 > 放送中 > 明天 > 本季 > 网页
        list.forEach(item => {
          const { subject_id: subjectId } = item
          const watchedCount = Object.values(this.userProgress(subjectId)).filter(
            status => status === '看过'
          ).length

          // air 代表该条目放送到哪一集
          const { air = 0 } = calendarStore.onAir[subjectId] || {}
          weightMap[subjectId] = calcSortWeightClient({
            isToday: this.isToday(subjectId),
            isNextDay: this.isNextDay(subjectId),
            air,
            watchedCount,
            hasNewEp: this.hasNewEp(subjectId),
            homeSortSink: systemStore.setting.homeSortSink
          })
        })
        return freeze(sortByWeightAndTop(list, weightMap, topMap))
      } catch {}

      return freeze(
        list
          .slice()
          .sort((a, b) => desc(a, b, item => this.isToday(item.subject_id)))
          .sort((a, b) => desc(a, b, item => topMap[item.subject_id] || 0))
      )
    }).get()
  }

  /** 当前列表有过滤 */
  isFilter(title: TabsLabel) {
    return computed(() => {
      const { filterPage } = this.state
      if (filterPage >= 0 && filterPage <= this.tabs.length) {
        return this.tabs[filterPage]?.title === title && !!this.state.filter
      }

      return false
    }).get()
  }

  /** 在玩的游戏 */
  @computed get games() {
    const userCollections = collectionStore.userCollections(
      this.usersInfo.username || this.userId,
      MODEL_SUBJECT_TYPE.getLabel<SubjectType>('游戏'),
      MODEL_COLLECTION_STATUS.getValue<CollectionStatus>('在看')
    )
    const topMap = this.getTopMap()

    return freeze({
      ...userCollections,
      list: userCollections.list
        .filter(item => {
          if (!this.filter.length) return true
          const cn = (item.nameCn || item.name || '').toUpperCase()
          return matchFilter(cn, this.filter)
        })
        .sort((a, b) => desc(a, b, item => topMap[item.id] || 0))
    }) as UserCollections
  }

  /** 用户条目收视进度 */
  userProgress(subjectId: SubjectId) {
    return freeze(computed(() => userStore.userProgress(subjectId)).get())
  }

  /** 条目信息 */
  subject(subjectId: SubjectId) {
    return freeze(computed(() => subjectStore.subject(subjectId)).get())
  }

  /** 条目章节数据 (排除 SP) */
  epsNoSp(subjectId: SubjectId) {
    return computed(() => getEpsNoSp(this.subject(subjectId).eps)).get()
  }

  /** 条目章节数据 */
  eps(subjectId: SubjectId) {
    return freeze(
      computed(() => {
        try {
          const eps = this.epsNoSp(subjectId)

          // 一页章节按钮显示的最大数量
          const maxLength =
            systemStore.setting.homeLayout === MODEL_SETTING_HOME_LAYOUT.getValue('网格')
              ? this.pageLimitGrid(subjectId)
              : PAGE_LIMIT_LIST

          return getVisibleEps(eps, this.userProgress(subjectId), maxLength)
        } catch (error) {
          logger.error(NAMESPACE, 'eps', error)
        }

        return []
      }).get()
    )
  }

  /** 条目下一个未看章节 */
  nextWatchEp(subjectId: SubjectId): {
    id?: Id
    sort?: number
  } {
    return freeze(
      computed(() => {
        try {
          return getNextWatchEp(this.epsNoSp(subjectId), this.userProgress(subjectId))
        } catch (error) {
          logger.error(NAMESPACE, 'nextWatchEp', error)
        }

        return {}
      }).get()
    )
  }

  /** 当前放送到的章节 */
  currentOnAir(subjectId: SubjectId) {
    try {
      return getCurrentOnAir(this.epsNoSp(subjectId))
    } catch (error) {
      logger.error(NAMESPACE, 'nextWatchEp', error)
      return 0
    }
  }

  /** 总章节 */
  totalEps(subjectId: SubjectId) {
    try {
      const eps = this.epsNoSp(subjectId)
      return (
        Math.max(this.subject(subjectId)?.eps_count || 0, eps?.[eps.length - 1]?.sort || 0) || '??'
      )
    } catch (error) {
      logger.error(NAMESPACE, 'totalEps', error)
      return '??'
    }
  }

  /** 猜测条目当前看到的集数 */
  countFixed(subjectId: SubjectId, epStatus: number | string) {
    return computed(() => {
      // 直接获取第一个看过章节的 sort
      const eps = this.eps(subjectId).filter(item => item.type !== 1)
      const userProgress = this.userProgress(subjectId)
      const lastWatchedSort = getLastWatchedSort(eps, userProgress)
      if (lastWatchedSort !== undefined) return lastWatchedSort

      // 不能直接用 API 给的 epStatus, 会把 SP 都加上
      // 需要根据 userProgress 和 eps 排除掉 SP 算
      const count = getWatchedCount(userProgress, eps)

      // 主要是有些特殊情况, 会有意料不到的问题, 特殊处理
      // epStatus=1 的时候, 优先使用 count
      return Number(epStatus == 1 ? count || epStatus : epStatus || count)
    }).get()
  }

  /** 网格布局实际显示的章节一行多少个 */
  numbersOfLineGrid(subjectId: SubjectId) {
    return computed(() =>
      _.isMobileLanscape
        ? 12
        : systemStore.setting.homeGridEpAutoAdjust
        ? _.device(this.epsCount(subjectId, false) <= 18 ? 6 : 7, 8)
        : _.device(7, 8)
    ).get()
  }

  /** 网格布局实际显示的章节多少行 */
  @computed get linesGrid() {
    return _.isMobileLanscape ? 1 : 3
  }

  /** 网格布局实际显示的章节按钮数目 */
  pageLimitGrid(subjectId: SubjectId) {
    return computed(
      () => this.numbersOfLineGrid(subjectId) * this.linesGrid || PAGE_LIMIT_GRID
    ).get()
  }

  /** subject 中的 epStatus 未必准确, 需要手动算一个对比 */
  epStatus(subjectId: SubjectId) {
    return computed(() => {
      const userProgress = this.userProgress(subjectId)
      return this.epsNoSp(subjectId).filter(item => userProgress[item.id] === '看过').length
    }).get()
  }

  /** 放送顺序 */
  @computed get sortOnAir() {
    return (
      systemStore.setting.homeSorting ===
      MODEL_SETTING_HOME_SORTING.getValue<SettingHomeSorting>('放送')
    )
  }

  /** 云端 onAir 和自定义 onAir 组合判断 (自定义最优先) */
  onAirCustom(subjectId: SubjectId) {
    return freeze(
      computed(() =>
        getOnAir(calendarStore.onAirLocal(subjectId), calendarStore.onAirUser(subjectId))
      ).get()
    )
  }

  /** 是否放送中 */
  isToday(subjectId: SubjectId) {
    return computed(() => {
      const { weekDay, isOnair } = this.onAirCustom(subjectId)
      return isOnairToday(weekDay, isOnair)
    }).get()
  }

  /** 是否明天放送 */
  isNextDay(subjectId: SubjectId) {
    return computed(() => {
      const { weekDay, isOnair } = this.onAirCustom(subjectId)
      return isOnairNextDay(weekDay, isOnair)
    }).get()
  }

  /** 在线源头数据 */
  onlineOrigins(subjectId: SubjectId) {
    return freeze(
      computed(() => {
        const { type } = this.subject(subjectId)
        return getOnlineOrigins(type, subjectStore.origin)
      }).get()
    )
  }

  /** 是否存在没有看的章节 */
  hasNewEp(subjectId: SubjectId) {
    return computed(() =>
      checkHasNewEp(this.epsNoSp(subjectId), this.userProgress(subjectId))
    ).get()
  }

  /** 是否渲染 Item */
  showItem(title: TabsLabel) {
    return computed(() => {
      if (!IOS || this.tabs.length <= 1) return true

      const index = this.tabs.findIndex(item => item.title === title)
      return this.state.renderedTabsIndex.includes(index)
    }).get()
  }

  /** 排除 SP 章节的长度 */
  epsCount(subjectId: SubjectId, filterZero: boolean = true) {
    return computed(() => getEpsCount(this.subject(subjectId), filterZero)).get()
  }

  /** 显示数字组合 */
  countRight(subjectId: SubjectId) {
    return computed(() => {
      const current = this.currentOnAir(subjectId)
      const total = this.totalEps(subjectId)
      return formatCountRight(current, total)
    }).get()
  }

  /** 自定义跳转 */
  actions(subjectId: SubjectId) {
    return freeze(
      computed(() => {
        const actions = subjectStore.actions(subjectId)
        if (!actions.length) return actions

        return actions.filter(item => item.active).sort((a, b) => desc(a.sort || 0, b.sort || 0))
      }).get()
    )
  }

  /** 当前是否显示 ScrollToTop 组件 */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  scrollToTop(_title: TabsLabel) {
    return false

    // if (IOS) return false

    // return computed(() => {
    //   return this.state.isFocused && TABS_WITH_GAME[this.state.page].title === title
    // }).get()
  }

  @computed get hm() {
    return (
      this.isLogin ? [`?id=${this.userId}`, 'Home'] : [`?id=${this.userId}&login=0`, 'Home']
    ) as [string, string]
  }
}
