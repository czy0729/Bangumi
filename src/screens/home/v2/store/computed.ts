/*
 * @Author: czy0729
 * @Date: 2023-02-27 20:14:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-20 05:27:23
 */
import { computed } from 'mobx'
import {
  calendarStore,
  collectionStore,
  subjectStore,
  systemStore,
  userStore
} from '@stores'
import {
  HTMLDecode,
  desc,
  findLastIndex,
  getOnAir,
  getPinYinFilterValue,
  t2s,
  unzipBangumiData,
  x18
} from '@utils'
import CacheManager from '@utils/cache-manager'
import { get } from '@utils/protobuf'
import {
  IOS,
  MODEL_COLLECTION_STATUS,
  MODEL_SETTING_HOME_LAYOUT,
  MODEL_SETTING_HOME_SORTING,
  MODEL_SUBJECT_TYPE,
  SITES_DS
} from '@constants'
import {
  CollectionStatus,
  Id,
  SettingHomeSorting,
  SubjectId,
  SubjectType,
  SubjectTypeValue,
  SettingHomeLayout
} from '@types'
import { Ep } from '@stores/subject/types'
import { OriginItem, getOriginConfig } from '@src/screens/user/origin-setting/utils'
import { TABS, TABS_WITH_GAME } from '../ds'
import { TabLabel } from '../types'
import {
  EXCLUDE_STATE,
  INIT_ITEM,
  NAMESPACE,
  PAGE_LIMIT_GRID,
  PAGE_LIMIT_LIST
} from './ds'
import State from './state'

export default class Computed extends State {
  save = () => {
    return this.saveStorage(NAMESPACE, EXCLUDE_STATE)
  }

  /** 置顶的映射 */
  getTopMap() {
    const { top } = this.state
    const topMap = {}
    top.forEach((subjectId, order) => (topMap[subjectId] = order + 1))
    return topMap
  }

  /** Tabs data */
  @computed get tabs() {
    const { showGame } = systemStore.setting
    return showGame ? TABS_WITH_GAME : TABS
  }

  @computed get navigationState() {
    const { page } = this.state
    return {
      index: page,
      routes: this.tabs
    }
  }

  /** 自己用户 Id */
  @computed get myUserId() {
    return userStore.myUserId
  }

  /** 自己用户信息 Id */
  @computed get userId() {
    return userStore.userInfo.username || userStore.myUserId
  }

  /** 用户信息 */
  @computed get usersInfo() {
    return userStore.usersInfo(this.myUserId)
  }

  /** 当前 Tabs label */
  @computed get tabsLabel() {
    const { page } = this.state
    return this.tabs[page].title
  }

  /** 每个 Item 的状态 */
  $Item(subjectId: SubjectId) {
    return computed(() => this.state.item[subjectId] || INIT_ITEM).get()
  }

  /** 是否登录 (api) */
  @computed get isLogin() {
    return userStore.isLogin
  }

  /** 自己用户信息 */
  @computed get userInfo() {
    return userStore.userInfo
  }

  /** 在看的用户收藏 */
  @computed get collection() {
    if (userStore.isLimit) {
      return {
        ...userStore.collection,
        list: userStore.collection.list.filter(item => !x18(item.subject_id))
      }
    }

    return userStore.collection
  }

  /** 过滤条件文字 */
  @computed get filter() {
    const { filter } = this.state

    // 转大写和简体
    return t2s(filter.toUpperCase())
  }

