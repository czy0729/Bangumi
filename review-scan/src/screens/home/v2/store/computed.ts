/*
 * @Author: czy0729
 * @Date: 2023-02-27 20:14:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-18 13:28:39
 */
import { computed } from 'mobx'
import { _, calendarStore, collectionStore, subjectStore, systemStore, userStore } from '@stores'
import { desc, findLastIndex, freeze, getOnAir, getPinYinFilterValue, t2s, x18 } from '@utils'
import CacheManager from '@utils/cache-manager'
import {
  IOS,
  MODEL_COLLECTION_STATUS,
  MODEL_SETTING_HOME_LAYOUT,
  MODEL_SETTING_HOME_SORTING,
  MODEL_SUBJECT_TYPE,
  PAD,
  WEB
} from '@constants'
import { getOriginConfig, OriginItem } from '@src/screens/user/origin-setting/utils'
import { H_TABBAR, TABS_ITEM } from '../ds'
import State from './state'
import { BANGUMI_INFO, INIT_ITEM, NAMESPACE, PAGE_LIMIT_GRID, PAGE_LIMIT_LIST } from './ds'

import type { Tabs, TabsLabel } from '../types'
import type {
  CollectionStatus,
  Id,
  SettingHomeSorting,
  SubjectId,
  SubjectType,
  SubjectTypeValue
} from '@types'
import type { UserCollection } from '@stores/user/types'
import type { Ep } from '@stores/subject/types'

export default class Computed extends State {
  /** 置顶的映射 */
  getTopMap() {
    return this.state.top.reduce<Record<SubjectId, number>>((map, subjectId, index) => {
      map[subjectId] = index + 1
      return map
    }, {})
  }

  /** Tabs SceneMap */
  @computed get tabs() {
    const tabs: Tabs = systemStore.setting.homeTabs.map(item => TABS_ITEM[item]).filter(Boolean)
    if (systemStore.setting.showGame) tabs.push(TABS_ITEM.game)
    return freeze(tabs)
  }

  /** Tabs navigationState */
  @computed get navigationState() {
    const { tabs } = this
    return freeze({
      index: Math.min(Math.max(0, this.state.page), tabs.length - 1),
      routes: tabs
    })
  }

  /** 列表上内距 */
  @computed get listPaddingTop() {
    const basePadding = _.headerHeight + (this.tabs.length <= 1 ? _.sm : H_TABBAR)
    const iosPadAdjustment = IOS && PAD ? _.statusBarHeight : 0
    return basePadding + iosPadAdjustment
  }

  /** 自己用户 ID */
  @computed get userId() {
    return userStore.userInfo.username || userStore.myUserId
  }

  /** 自己用户信息 */
  @computed get usersInfo() {
    return freeze(userStore.usersInfo(userStore.myUserId))
  }

  /** 当前 Tabs 类型 */
  @computed get tabsLabel() {
    return this.tabs[this.state.page]?.title
  }

  /** Item 状态 */
  $Item(subjectId: SubjectId) {
    return freeze(computed(() => this.state.item[subjectId] || INIT_ITEM).get())
  }

  /** 是否登录 (API) */
  @computed get isLogin() {
    return WEB ? userStore.isStorybookLogin : userStore.isLogin
  }

  /** 在看的用户收藏 */
  @computed get collection() {
    const { collection } = userStore
    if (!userStore.isLimit) collection

    return {
      ...collection,
      list: collection.list.filter(item => !x18(item.subject_id))
    }
  }

  /** 过滤条件文字 */
  @computed get filter() {
    // 转大写和简体
    return t2s(this.state.filter.toUpperCase())
  }

  /** 实际过滤框的值 */
  filterValue(title: TabsLabel) {
    return computed(() => {
      const { filterPage } = this.state
      const isValidPage = filterPage >= 0 && filterPage < this.tabs.length
      if (isValidPage) {
        const currentTab = this.tabs[filterPage]
        if (title === currentTab?.title) return this.state.filter
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
        const cachedData = CacheManager.get(key)
        if (cachedData) return cachedData
      }

      // 游戏特殊处理
      if (title === '游戏') return CacheManager.set(key, this.games)

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
          // 转大写和简体
          // 暂时只用中文名来过滤 (忽略日文优先设置)
          const cnName = (
            this.subject(item.subject_id).name_cn ||
            item?.subject?.name_cn ||
            item.name ||
            item?.subject?.name ||
            ''
          ).toUpperCase()
          return cnName.includes(this.filter) || getPinYinFilterValue(cnName, this.filter)
        })
      }

