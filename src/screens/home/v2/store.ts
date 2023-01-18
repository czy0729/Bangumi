/*
 * @Author: czy0729
 * @Date: 2019-03-21 16:49:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-18 07:20:40
 */
import * as Device from 'expo-device'
import { observable, computed } from 'mobx'
import {
  calendarStore,
  collectionStore,
  subjectStore,
  systemStore,
  userStore
} from '@stores'
import {
  HTMLDecode,
  appNavigate,
  asc,
  cnjp,
  confirm,
  copy,
  debounce,
  desc,
  feedback,
  getBangumiUrl,
  getCalenderEventTitle,
  getCoverMedium,
  getOnAir,
  getPinYinFilterValue,
  getTimestamp,
  info,
  loading,
  open,
  queue,
  saveCalenderEvent,
  sleep,
  t2s,
  unzipBangumiData,
  x18
} from '@utils'
import { t } from '@utils/fetch'
import store from '@utils/store'
import {
  calendarEventsRequestPermissions,
  calendarGetEventsAsync
} from '@utils/calendar'
import {
  DEV,
  DEVICE_MODEL_NAME,
  IOS,
  MODEL_COLLECTIONS_ORDERBY,
  MODEL_COLLECTION_STATUS,
  MODEL_EP_STATUS,
  MODEL_SETTING_HOME_LAYOUT,
  MODEL_SETTING_HOME_SORTING,
  MODEL_SETTING_INITIAL_PAGE,
  MODEL_SUBJECT_TYPE,
  SITES_DS,
  SITE_AGEFANS,
  VERSION_GITHUB_RELEASE
} from '@constants'
import {
  CollectionStatus,
  CollectionsOrder,
  EpId,
  EpStatus,
  Id,
  Navigation,
  RatingStatus,
  SettingHomeSorting,
  Subject,
  SubjectId,
  SubjectType,
  SubjectTypeValue,
  SubjectTypeCn,
  SettingHomeLayout
} from '@types'
import bangumiData from '@assets/json/thirdParty/bangumiData.min.json'
import {
  OriginItem,
  getOriginConfig,
  replaceOriginUrl
} from '../../user/origin-setting/utils'
import {
  EXCLUDE_STATE,
  INIT_ITEM,
  NAMESPACE,
  PAGE_LIMIT_GRID,
  PAGE_LIMIT_LIST,
  STATE,
  TABS,
  TABS_WITH_GAME
} from './ds'
import { TabLabel } from './types'
import { update } from '@utils/kv'

/** 是否初始化 */
let inited: boolean

/** 是否授权中 */
let reOauthing: boolean

export default class ScreenHomeV2 extends store {
  state = observable(STATE)

  /** 初始化 */
  init = async () => {
    if (inited && !DEV) return

    if (this.isLogin) {
      this.initUser()
      inited = true

      await this.initStore()
      setTimeout(() => {
        this.initFetch()
      }, 4000)
    }

    return true
  }

  /** 初始化状态 */
  initStore = async () => {
    const state = await this.getStorage(NAMESPACE)
    this.setState({
      ...state,
      ...EXCLUDE_STATE,
      renderedTabsIndex: [state?.page || 0],
      _loaded: getTimestamp()
    })
  }

  /** 初始化请求 */
  initFetch = async (refresh: boolean = false) => {
    const { progress } = this.state
    if (progress.fetching) {
      info('正在刷新条目信息')
      return
    }

    let flag = refresh
    let { _loaded } = this.collection
    if (typeof _loaded !== 'number') _loaded = 0
    if (getTimestamp() - _loaded > 60 * 60 * 24 || !this.collection.list.length) {
      flag = true
    }

    // 需要刷新数据
    if (flag) {
      if (await this.initQueue()) return true

      // 可能是 access_token 过期了, 需要重新刷新 access_token
      if (userStore.isWebLogin) {
        if (!reOauthing) {
          reOauthing = true

          // oauth 成功后重新刷新数据
          if (await userStore.reOauth()) {
            reOauthing = false

            t('其他.重新授权')
            return this.initQueue()
          }
          reOauthing = false
        }
      }
    }

    return true
  }

