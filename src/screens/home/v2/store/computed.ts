/*
 * @Author: czy0729
 * @Date: 2023-02-27 20:14:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-18 22:55:11
 */
import { computed } from 'mobx'
import { _, calendarStore, collectionStore, subjectStore, systemStore, userStore } from '@stores'
import { desc, freeze, getOnAir, t2s } from '@utils'
import CacheManager from '@utils/cache-manager'
import { computedFn } from '@utils/computed-fn'
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
  getSeasonKey,
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
import type { UserCollection } from '@stores/user/types'
import type { UserCollectionItem } from '@utils/fetch.v0/types'
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

  /** 列表当前数据 */
  currentCollection = computedFn((title: TabsLabel) => {
    const key = `${NAMESPACE}|${title}`

    // 优先检查缓存
    if (this.state.progress.fetching) {
      const cachedData = CacheManager.get<UserCollection>(key)
      if (cachedData) return cachedData
    }

    // 游戏特殊处理
    if (title === '游戏') return CacheManager.set<UserCollections>(key, this.games)

    // 基础数据
    const data = {
      ...this.collection
    }

    // 过滤条目类型
    const type = MODEL_SUBJECT_TYPE.getValue<SubjectTypeValue>(title)
    if (type) {
      data.list = data.list.filter(item => item?.subject?.type == type)
    }

    // 文字过滤处理
    if (this.isFilter(title) && this.filter.length) {
      data.list = data.list.filter(item => {
        const cnName = getSubjectFilterName(undefined, item)
        return matchFilter(cnName, this.filter)
      })
    }

    if (title === '全部' && systemStore.setting.showGame) {
      data.list = [...this.sortList(data.list), ...this.games.list] as UserCollectionItem[]
    } else {
      data.list = [...this.sortList(data.list)]
    }

    if (WEB) data.list = data.list.slice(0, 50)

    return CacheManager.set(key, data)
  })

  /**
   * 列表排序（优先度从上到下）
   *  - 放送中还有未看
   *  - 放送中没未看
   *  - 明天放送还有未看
   *  - 明天放送中没未看
   *  - 未完结新番还有未看
   *  - 默认排序
   */
  sortList = computedFn((list: UserCollectionItem[]) => {
    if (!list?.length) return freeze([]) as UserCollectionItem[]

    const topMap = this.topMap

    // 网页顺序: 不需要处理
    if (
      systemStore.setting.homeSorting ===
      MODEL_SETTING_HOME_SORTING.getValue<SettingHomeSorting>('网页')
    ) {
      return freeze(
        list
          .slice()
          .map(item => [item, topMap[item.subject_id] || 0] as [UserCollectionItem, number])
          .sort(([, a], [, b]) => desc(a, b))
          .map(([item]) => item)
      )
    }

    try {
      // 计算每一个条目看过章节的数量
      const weightMap: Record<number, number> = {}

      // 放送顺序: 本季优先, 其次 CDN 放送中, 其次星期顺序
      if (this.sortOnAir) {
        const day = new Date().getDay()
        list.forEach(item => {
          const { subject_id: subjectId } = item
          const { weekDay, isOnair } = this.onAirCustom(subjectId)
          const { air = 0 } = calendarStore.onAir[subjectId] || {}
          weightMap[subjectId] = calcSortWeightOnair({
            weekDay,
            isOnair,
            day,
            hasNewEp: this.hasNewEp(subjectId),
            seasonKey: getSeasonKey(item.subject?.air_date),
            air,
            epsCount: item.subject?.eps_count
          })
        })
        return freeze(sortByWeightAndTop(list, weightMap, topMap))
      }

      // 客户端顺序：按 seasonKey 分组（越近越大） > 放送中/未看/默认
      list.forEach(item => {
        const { subject_id: subjectId } = item
        const watchedCount = this.watchedCount(subjectId)

        // air 代表该条目放送到哪一集
        const { air = 0 } = calendarStore.onAir[subjectId] || {}
        weightMap[subjectId] = calcSortWeightClient({
          isToday: this.isToday(subjectId),
          isNextDay: this.isNextDay(subjectId),
          air,
          watchedCount,
          hasNewEp: this.hasNewEp(subjectId),
          seasonKey: getSeasonKey(item.subject?.air_date),
          epsCount: item.subject?.eps_count
        })
      })
      return freeze(sortByWeightAndTop(list, weightMap, topMap))
    } catch {}

    return freeze(
      list
        .slice()
        .map(
          item =>
            [item, topMap[item.subject_id] || 0, this.isToday(item.subject_id)] as [
              UserCollectionItem,
              number,
              boolean
            ]
        )
        .sort(([, t1, d1], [, t2, d2]) => {
          const r1 = desc(t1, t2)
          if (r1 !== 0) return r1
          return desc(d1, d2)
        })
        .map(([item]) => item)
    )
  })

  /** 当前列表有过滤 */
  isFilter = computedFn((title: TabsLabel) => {
    const { filterPage } = this.state
    if (filterPage >= 0 && filterPage <= this.tabs.length) {
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
        .map(item => [item, topMap[item.id] || 0])
        .sort(([, a], [, b]) => desc(a, b))
        .map(([item]) => item)
    }) as UserCollections
  }

  /** 用户条目收视进度 */
  userProgress = computedFn((subjectId: SubjectId) => {
    return freeze(userStore.userProgress(subjectId))
  })

  /** 已看过的章节数量 */
  watchedCount = computedFn(
    (subjectId: SubjectId) =>
      Object.values(this.userProgress(subjectId)).filter(status => status === '看过').length
  )

  /** 条目信息 */
  subject = computedFn((subjectId: SubjectId) => {
    return freeze(subjectStore.subject(subjectId))
  })

  /** 条目章节数据 (排除 SP) */
  epsNoSp = computedFn((subjectId: SubjectId) => getEpsNoSp(this.subject(subjectId).eps))

  /** 条目章节数据 */
  eps = computedFn((subjectId: SubjectId) => {
    return freeze(
      (() => {
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
      })()
    )
  })

  /** 条目下一个未看章节 */
  nextWatchEp = computedFn(
    (
      subjectId: SubjectId
    ): {
      id?: Id
      sort?: number
    } => {
      return freeze(
        (() => {
          try {
            return getNextWatchEp(this.epsNoSp(subjectId), this.userProgress(subjectId))
          } catch (error) {
            logger.error(NAMESPACE, 'nextWatchEp', error)
          }

          return {}
        })()
      )
    }
  )

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

  /** 过滤 SP 后的章节 */
  epsNoType1 = computedFn((subjectId: SubjectId) =>
    this.eps(subjectId).filter(item => item.type !== 1)
  )

  /** 猜测条目当前看到的集数 */
  countFixed = computedFn((subjectId: SubjectId, epStatus: number | string) => {
    // 直接获取第一个看过章节的 sort
    const eps = this.epsNoType1(subjectId)
    const userProgress = this.userProgress(subjectId)
    const lastWatchedSort = getLastWatchedSort(eps, userProgress)
    if (lastWatchedSort !== undefined) return lastWatchedSort

    // 不能直接用 API 给的 epStatus, 会把 SP 都加上
    // 需要根据 userProgress 和 eps 排除掉 SP 算
    const count = getWatchedCount(userProgress, eps)

    // 主要是有些特殊情况, 会有意料不到的问题, 特殊处理
    // epStatus=1 的时候, 优先使用 count
    return Number(epStatus == 1 ? count || epStatus : epStatus || count)
  })

  /** 网格布局实际显示的章节一行多少个 */
  numbersOfLineGrid = computedFn((subjectId: SubjectId) =>
    _.isMobileLanscape
      ? 12
      : systemStore.setting.homeGridEpAutoAdjust
      ? _.device(this.epsCount(subjectId, false) <= 18 ? 6 : 7, 8)
      : _.device(7, 8)
  )

  /** 网格布局实际显示的章节多少行 */
  @computed get linesGrid() {
    return _.isMobileLanscape ? 1 : 3
  }

  /** 网格布局实际显示的章节按钮数目 */
  pageLimitGrid = computedFn(
    (subjectId: SubjectId) => this.numbersOfLineGrid(subjectId) * this.linesGrid || PAGE_LIMIT_GRID
  )

  /** 已看过的章节 */
  watchedEps = computedFn((subjectId: SubjectId) => {
    const userProgress = this.userProgress(subjectId)
    return this.epsNoSp(subjectId).filter(item => userProgress[item.id] === '看过')
  })

  /** subject 中的 epStatus 未必准确, 需要手动算一个对比 */
  epStatus(subjectId: SubjectId) {
    return this.watchedEps(subjectId).length
  }

  /** 放送顺序 */
  @computed get sortOnAir() {
    return (
      systemStore.setting.homeSorting ===
      MODEL_SETTING_HOME_SORTING.getValue<SettingHomeSorting>('放送')
    )
  }

  /** 云端 onAir 和自定义 onAir 组合判断 (自定义最优先) */
  onAirCustom = computedFn((subjectId: SubjectId) => {
    const onAir = calendarStore.onAirLocal(subjectId)
    const result = getOnAir(onAir, calendarStore.onAirUser(subjectId))

    // 若已知总集数且放送集数 >= 总集数，说明条目已完结，不应标记为放送中
    if (result.isOnair && onAir.air) {
      const s = this.subject(subjectId)
      if (s?.eps_count && Number(onAir.air) >= s.eps_count) {
        result.isOnair = false
      }
    }

    // 兜底：若 onAir.air 或 eps_count 缺失，但全部章节均已放送，标记为完结
    if (result.isOnair) {
      const eps = this.epsNoSp(subjectId)
      if (eps.length > 0 && eps.every(ep => ep.status === 'Air' || ep.status === 'Today')) {
        result.isOnair = false
      }
    }

    return freeze(result)
  })

  /** 是否放送中 */
  isToday = computedFn((subjectId: SubjectId) => {
    const { weekDay, isOnair } = this.onAirCustom(subjectId)
    return isOnairToday(weekDay, isOnair)
  })

  /** 是否明天放送 */
  isNextDay = computedFn((subjectId: SubjectId) => {
    const { weekDay, isOnair } = this.onAirCustom(subjectId)
    return isOnairNextDay(weekDay, isOnair)
  })

  /** 在线源头数据 */
  onlineOrigins = computedFn((subjectId: SubjectId) => {
    return freeze(
      (() => {
        const { type } = this.subject(subjectId)
        return getOnlineOrigins(type, subjectStore.origin)
      })()
    )
  })

  /** 是否存在没有看的章节 */
  hasNewEp = computedFn((subjectId: SubjectId) =>
    checkHasNewEp(this.epsNoSp(subjectId), this.userProgress(subjectId))
  )

  /** 是否渲染 Item */
  showItem = computedFn((title: TabsLabel) => {
    if (!IOS || this.tabs.length <= 1) return true

    const index = this.tabs.findIndex(item => item.title === title)
    return this.state.renderedTabsIndex.includes(index)
  })

  /** 排除 SP 章节的长度 */
  epsCount = computedFn((subjectId: SubjectId, filterZero: boolean = true) =>
    getEpsCount(this.subject(subjectId), filterZero)
  )

  /** 显示数字组合 */
  countRight = computedFn((subjectId: SubjectId) => {
    const current = this.currentOnAir(subjectId)
    const total = this.totalEps(subjectId)
    return formatCountRight(current, total)
  })

  /** 原始自定义跳转数据 */
  rawActions = computedFn((subjectId: SubjectId) => {
    return freeze(subjectStore.actions(subjectId))
  })

  /** 自定义跳转（过滤+排序后） */
  actions = computedFn((subjectId: SubjectId) => {
    return freeze(
      (() => {
        const actions = this.rawActions(subjectId)
        if (!actions.length) return actions

        return actions.filter(item => item.active).sort((a, b) => desc(a.sort || 0, b.sort || 0))
      })()
    )
  })

  @computed get hm() {
    return (
      this.isLogin ? [`?id=${this.userId}`, 'Home'] : [`?id=${this.userId}&login=0`, 'Home']
    ) as [string, string]
  }
}