      if (title === '全部' && systemStore.setting.showGame) {
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
  sortList = (list: UserCollection['list']) => {
    return computed(() => {
      if (!list?.length) return freeze([])

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
            let weight = 1
            if (isOnair) {
              if (this.isToday(subjectId)) {
                weight = 1001
              } else if (this.isNextDay(subjectId)) {
                weight = 1000
              } else if (day === 0) {
                weight = 100 - weekDay
              } else if (weekDay >= day) {
                weight = 100 - weekDay
              } else {
                weight = 10 - weekDay
              }
            }

            // 看完下沉逻辑
            if (systemStore.setting.homeSortSink && !this.hasNewEp(subjectId)) {
              weight -= 10000
            }

            weightMap[subjectId] = weight
          })

          return freeze(
            list
              .slice()
              .sort((a, b) => desc(a, b, item => weightMap[item.subject_id]))
              .sort((a, b) => desc(a, b, item => topMap[item.subject_id] || 0))
          )
        }

        // 客户端顺序：未看 > 放送中 > 明天 > 本季 > 网页
        list.forEach(item => {
          const { subject_id: subjectId } = item
          const progress = this.userProgress(subjectId)
          let watchedCount = 0
          Object.keys(progress).forEach(i => {
            if (progress[i] === '看过') watchedCount += 1
          })

          // air 代表该条目放送到哪一集
          const { air = 0 } = calendarStore.onAir[subjectId] || {}
          let weight = 1
          if (this.isToday(subjectId)) {
            weight = air > watchedCount ? 100000 : 10000
          } else if (this.isNextDay(subjectId)) {
            weight = air > watchedCount ? 1000 : 100
          } else {
            weight = air > watchedCount ? 10 : 1
          }

          if (systemStore.setting.homeSortSink && !this.hasNewEp(subjectId)) {
            weight -= 100001
          }

          weightMap[subjectId] = weight
        })

        return freeze(
          list
            .slice()
            .sort((a, b) => desc(a, b, item => weightMap[item.subject_id]))
            .sort((a, b) => desc(a, b, item => topMap[item.subject_id] || 0))
        )
      } catch (error) {}

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
          if (cn.includes(this.filter)) return true