  /** 初始化进度和条目等数据 */
  initQueue = async () => {
    const data = await Promise.all([userStore.fetchCollection()])
    if (data?.[0]?.list?.length) return this.fetchSubjectsQueue(data[0].list)

    return false
  }

  /** 注册设备名 */
  initUser = () => {
    if (inited) return

    setTimeout(() => {
      if (!this.userId || !DEVICE_MODEL_NAME) return false
      update(`u_${this.userId}`, {
        b: Device.brand,
        y: Device.deviceYearClass,
        i: Device.modelId,
        d: Device.modelName,
        o: Device.osVersion,
        m: Device.totalMemory,
        v: VERSION_GITHUB_RELEASE
      })
    }, 8000)
  }

  /** -------------------- fetch -------------------- */
  /** 请求条目信息 */
  fetchSubject = (subjectId: SubjectId, index: number = 0) => {
    let flag = false

    const subject = this.subject(subjectId)
    let { _loaded } = subject
    if (typeof _loaded !== 'number') _loaded = 0

    // 请求间隔至少为 15 分钟
    if (
      subject?._responseGroup !== 'large' ||
      getTimestamp() - _loaded >= 60 * (15 + index)
    ) {
      flag = true
    }

    if (flag) return subjectStore.fetchSubject(subjectId)

    return true
  }

  /** 队列请求条目信息 */
  fetchSubjectsQueue = async (list = []) => {
    const fetchs = this.sortList(list).map(({ subject_id }, index) => async () => {
      await userStore.fetchUserProgress(subject_id)
      return this.fetchSubject(subject_id, index)
    })

    if (fetchs.length) {
      this.setState({
        progress: {
          fetching: true
        }
      })
    }

    await queue(fetchs, 2)
    this.setState({
      progress: EXCLUDE_STATE.progress
    })

    return true
  }

  /** 请求条目收视进度 */
  fetchUserProgress = (subjectId?: SubjectId) => {
    return userStore.fetchUserProgress(subjectId)
  }

  /** 请求在玩的游戏 */
  fetchDoingGames = (refresh?: boolean) => {
    const { username } = this.usersInfo
    return collectionStore.fetchUserCollections(
      {
        userId: username || this.userId,
        subjectType: MODEL_SUBJECT_TYPE.getLabel<SubjectType>('游戏'),
        type: MODEL_COLLECTION_STATUS.getValue<CollectionStatus>('在看'),
        order: MODEL_COLLECTIONS_ORDERBY.getValue<CollectionsOrder>('收藏时间'),
        tag: ''
      },
      refresh
    )
  }

  /** 下拉刷新 */
  onHeaderRefresh = () => {
    if (this.tabsLabel === '游戏') return this.fetchDoingGames(true)
    return this.initFetch(true)
  }

  /** 下一页 */
  onFooterRefresh = () => {
    return this.fetchDoingGames()
  }

  /** -------------------- computed -------------------- */
  /** Tabs data */
  @computed get tabs() {
    const { showGame } = systemStore.setting
    return showGame ? TABS_WITH_GAME : TABS
  }

  /** 启动页 */
  @computed get initialPage() {
    return systemStore.setting.initialPage
  }

  /** 章节热力图 */
  @computed get heatMap() {
    return systemStore.setting.heatMap
  }

  /** 首页收藏布局 */
  @computed get homeLayout() {
    return systemStore.setting.homeLayout
  }

  /** 首页收藏排序 */
  @computed get homeSorting() {
    return systemStore.setting.homeSorting
  }