  /** 列表当前数据 */
  currentCollection(title: TabLabel) {
    return computed(() => {
      const key = `${NAMESPACE}|${title}`
      if (this.state.progress.fetching) {
        const data = CacheManager.get(key)
        if (data) return CacheManager.get(key)
      }

      if (title === '游戏') {
        return CacheManager.set(key, this.games)
      }

      const data = {
        ...this.collection
      }

      // 过滤条目类型
      const type = MODEL_SUBJECT_TYPE.getValue<SubjectTypeValue>(title)
      if (type) data.list = data.list.filter(item => item?.subject?.type == type)

      // 若当前 Tab 有文字过滤
      if (this.isFilter(title)) {
        const { filter } = this.state

        // 转大写和简体
        data.list = data.list.filter(item => {
          if (!filter.length) return true

          // 暂时只用中文名来过滤 (忽略日文优先设置)
          const cn = (
            this.subject(item.subject_id).name_cn ||
            item?.subject?.name_cn ||
            item.name ||
            item?.subject?.name ||
            ''
          ).toUpperCase()
          if (cn.includes(this.filter)) return true

          return getPinYinFilterValue(cn, this.filter)
        })
      }

      if (title === '全部' && systemStore.setting.showGame) {
        data.list = [...this.sortList(data.list), ...this.games.list]
      } else {
        data.list = this.sortList(data.list)
      }

      return CacheManager.set(key, data)
    }).get()
  }

  /**
   * 列表排序
   * 章节排序: 放送中还有未看 > 放送中没未看 > 明天放送还有未看 > 明天放送中没未看 > 未完结新番还有未看 > 默认排序
   */
  sortList = (list = []) => {
    return computed(() => {
      if (!list.length) return []

      const { homeSorting } = systemStore.setting
      const topMap = this.getTopMap()

      // 网页顺序: 不需要处理
      if (
        homeSorting === MODEL_SETTING_HOME_SORTING.getValue<SettingHomeSorting>('网页')
      ) {
        return list
          .slice()
          .sort((a, b) => desc(a, b, item => topMap[item.subject_id] || 0))
      }

      try {
        const { homeSortSink } = systemStore.setting

        // 计算每一个条目看过 ep 的数量
        const weightMap = {}

        // 放送顺序: 根据今天星期几, 每天递减, 放送中的番剧优先
        if (this.sortOnAir) {
          const day = new Date().getDay()
          list.forEach(item => {
            const { subject_id: subjectId } = item
            const { weekDay, isOnair } = this.onAirCustom(subjectId)
            if (!isOnair) {
              weightMap[subjectId] = 1
            } else if (this.isToday(subjectId)) {
              weightMap[subjectId] = 1001
            } else if (this.isNextDay(subjectId)) {
              weightMap[subjectId] = 1000
            } else if (day === 0) {
              weightMap[subjectId] = 100 - weekDay
            } else if (weekDay >= day) {
              weightMap[subjectId] = 100 - weekDay
            } else {
              weightMap[subjectId] = 10 - weekDay
            }

            // 看完下沉逻辑
            if (homeSortSink && !this.hasNewEp(subjectId)) {
              weightMap[subjectId] = weightMap[subjectId] - 10000
            }
          })

          return list
            .slice()
            .sort((a, b) => desc(a, b, item => weightMap[item.subject_id]))
            .sort((a, b) => desc(a, b, item => topMap[item.subject_id] || 0))
        }

        // APP 顺序：未看 > 放送中 > 明天 > 本季 > 网页
        list.forEach(item => {
          const { subject_id: subjectId } = item
          const progress = this.userProgress(subjectId)

          let watchedCount = 0
          Object.keys(progress).forEach(i => {
            if (progress[i] === '看过') watchedCount += 1
          })

          const { air = 0 } = calendarStore.onAir[subjectId] || {}
          if (this.isToday(subjectId)) {
            weightMap[subjectId] = air > watchedCount ? 100000 : 10000
          } else if (this.isNextDay(subjectId)) {
            weightMap[subjectId] = air > watchedCount ? 1000 : 100
          } else {
            weightMap[subjectId] = air > watchedCount ? 10 : 1
          }

          // 看完下沉逻辑
          if (homeSortSink && !this.hasNewEp(subjectId)) {
            weightMap[subjectId] = weightMap[subjectId] - 100001
          }
        })

        return list
          .slice()
          .sort((a, b) => desc(a, b, item => weightMap[item.subject_id]))
          .sort((a, b) => desc(a, b, item => topMap[item.subject_id] || 0))
      } catch (error) {
        // fallback
        return list
          .slice()
          .sort((a, b) => desc(a, b, item => this.isToday(item.subject_id)))
          .sort((a, b) => desc(a, b, item => topMap[item.subject_id] || 0))
      }
    }).get()
  }