          return getPinYinFilterValue(cn, this.filter)
        })
        .sort((a, b) => desc(a, b, item => topMap[item.id] || 0))
    })
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
    return freeze(
      computed(() => {
        return (this.subject(subjectId).eps || []).filter(item => item.type === 0)
      }).get()
    )
  }

  /** 条目章节数据 */
  eps(subjectId: SubjectId) {
    return freeze(
      computed(() => {
        try {
          const eps = this.epsNoSp(subjectId)
          const { length } = eps

          // 一页章节按钮显示的最大数量
          const maxLength =
            systemStore.setting.homeLayout === MODEL_SETTING_HOME_LAYOUT.getValue('网格')
              ? this.pageLimitGrid(subjectId)
              : PAGE_LIMIT_LIST

          if (length > maxLength) {
            const userProgress = this.userProgress(subjectId)

            // 第一个不为看过章节按钮的位置
            const index = eps.findIndex(item => userProgress[item.id] !== '看过')

            // 找不到未看集数, 返回最后的数据
            if (index === -1) {
              return eps.slice(length - maxLength - 1, length - 1)
            }

            // 长篇动画从最后看过开始显示
            if (systemStore.setting.homeEpStartAtLastWathed) {
              let lastIndex: number

              if (typeof eps.findLastIndex === 'function') {
                lastIndex = eps.findLastIndex((item: Ep) => userProgress[item.id] === '看过')
              } else {
                lastIndex = findLastIndex(eps, (item: Ep) => userProgress[item.id] === '看过')
              }

              return eps.slice(Math.max(lastIndex, 0), lastIndex + maxLength)
            }

            // 找到第 1 个未看过的集数, 返回 1 个看过的集数和剩余的集数
            // 注意这里第一个值不能小于 0, 不然会返回空
            return eps.slice(Math.max(0, index - maxLength + 1), index + maxLength - 1)
          }
          return eps
        } catch (error) {
          console.error(NAMESPACE, 'eps', error)
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
          const eps = this.epsNoSp(subjectId)
          const userProgress = this.userProgress(subjectId)
          const index = eps.findIndex(item => userProgress[item.id] !== '看过')
          if (index === -1) return {}

          return eps[index]
        } catch (error) {
          console.error(NAMESPACE, 'nextWatchEp', error)
        }

        return {}
      }).get()
    )
  }

  /** 当前放送到的章节 */
  currentOnAir(subjectId: SubjectId) {
    try {
      const eps = this.epsNoSp(subjectId).slice().reverse()

      // 若第一集为第 0 集, +1
      let flagZero = false
      if (eps.length && eps[eps.length - 1].sort === 0) flagZero = true

      const current = eps.find(item => item.status === 'Air')?.sort || 0
      return flagZero && current ? current + 1 : current
    } catch (error) {
      console.error(NAMESPACE, 'nextWatchEp', error)
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
      console.error(NAMESPACE, 'totalEps', error)
      return '??'
    }
  }

  /** 猜测条目当前看到的集数 */
  countFixed(subjectId: SubjectId, epStatus: number | string) {
    return computed(() => {
      // 直接获取第一个看过章节的 sort
      const eps = this.eps(subjectId)
        .filter(item => item.type !== 1)
        .reverse()
      const userProgress = this.userProgress(subjectId)
      const item = eps.find(item => userProgress[item.id] === '看过')
      if (item) {
        // 若第一集为第 0 集, +1
        if (eps.length && eps[eps.length - 1].sort === 0) return item.sort + 1
        return item.sort
      }

      // 不能直接用 API 给的 epStatus, 会把 SP 都加上
      // 需要根据 userProgress 和 eps 排除掉 SP 算
      const epsMap = {}
      this.eps(subjectId).forEach(item => {
        if (item.type !== 1) epsMap[item.id] = true // 排除 SP
      })

      let count = 0
      Object.keys(this.userProgress(subjectId)).forEach(item => {
        if (epsMap[item] && this.userProgress(subjectId)[item] === '看过') {
          count += 1
        }
      })

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
      if (!isOnair) return false

      const day = new Date().getDay()
      return weekDay === day
    }).get()
  }

  /** 是否明天放送 */
  isNextDay(subjectId: SubjectId) {
    return computed(() => {
      const { weekDay, isOnair } = this.onAirCustom(subjectId)
      if (!isOnair) return false

      const day = new Date().getDay()
      return day === 6 ? weekDay === 0 : day === weekDay - 1
    }).get()
  }

  /** bangumi-data 数据扩展 */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  bangumiInfo(_subjectId: SubjectId) {
    // return computed(() => {
    //   if (!this.state.loadedBangumiData) {
    //     return {
    //       title: '',
    //       type: 'tv',
    //       sites: [],
    //       titleTranslate: {
    //         'zh-Hans': []
    //       }
    //     }
    //   }

    //   const { name_cn, name } = this.subject(subjectId)
    //   return unzipBangumiData(
    //     get('bangumi-data').find(
    //       item =>
    //         item.j === HTMLDecode(name_cn) ||
    //         item.j === HTMLDecode(name) ||
    //         item.c === HTMLDecode(name_cn) ||
    //         item.c === HTMLDecode(name)
    //     )
    //   )
    // }).get()

    // 暂时不使用 bangumi-data 数据
    return BANGUMI_INFO
  }

  /** 在线源头数据 */
  onlineOrigins(subjectId: SubjectId) {
    return freeze(
      computed(() => {
        const { type } = this.subject(subjectId)
        const data: (OriginItem | string)[] = []

        if (Number(type) === 2) {
          getOriginConfig(subjectStore.origin, 'anime')
            .filter(item => item.active)
            .forEach(item => {
              data.push(item)
            })
        }

        if (Number(type) === 6) {
          getOriginConfig(subjectStore.origin, 'real')
            .filter(item => item.active)
            .forEach(item => {
              data.push(item)
            })
        }

        // const bangumiInfo = this.bangumiInfo(subjectId)
        // const { sites = [] } = bangumiInfo
        // sites
        //   .filter(item => SITES_DS.includes(item.site))
        //   .forEach(item => {
        //     data.push(item.site)
        //   })

        return data
      }).get()
    )
  }

  /** 是否存在没有看的章节 */
  hasNewEp(subjectId: SubjectId) {
    return computed(() => {
      const progress = this.userProgress(subjectId)
      return this.epsNoSp(subjectId).some(
        item => (item.status === 'Air' || item.status === 'Today') && !(item.id in progress)
      )
    }).get()
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
    return computed(() => {
      const subject = this.subject(subjectId)
      try {
        if (subject?.eps && typeof subject.eps === 'object') {
          const { length } = subject.eps.filter(item => {
            if (filterZero) return item.type === 0 && item.sort != 0
            item.type === 0
          })
          if (length) return length
        }

        if (subject?.eps_count) return subject.eps_count

        return 0
      } catch (error) {
        return subject?.eps_count || 0
      }
    }).get()
  }

  /** 显示数字组合 */
  countRight(subjectId: SubjectId) {
    return computed(() => {
      const current = this.currentOnAir(subjectId)

      // 二季度的番剧，首集非 1 开始的需要从所有章节里面获取最大集数
      let total = this.totalEps(subjectId)
      if (total !== '??' && Number(current) > Number(total)) total = current

      let right = ''
      switch (systemStore.setting.homeCountView) {
        case 'B':
          right = `${current}`
          if (total !== current) right += ` (${total})`
          break

        case 'C':
          right = `${total}`
          if (total !== current) right += ` (${current})`
          break

        case 'D':
          right = `${current}`
          if (total !== current) right += ` / ${total}`
          break

        default:
          right = `${total}`
          break
      }
      return right
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