  /** 首页条目显示搜索源头 */
  @computed get homeOrigin() {
    return systemStore.setting.homeOrigin
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
      if (title === '游戏') return this.games

      const data = {
        ...this.collection
      }

      // 过滤条目类型
      const type = MODEL_SUBJECT_TYPE.getValue<SubjectTypeValue>(title)
      if (type) data.list = data.list.filter(item => item?.subject?.type == type)

      // 若当前Tab有文字过滤
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

      data.list = this.sortList(data.list)
      return data
    }).get()
  }

  /**
   * 列表排序
   * 章节排序: 放送中还有未看 > 放送中没未看 > 明天放送还有未看 > 明天放送中没未看 > 未完结新番还有未看 > 默认排序
   */
  sortList = (list = []) => {
    return computed(() => {
      if (!list.length) return []

      // 网页顺序: 不需要处理
      if (
        this.homeSorting ===
        MODEL_SETTING_HOME_SORTING.getValue<SettingHomeSorting>('网页')
      ) {
        return list.sort((a, b) =>
          desc(a, b, item => this.topMap[item.subject_id] || 0)
        )
      }

      try {
        const { homeSortSink } = systemStore.setting

        // 计算每一个条目看过ep的数量
        const weightMap = {}

        // 放送顺序: 根据今天星期几, 每天递减, 放送中的番剧优先
        if (this.sortOnAir) {
          const day = new Date().getDay()
          list.forEach(item => {
            const { subject_id: subjectId } = item
            const { weekDay, isExist } = this.onAirCustom(subjectId)
            if (!isExist) {
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
            .sort((a, b) => desc(a, b, item => weightMap[item.subject_id]))
            .sort((a, b) => desc(a, b, item => this.topMap[item.subject_id] || 0))
        }

        // APP 顺序
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
          .sort((a, b) => desc(a, b, item => weightMap[item.subject_id]))
          .sort((a, b) => desc(a, b, item => this.topMap[item.subject_id] || 0))
      } catch (error) {
        console.error(`[${NAMESPACE}] sortList`, error)

        // fallback
        return list
          .sort((a, b) => desc(a, b, item => this.isToday(item.subject_id)))
          .sort((a, b) => desc(a, b, item => this.topMap[item.subject_id] || 0))
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

  /** 置顶的映射 */
  @computed get topMap() {
    const { top } = this.state
    const topMap = {}
    top.forEach((subjectId, order) => (topMap[subjectId] = order + 1))
    return topMap
  }

  /** 在玩的游戏 */
  @computed get games() {
    const { username } = this.usersInfo
    const userCollections = collectionStore.userCollections(
      username || this.userId,
      MODEL_SUBJECT_TYPE.getLabel<SubjectType>('游戏'),
      MODEL_COLLECTION_STATUS.getValue<CollectionStatus>('在看')
    )
    return {
      ...userCollections,
      list: userCollections.list
        .filter(item => {
          if (!this.filter.length) return true

          const cn = (item.nameCn || item.name || '').toUpperCase()
          if (cn.includes(this.filter)) return true

          return getPinYinFilterValue(cn, this.filter)
        })
        .sort((a, b) => desc(a, b, item => this.topMap[item.id] || 0))
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
    try {
      return computed(() => {
        const eps = this.epsNoSp(subjectId)
        const { length } = eps

        // 集数超过了1页的显示个数
        const isGrid =
          this.homeLayout ===
          MODEL_SETTING_HOME_LAYOUT.getValue<SettingHomeLayout>('网格')
        if (length > (isGrid ? PAGE_LIMIT_GRID : PAGE_LIMIT_LIST)) {
          const userProgress = this.userProgress(subjectId)
          const index = eps.findIndex(item => userProgress[item.id] !== '看过')

          // 找不到未看集数, 返回最后的数据
          if (index === -1) {
            return eps.slice(length - PAGE_LIMIT_LIST - 1, length - 1)
          }

          const { homeEpStartAtLastWathed } = systemStore.setting

          // @ts-expect-error
          if (homeEpStartAtLastWathed && typeof eps.findLastIndex === 'function') {
            // @ts-expect-error
            const lastIndex = eps.findLastIndex(
              item => userProgress[item.id] === '看过'
            )
            return eps.slice(Math.max(lastIndex, 0), lastIndex + PAGE_LIMIT_LIST)
          }

          // 找到第1个未看过的集数, 返回1个看过的集数和剩余的集数
          // 注意这里第一个值不能小于0, 不然会返回空
          return eps.slice(Math.max(index - 1, 0), index + PAGE_LIMIT_LIST - 1)
        }
        return eps
      }).get()
    } catch (error) {
      console.error(NAMESPACE, 'eps', error)
      return []
    }
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
      return (
        this.epsNoSp(subjectId)
          .reverse()
          .find(item => item.status === 'Air')?.sort || 0
      )
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
      if (item) return item.sort

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
    return (
      this.homeSorting ===
      MODEL_SETTING_HOME_SORTING.getValue<SettingHomeSorting>('放送')
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
      const { weekDay, isExist } = this.onAirCustom(subjectId)
      if (!isExist) return false

      const day = new Date().getDay()
      return weekDay === day
    }).get()
  }

  /** 是否明天放送 */
  isNextDay(subjectId: SubjectId) {
    return computed(() => {
      const { weekDay, isExist } = this.onAirCustom(subjectId)
      if (!isExist) return false

      const day = new Date().getDay()
      return day === 6 ? weekDay === 0 : day === weekDay - 1
    }).get()
  }

  /** bangumi-data 数据扩展 */
  bangumiInfo(subjectId: SubjectId) {
    return computed(() => {
      const { name_cn, name } = this.subject(subjectId)
      return unzipBangumiData(
        bangumiData.find(
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

  /** -------------------- methods -------------------- */
  /** 标签页切换 */
  onChange = (page: number) => {
    t('首页.标签页切换', {
      page
    })

    const renderedTabsIndex = [...this.state.renderedTabsIndex]
    if (!renderedTabsIndex.includes(page)) renderedTabsIndex.push(page)

    const state: {
      page: number
      grid?: typeof EXCLUDE_STATE.grid
      renderedTabsIndex: number[]
    } = {
      page,
      renderedTabsIndex
    }

    if (page === 4) state.grid = EXCLUDE_STATE.grid
    this.setState(state)
    this.setStorage(NAMESPACE)
  }

  /**
   * 显示收藏管理 <Modal>
   * @param {*} subjectId
   * @param {*} modal 游戏没有主动请求条目数据, 需要手动传递标题
   */
  showManageModal = (subjectId: SubjectId, modal?: typeof EXCLUDE_STATE.modal) => {
    t('首页.显示收藏管理', {
      subjectId
    })

    this.setState({
      visible: true,
      subjectId,
      modal: modal || EXCLUDE_STATE.modal
    })
  }

  /** 隐藏收藏管理 <Modal> */
  closeManageModal = () => {
    this.setState({
      visible: false,
      modal: EXCLUDE_STATE.modal
    })
  }

  /** 展开或收起 <Item> */
  itemToggleExpand = (subjectId: SubjectId) => {
    t('首页.展开或收起条目', {
      subjectId
    })

    const state = this.$Item(subjectId)
    const { expand } = state
    this.setState({
      item: {
        [subjectId]: {
          ...state,
          expand: !expand
        }
      }
    })
    this.setStorage(NAMESPACE)

    if (!expand) {
      this.fetchSubject(subjectId)
      this.fetchUserProgress(subjectId)
    }
  }

  /** 置顶或取消置顶 <Item> */
  itemToggleTop = (subjectId: SubjectId, isTop?: boolean) => {
    t('首页.置顶或取消置顶', {
      subjectId,
      isTop
    })

    const { top } = this.state
    const _top = [...top]
    const index = _top.indexOf(subjectId)
    if (index === -1) {
      _top.push(subjectId)
    } else {
      _top.splice(index, 1)

      // 再置顶
      if (isTop) _top.push(subjectId)
    }

    this.setState({
      top: _top
    })
    this.setStorage(NAMESPACE)
  }

  /** 全部展开 (书籍不展开, 展开就收不回去了) */
  expandAll = () => {
    t('首页.全部展开')

    const item = {}
    this.collection.list.forEach(({ subject_id: subjectId, subject }) => {
      const type = MODEL_SUBJECT_TYPE.getTitle(subject.type)
      if (type !== '书籍') {
        item[subjectId] = {
          expand: true,
          doing: false
        }
      }
    })
    this.setState({
      item
    })
    this.setStorage(NAMESPACE)
  }

  /** 全部关闭 */
  closeAll = () => {
    t('首页.全部关闭')

    this.clearState('item')
    this.setStorage(NAMESPACE)
  }

  /** @deprecated 选择布局 */
  selectLayout = (title: string) => {
    t('首页.选择布局', {
      title
    })

    this.setState({
      grid: title === '方格布局'
    })
    this.setStorage(NAMESPACE)
  }

  /** 格子布局条目选择 */
  selectGirdSubject = (subjectId: SubjectId, grid?: typeof EXCLUDE_STATE.grid) => {
    t('首页.格子布局条目选择', {
      subjectId
    })

    this.setState({
      current: subjectId,
      grid: grid || EXCLUDE_STATE.grid
    })
    this.setStorage(NAMESPACE)
  }

  scrollToIndex = {}

  /** 底部 <TabBar> 再次点击滚动到顶并刷新数据 */
  connectRef = (
    ref: {
      scrollToIndex: any
    },
    index: string | number
  ) => {
    if (!this.scrollToIndex[index] && ref?.scrollToIndex) {
      this.scrollToIndex[index] = ref?.scrollToIndex
    }
  }

  /** 刷新并返回到顶部 */
  onRefreshThenScrollTop = () => {
    try {
      const { page } = this.state
      if (typeof this.scrollToIndex[page] === 'function') {
        t('其他.刷新到顶', {
          screen: 'Home'
        })

        this.scrollToIndex[page]({
          animated: true,
          index: 0,
          viewOffset: 8000
        })
        setTimeout(() => {
          feedback()
        }, 400)

        this.onHeaderRefresh()
      }
    } catch (error) {
      console.error('Home', 'onRefreshThenScrollTop', error)
    }
  }

  /** 在线源头选择 */
  onlinePlaySelected = (label: string, subjectId: SubjectId) => {
    const { name_cn, name, type } = this.subject(subjectId)

    t('首页.搜索源', {
      type: label,
      subjectId,
      subjectType: type
    })

    try {
      let url: string

      // AGE动漫，有自维护id数据，优先匹配
      // if (label === 'AGE动漫') {
      //   if (find(subjectId).ageId) {
      //     url = `${SITE_AGEFANS()}/detail/${find(subjectId).ageId}`
      //   }
      // }

      // 匹配用户自定义源头
      if (!url) {
        const find = this.onlineOrigins(subjectId).find(item =>
          typeof item === 'object' ? item.name === label : false
        ) as OriginItem
        if (find) {
          if (label === '萌番组' && find.id) {
            copy(HTMLDecode(name_cn || name))
            setTimeout(() => {
              open(find.url)
            }, 1600)
            return
          }

          url = replaceOriginUrl(find.url, {
            CN: HTMLDecode(name_cn || name),
            JP: HTMLDecode(name || name_cn),
            ID: subjectId
          })
        }
      }

      if (!url) {
        const bangumiInfo = this.bangumiInfo(subjectId)
        const { sites = [] } = bangumiInfo
        const cn = HTMLDecode(name_cn || name)
        let item

        switch (label) {
          case 'AGE动漫':
            url = `${SITE_AGEFANS()}/search?query=${encodeURIComponent(cn)}&page=1`
            break

          default:
            item = sites.find(item => item.site === label)
            if (item) url = getBangumiUrl(item)
            break
        }
      }

      if (url) open(url)
    } catch (error) {
      console.error(NAMESPACE, 'onlinePlaySelected', error)
    }
  }

  /** 跳转到条目页面 */
  onItemPress = (navigation: Navigation, subjectId: SubjectId, subject: Subject) => {
    t('首页.跳转', {
      to: 'Subject',
      from: 'list'
    })

    navigation.push('Subject', {
      subjectId,
      _jp: subject.name,
      _cn: subject.name_cn || subject.name,
      _image: subject?.images?.medium || '',
      _collection: '在看',
      _type: MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subject.type)
    })
  }

  /** 设置应用初始页面 */
  updateInitialPage = (navigation: Navigation) => {
    if (this.initialPage === MODEL_SETTING_INITIAL_PAGE.getValue('进度')) {
      return this.init()
    }

    if (this.initialPage === MODEL_SETTING_INITIAL_PAGE.getValue('小圣杯')) {
      return navigation.push('Tinygrail')
    }
  }

  /** 页面筛选文字变化 */
  onFilterChange = debounce((filter: string) => {
    const { page } = this.state
    this.setState({
      filter: filter.trim(),
      filterPage: page
    })
  }, 800)

  /** 菜单点击 */
  onPopover = (label: string, subjectId: SubjectId) => {
    const actions = this.actions(subjectId)
    if (actions.length) {
      const find = actions.find(item => item.name === label)
      if (find) {
        open(find.url, true)

        t('其他.自定义跳转', {
          from: 'HomeTab',
          key: `${subjectId}|${find.name}|${find.url}`
        })
        return
      }
    }

    switch (label) {
      case '置顶':
        this.itemToggleTop(subjectId, true)
        break

      case '取消置顶':
        this.itemToggleTop(subjectId, false)
        break

      case '全部展开':
        this.expandAll()
        break

      case '全部收起':
        this.closeAll()
        break

      case '一键添加提醒':
        this.doBatchSaveCalenderEvent(subjectId)
        break

      default:
        this.onlinePlaySelected(label, subjectId)
        break
    }
  }

  /** -------------------- action -------------------- */
  /** 观看下一章节 */
  doWatchedNextEp = async (subjectId: SubjectId) => {
    const state = this.$Item(subjectId)
    if (state.doing) return

    this.setState({
      item: {
        [subjectId]: {
          ...state,
          doing: true
        }
      }
    })

    // 更新最新章节数据
    await userStore.fetchUserProgress(subjectId)
    t('首页.观看下一章节', {
      subjectId
    })

    const { id } = this.nextWatchEp(subjectId)
    await userStore.doUpdateEpStatus({
      id,
      status: MODEL_EP_STATUS.getValue('看过')
    })

    this.setState({
      item: {
        [subjectId]: {
          ...state,
          doing: false
        }
      }
    })
    feedback()

    userStore.fetchCollectionSingle(subjectId)
    userStore.fetchUserProgress(subjectId)
  }

  /** 更新书籍下一个章节 */
  doUpdateNext = (subjectId: SubjectId, epStatus?: string, volStatus?: string) => {
    t('首页.更新书籍下一个章节', {
      subjectId
    })

    collectionStore.doUpdateSubjectEp(
      {
        subjectId,
        watchedEps: epStatus,
        watchedVols: volStatus
      },
      () => {
        feedback()
        userStore.fetchCollectionSingle(subjectId)
      }
    )
  }

  /** 管理收藏 */
  doUpdateCollection = async (
    values: Parameters<typeof collectionStore.doUpdateCollection>[0]
  ) => {
    t('首页.管理收藏', {
      subjectId: values.subjectId
    })

    await collectionStore.doUpdateCollection(values)
    feedback()

    // 不是在看的话要删掉对应条目信息
    if (values.status !== MODEL_COLLECTION_STATUS.getValue<RatingStatus>('在看')) {
      userStore.removeCollection(values.subjectId)
    }

    this.closeManageModal()
  }

  /** 章节菜单操作 */
  doEpsSelect = async (
    value: string,
    item: {
      id: any
      sort: number
      url: any
      name: any
      name_cn: any
      duration: any
      airdate: any
      desc: any
    },
    subjectId: SubjectId,
    navigation: Navigation
  ) => {
    if (value === '添加提醒') {
      const subject = this.subject(subjectId)
      saveCalenderEvent(
        item,
        cnjp(subject.name_cn, subject.name),
        this.onAirCustom(subjectId)
      )

      t('其他.添加日历', {
        subjectId,
        sort: item?.sort || 0,
        from: 'Home'
      })
      return
    }

    const status = MODEL_EP_STATUS.getValue<EpStatus>(value)
    if (status) {
      t('首页.章节菜单操作', {
        title: '更新收视进度',
        subjectId,
        status
      })

      // 更新收视进度
      await userStore.doUpdateEpStatus({
        id: item.id,
        status
      })
      feedback()

      userStore.fetchCollectionSingle(subjectId)
      userStore.fetchUserProgress(subjectId)
    }

    if (value === '看到') {
      t('首页.章节菜单操作', {
        title: '批量更新收视进度',
        subjectId
      })

      // 批量更新收视进度
      const eps = (this.eps(subjectId) || [])
        .filter(i => i.type === 0)
        .sort((a, b) => asc(a, b, item => item.sort || 0))
      let sort
      if (eps?.[0]?.sort < 10) {
        // [0].sort从小于10开始的番剧都认为是非多季番, 直接使用正常sort去更新
        sort = Math.max(item.sort - 1, 0)
      } else {
        // 多季度非1开始的番不能直接使用sort, 需要把sp去除后使用当前item.sort查找index
        sort = eps.findIndex(i => i.sort === item.sort)
      }

      await userStore.doUpdateSubjectWatched({
        subjectId,
        sort: sort === -1 ? item.sort : sort + 1
      })
      feedback()

      userStore.fetchCollectionSingle(subjectId)
      userStore.fetchUserProgress(subjectId)
    }

    // iOS是本集讨论, 安卓是(+N)...
    if (value.includes('本集讨论') || value.includes('(+')) {
      t('首页.章节菜单操作', {
        title: '本集讨论',
        subjectId
      })

      // 数据占位
      const subject = this.subject(subjectId)
      appNavigate(
        item.url || `/ep/${item.id}`,
        navigation,
        {
          _title: `ep${item.sort}.${item.name || item.name_cn}`,
          _group: subject.name || subject.name_cn,
          _groupThumb: getCoverMedium((subject.images || {})?.medium),
          _desc: `时长:${item.duration} / 首播:${item.airdate}<br />${(
            item.desc || ''
          ).replace(/\r\n/g, '<br />')}`
        },
        {
          id: '首页.跳转'
        }
      )
    }
  }

  /** @deprecated 章节按钮长按 */
  doEpsLongPress = async (
    {
      id
    }: {
      id: EpId
    },
    subjectId: SubjectId
  ) => {
    t('首页.章节按钮长按', {
      subjectId
    })

    const userProgress = this.userProgress(subjectId)
    let status: EpStatus
    if (userProgress[id]) {
      // 已观看 -> 撤销
      status = MODEL_EP_STATUS.getValue<EpStatus>('撤销')
    } else {
      // 未观看 -> 看过
      status = MODEL_EP_STATUS.getValue<EpStatus>('看过')
    }

    await userStore.doUpdateEpStatus({
      id,
      status
    })
    feedback()

    userStore.fetchCollectionSingle(subjectId)
    userStore.fetchUserProgress(subjectId)
  }

  /** 批量添加提醒 */
  doBatchSaveCalenderEvent = async (subjectId: SubjectId) => {
    const eps = this.epsNoSp(subjectId)
    if (eps.length) {
      const subject = this.subject(subjectId)
      const eps = subject.eps.filter(item => item.status === 'NA')
      if (!eps.length) {
        info('已没有未放送的章节')
        return
      }

      const data = await calendarEventsRequestPermissions()
      if (data !== 'authorized') {
        info('权限不足')
        return
      }

      const title = cnjp(subject.name_cn, subject.name)
      confirm(
        `「${title}」\n是否一键添加 ${eps.length} 个章节的提醒?`,
        async () => {
          const onAir = this.onAirCustom(subjectId)
          const fns = []
          const hide = loading()
          const calendarTitles = await calendarGetEventsAsync()
          eps.forEach(item => {
            // 日历中相同的标题不再添加日程
            if (!calendarTitles.includes(getCalenderEventTitle(item, title))) {
              fns.push(async () => {
                await sleep(IOS ? 80 : 480)
                saveCalenderEvent(item, title, onAir, false)
                return true
              })
            }
          })

          await queue(fns, 1)
          hide()
          info('已完成')
          feedback()

          t('其他.批量添加日历', {
            subjectId,
            length: fns.length
          })
        },
        '一键添加放送提醒'
      )
    }
  }
}