  /** 当前列表有过滤 */
  isFilter(title: TabLabel) {
    return computed(() => {
      const { filter, filterPage } = this.state
      if (filterPage >= 0 && filterPage <= this.tabs.length) {
        return this.tabs[filterPage].title === title && !!filter
      }

      return false
    }).get()
  }

  /** 在玩的游戏 */
  @computed get games() {
    const { username } = this.usersInfo
    const userCollections = collectionStore.userCollections(
      username || this.userId,
      MODEL_SUBJECT_TYPE.getLabel<SubjectType>('游戏'),
      MODEL_COLLECTION_STATUS.getValue<CollectionStatus>('在看')
    )
    const topMap = this.getTopMap()
    return {
      ...userCollections,
      list: userCollections.list
        .filter(item => {
          if (!this.filter.length) return true

          const cn = (item.nameCn || item.name || '').toUpperCase()
          if (cn.includes(this.filter)) return true

          return getPinYinFilterValue(cn, this.filter)
        })
        .sort((a, b) => desc(a, b, item => topMap[item.id] || 0))
    }
  }

  /** 用户条目收视进度 */
  userProgress(subjectId: SubjectId) {
    return computed(() => userStore.userProgress(subjectId)).get()
  }

  /** 条目信息 */
  subject(subjectId: SubjectId) {
    return computed(() => subjectStore.subject(subjectId)).get()
  }

  /** 条目章节数据 (排除 SP) */
  epsNoSp(subjectId: SubjectId) {
    return computed(() => {
      return (this.subject(subjectId).eps || []).filter(item => item.type === 0)
    }).get()
  }

  /** 条目章节数据 */
  eps(subjectId: SubjectId) {
    return computed(() => {
      try {
        const { homeLayout } = systemStore.setting
        const eps = this.epsNoSp(subjectId)
        const { length } = eps

        // 集数超过了 1 页的显示个数
        const isGrid =
          homeLayout === MODEL_SETTING_HOME_LAYOUT.getValue<SettingHomeLayout>('网格')
        if (length > (isGrid ? PAGE_LIMIT_GRID : PAGE_LIMIT_LIST)) {
          const userProgress = this.userProgress(subjectId)
          const index = eps.findIndex(item => userProgress[item.id] !== '看过')

          // 找不到未看集数, 返回最后的数据
          if (index === -1) {
            return eps.slice(length - PAGE_LIMIT_LIST - 1, length - 1)
          }

          const { homeEpStartAtLastWathed } = systemStore.setting

          if (homeEpStartAtLastWathed) {
            let lastIndex: number

            // @ts-ignore
            if (typeof eps.findLastIndex === 'function') {
              // @ts-ignore
              lastIndex = eps.findLastIndex(
                (item: Ep) => userProgress[item.id] === '看过'
              )
            } else {
              lastIndex = findLastIndex(
                eps,
                (item: Ep) => userProgress[item.id] === '看过'
              )
            }
            return eps.slice(Math.max(lastIndex, 0), lastIndex + PAGE_LIMIT_LIST)
          }

          // 找到第 1 个未看过的集数, 返回 1 个看过的集数和剩余的集数
          // 注意这里第一个值不能小于 0, 不然会返回空
          return eps.slice(Math.max(index - 1, 0), index + PAGE_LIMIT_LIST - 1)
        }
        return eps
      } catch (error) {
        console.error(NAMESPACE, 'eps', error)
        return []
      }
    }).get()
  }

  /** 条目下一个未看章节 */
  nextWatchEp(subjectId: SubjectId): {
    id?: Id
    sort?: number
  } {
    try {
      return computed(() => {
        const eps = this.epsNoSp(subjectId)
        const userProgress = this.userProgress(subjectId)
        const index = eps.findIndex(item => userProgress[item.id] !== '看过')
        if (index === -1) return {}
        return eps[index]
      }).get()
    } catch (error) {
      console.error(NAMESPACE, 'nextWatchEp', error)
      return {}
    }
  }

  /** 当前放送到的章节 */
  currentOnAir(subjectId: SubjectId) {
    try {
      const eps = this.epsNoSp(subjectId).slice().reverse()

      // 若第一集为第 0 集, +1
      let flagZero = false
      if (eps.length && eps[eps.length - 1].sort === 0) {
        flagZero = true
      }

      const current = eps.find(item => item.status === 'Air')?.sort || 0
      return flagZero && current ? current + 1 : current
    } catch (error) {
      console.error(NAMESPACE, 'nextWatchEp', error)
      return 0
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

  /** 放送顺序 */
  @computed get sortOnAir() {
    const { homeSorting } = systemStore.setting
    return (
      homeSorting === MODEL_SETTING_HOME_SORTING.getValue<SettingHomeSorting>('放送')
    )
  }

  /** 云端 onAir 和自定义 onAir 组合判断 (自定义最优先) */
  onAirCustom(subjectId: SubjectId) {
    return computed(() =>
      getOnAir(calendarStore.onAir[subjectId], calendarStore.onAirUser(subjectId))
    ).get()
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
  bangumiInfo(subjectId: SubjectId) {
    return computed(() => {
      if (!this.state.loadedBangumiData) {
        return {
          title: '',
          type: 'tv',
          sites: [],
          titleTranslate: {
            'zh-Hans': []
          }
        }
      }

      const { name_cn, name } = this.subject(subjectId)
      return unzipBangumiData(
        get('bangumi-data').find(
          item =>
            item.j === HTMLDecode(name_cn) ||
            item.j === HTMLDecode(name) ||
            item.c === HTMLDecode(name_cn) ||
            item.c === HTMLDecode(name)
        )
      )
    }).get()
  }

  /** 在线源头数据 */
  onlineOrigins(subjectId: SubjectId) {
    return computed(() => {
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

      const bangumiInfo = this.bangumiInfo(subjectId)
      const { sites = [] } = bangumiInfo
      sites
        // @ts-expect-error
        .filter(item => SITES_DS.includes(item.site))
        .forEach(item => {
          data.push(item.site)
        })

      return data
    }).get()
  }

  /** 是否存在没有看的章节 */
  hasNewEp(subjectId: SubjectId) {
    return computed(() => {
      const progress = this.userProgress(subjectId)
      return this.epsNoSp(subjectId).some(
        item =>
          (item.status === 'Air' || item.status === 'Today') && !(item.id in progress)
      )
    }).get()
  }

  /** 是否渲染 Item */
  showItem(title: TabLabel) {
    return computed(() => {
      if (!IOS) return true
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
      const { homeCountView } = systemStore.setting
      const subject = this.subject(subjectId)
      const current = this.currentOnAir(subjectId)

      // 二季度的番剧，首集非1开始的需要从所有章节里面获取最大集数
      let total = subject?.eps_count || '??'
      if (total !== '??' && Number(current) > Number(total)) total = current

      let right = ''
      switch (homeCountView) {
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
    return computed(() => {
      const actions = subjectStore.actions(subjectId)
      if (!actions.length) return actions

      return subjectStore
        .actions(subjectId)
        .filter(item => item.active)
        .sort((a, b) => desc(a.sort || 0, b.sort || 0))
    }).get()
  }

  /** 当前是否显示 ScrollToTop 组件 */
  scrollToTop(title: TabLabel) {
    if (IOS) return false

    return computed(() => {
      const { isFocused, page } = this.state
      return isFocused && TABS_WITH_GAME[page].title === title
    }).get()
  }

  @computed get hm() {
    return (
      this.isLogin
        ? [`?id=${this.userId}`, 'Home']
        : [`?id=${this.userId}&login=0`, 'Home']
    ) as [string, string]
  }
}
