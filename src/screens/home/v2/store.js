/*
 * @Author: czy0729
 * @Date: 2019-03-21 16:49:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-29 15:39:43
 */
import React from 'react'
import { observable, computed } from 'mobx'
import { Modal } from '@ant-design/react-native'
import { Text } from '@components'
import { Eps } from '@screens/_'
import {
  _,
  userStore,
  subjectStore,
  collectionStore,
  calendarStore,
  systemStore
} from '@stores'
import { open, runAfter } from '@utils'
import { t, queue } from '@utils/fetch'
import {
  x18,
  appNavigate,
  getCoverMedium,
  getBangumiUrl,
  unzipBangumiData
} from '@utils/app'
import store from '@utils/store'
import { HTMLDecode } from '@utils/html'
import { feedback } from '@utils/ui'
import { find } from '@utils/anime'
import { IOS, DEV, SITES_DS } from '@constants'
import {
  MODEL_SUBJECT_TYPE,
  MODEL_EP_STATUS,
  MODEL_COLLECTION_STATUS,
  MODEL_COLLECTIONS_ORDERBY,
  MODEL_SETTING_INITIAL_PAGE,
  MODEL_SETTING_HOME_SORTING,
  MODEL_SETTING_HOME_LAYOUT
} from '@constants/model'
import { SITE_AGEFANS, SITE_XUNBO, SITE_RRYS } from '@constants/site'
import bangumiData from '@constants/json/thirdParty/bangumiData.min.json'

const tabs = [
  {
    key: 'all',
    title: '全部'
  },
  {
    key: 'anime',
    title: '动画'
  },
  {
    key: 'book',
    title: '书籍'
  },
  {
    key: 'real',
    title: '三次元'
  }
]
export const tabsWithGame = [
  ...tabs,
  {
    key: 'game',
    title: '游戏'
  }
]
export const H_TABBAR = 48

const namespace = 'ScreenHomeV2'
const colorDark = {
  color: _.colorDark
}
const initItem = {
  expand: false,
  doing: false
}
const excludeState = {
  modal: {
    title: '',
    desc: ''
  },
  grid: {
    subject_id: 0,
    subject: {},
    ep_status: ''
  },
  isFocused: true,
  _mounted: false
}
const day = new Date().getDay()

export default class ScreenHomeV2 extends store {
  state = observable({
    visible: false, // <Modal>可见性
    subjectId: 0, // <Modal>当前条目Id
    page: 0, // <Tabs>当前页数
    top: [], // <Item>置顶记录
    item: {
      // [subjectId]: initItem // 每个<Item>的状态
    },
    current: 0,
    ...excludeState,
    _loaded: false // 本地数据读取完成
  })

  init = async () => {
    let res
    if (this.isLogin) {
      res = this.getStorage(undefined, namespace)
      const state = await res
      this.setState({
        ...state,
        ...excludeState,
        _loaded: true
      })
      this.initFetch()
    }

    runAfter(() => {
      userStore.logTourist()
      calendarStore.fetchOnAir()

      // 延迟加载标记
      setTimeout(() => {
        this.setState({
          _mounted: true
        })
      }, 80)
    })

    return res
  }

  initFetch = async refresh => {
    const res = Promise.all([
      userStore.fetchUserCollection(),
      userStore.fetchUserProgress()
    ])
    const data = await res

    if (data[0] && !DEV) {
      /**
       * 被动请求
       * 由于Bangumi没提供一次性查询多个章节信息的API, 暂时每项都发一次请求
       * cloudfare请求太快会被拒绝
       */
      runAfter(() => {
        const fetchs = []
        this.sortList(data[0]).forEach(({ subject_id: subjectId }) => {
          const { _loaded } = this.subject(subjectId)
          if (refresh || !_loaded) {
            fetchs.push(() => subjectStore.fetchSubject(subjectId))
          }
        })
        queue(fetchs, 1)
      })
    }
    return res
  }

  onHeaderRefresh = () => {
    if (this.tabsLabel === '游戏') {
      return this.fetchDoingGames(true)
    }
    return this.initFetch(true)
  }

  onFooterRefresh = () => this.fetchDoingGames()

  fetchDoingGames = refresh => {
    const { username } = this.usersInfo
    return collectionStore.fetchUserCollections(
      {
        userId: username || this.userId,
        subjectType: MODEL_SUBJECT_TYPE.getLabel('游戏'),
        type: MODEL_COLLECTION_STATUS.getValue('在看'),
        order: MODEL_COLLECTIONS_ORDERBY.getValue('收藏时间'),
        tag: ''
      },
      refresh
    )
  }

  // -------------------- get --------------------
  @computed get tabs() {
    const { showGame } = systemStore.setting
    return showGame ? tabsWithGame : tabs
  }

  @computed get title() {
    const { page } = this.state
    const { title } = tabs[page]
    return title
  }

  @computed get backgroundColor() {
    return _.select(_.colorPlain, _._colorDarkModeLevel1)
  }

  @computed get initialPage() {
    return systemStore.setting.initialPage
  }

  @computed get heatMap() {
    return systemStore.setting.heatMap
  }

  @computed get homeLayout() {
    return systemStore.setting.homeLayout
  }

  @computed get homeSorting() {
    return systemStore.setting.homeSorting
  }

  @computed get homeOrigin() {
    return systemStore.setting.homeOrigin
  }

  @computed get itemShadow() {
    return IOS ? true : systemStore.setting.itemShadow
  }

  @computed get myUserId() {
    return userStore.myUserId
  }

  @computed get usersInfo() {
    return userStore.usersInfo(this.myUserId)
  }

  @computed get tabsLabel() {
    const { page } = this.state
    return this.tabs[page].title
  }

  /**
   * <Item />
   */
  $Item(subjectId) {
    return computed(() => this.state.item[subjectId] || initItem).get()
  }

  /**
   * 用户是否登陆
   */
  @computed get isLogin() {
    return userStore.isLogin
  }

  /**
   * 用户信息
   */
  @computed get userInfo() {
    return userStore.userInfo
  }

  /**
   * 用户收藏
   */
  @computed get userCollection() {
    const { userCollection } = userStore
    if (userStore.isLimit) {
      return {
        ...userCollection,
        list: userCollection.list.filter(item => !x18(item.subject_id))
      }
    }
    return userCollection
  }

  @computed get games() {
    const { username } = this.usersInfo
    return collectionStore.userCollections(
      username || this.userId,
      MODEL_SUBJECT_TYPE.getLabel('游戏'),
      MODEL_COLLECTION_STATUS.getValue('在看')
    )
  }

  /**
   * 列表当前数据
   */
  currentUserCollection(title) {
    if (title === '游戏') {
      return this.games
    }

    return computed(() => {
      const userCollection = {
        ...this.userCollection
      }
      const type = MODEL_SUBJECT_TYPE.getValue(title)
      if (type) {
        userCollection.list = userCollection.list.filter(
          item => item?.subject?.type == type
        )
      }
      userCollection.list = this.sortList(userCollection.list)
      return userCollection
    }).get()
  }

  /**
   * 用户条目收视进度
   */
  userProgress(subjectId) {
    return computed(() => userStore.userProgress(subjectId)).get()
  }

  /**
   * 条目信息
   */
  subject(subjectId) {
    return computed(() => subjectStore.subject(subjectId)).get()
  }

  /**
   * 条目章节
   */
  // subjectEp(subjectId) {
  //   return computed(() => subjectStore.subjectEp(subjectId)).get()
  // }

  /**
   * 条目章节数据
   */
  eps(subjectId) {
    try {
      return computed(() => {
        const eps = this.subject(subjectId).eps || []
        const { length } = eps

        // 集数超过了1页的显示个数
        const isGrid =
          this.homeLayout === MODEL_SETTING_HOME_LAYOUT.getValue('网格')
        if (length > (isGrid ? 24 : Eps.pageLimit)) {
          const userProgress = this.userProgress(subjectId)
          const index = eps.findIndex(
            item => item.type === 0 && userProgress[item.id] !== '看过'
          )

          // 找不到未看集数, 返回最后的数据
          if (index === -1) {
            return eps.slice(length - Eps.pageLimit - 1, length - 1)
          }

          // 找到第1个未看过的集数, 返回1个看过的集数和剩余的集数
          // @notice 注意这里第一个值不能小于0, 不然会返回空
          return eps.slice(index < 1 ? 0 : index - 1, index + Eps.pageLimit - 1)
        }
        return eps
      }).get()
    } catch (error) {
      warn(namespace, 'eps', error)
      return []
    }
  }

  /**
   * 条目下一个未看章节
   */
  nextWatchEp(subjectId) {
    try {
      return computed(() => {
        const eps = this.eps(subjectId) || []
        const userProgress = this.userProgress(subjectId)
        const index = eps.findIndex(
          item => item.type === 0 && userProgress[item.id] !== '看过'
        )
        if (index === -1) {
          return {}
        }
        return eps[index]
      }).get()
    } catch (error) {
      warn(namespace, 'nextWatchEp', error)
      return {}
    }
  }

  /**
   * 条目观看进度百分比
   */
  // percent(subjectId, subject = {}) {
  //   return computed(() => {
  //     const eps = this.eps(subjectId)
  //     if (!subject.eps_count || !eps.length) {
  //       return 0
  //     }

  //     // 排除SP章节
  //     let watchedCount = 0
  //     const userProgress = this.userProgress(subjectId)
  //     try {
  //       const epsWithoutSP = eps.filter(item => item.type === 0)
  //       epsWithoutSP.forEach(item => {
  //         if (userProgress[item.id] === '看过') {
  //           // 这里很坑, 有一些是多季度不是1开始的番, 还有一些是只显示4行的超长番组, 很容易混淆
  //           if (
  //             watchedCount === 0 &&
  //             item.sort !== 1 &&
  //             epsWithoutSP.length >= 32
  //           ) {
  //             watchedCount += parseInt(item.sort)
  //           } else {
  //             watchedCount += 1
  //           }
  //         }
  //       })
  //     } catch (error) {
  //       // do nothing
  //     }
  //     return (watchedCount / subject.eps_count) * 100
  //   }).get()
  // }

  @computed get onAir() {
    return calendarStore.onAir
  }

  /**
   * 是否放送中
   */
  isToday(subjectId) {
    return computed(() => {
      // v1
      // const eps = this.eps(subjectId)
      // return eps.findIndex(item => item.status === 'Today') !== -1

      // v2
      const item = this.onAir[subjectId]
      if (!item) {
        return false
      }
      return item.weekDayCN === day || item.weekDayJP === day
    }).get()
  }

  /**
   * 是否明天放送
   */
  isNextDay(subjectId) {
    return computed(() => {
      const item = this.onAir[subjectId]
      if (!item) {
        return false
      }
      return day === 7
        ? item.weekDayCN === 1 || item.weekDayJP === 1
        : item.weekDayCN === day + 1 || item.weekDayJP === day + 1
    }).get()
  }

  /**
   * bangumi-data数据扩展
   * @param {*} subjectId
   */
  bangumiInfo(subjectId) {
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

  onlineOrigins(subjectId) {
    return computed(() => {
      const { type } = this.subject(subjectId)
      const bangumiInfo = this.bangumiInfo(subjectId)
      const { sites = [] } = bangumiInfo
      const _data = []
      const data = [
        ..._data,
        ...sites
          .filter(item => SITES_DS.includes(item.site))
          .map(item => item.site)
      ]
      if (type === 2) {
        data.push('AGE动漫', '迅播动漫')
      }
      if (type === 6) {
        data.push('人人影视')
      }
      return data
    }).get()
  }

  // -------------------- page --------------------
  onChange = page => {
    t('首页.标签页切换', {
      page
    })

    if (page === 4) {
      this.setState({
        page,
        grid: initItem.grid
      })
      this.fetchDoingGames(true)
    } else {
      this.setState({
        page
      })
    }

    this.setStorage(undefined, undefined, namespace)
  }

  /**
   * 列表排序
   * 章节排序: 放送中还有未看 > 放送中没未看 > 明天放送还有未看 > 明天放送中没未看 > 未完结新番还有未看 > 默认排序
   */
  sortList = (list = []) => {
    // 置顶排序
    const { top } = this.state
    const topMap = {}
    top.forEach((subjectId, order) => (topMap[subjectId] = order + 1))

    if (this.homeSorting === MODEL_SETTING_HOME_SORTING.getValue('网页')) {
      return list.sort(
        (a, b) => (topMap[b.subject_id] || 0) - (topMap[a.subject_id] || 0)
      )
    }

    try {
      // 计算每一个条目看过ep的数量
      const weightMap = {}
      list.forEach(item => {
        const { subject_id: subjectId } = item
        const progress = this.userProgress(subjectId)

        let watchedCount = 0
        Object.keys(progress).forEach(i => {
          if (progress[i] === '看过') {
            watchedCount += 1
          }
        })

        const { air = 0 } = this.onAir[subjectId] || {}
        if (this.isToday(subjectId)) {
          weightMap[subjectId] = air > watchedCount ? 100000 : 10000
        } else if (this.isNextDay(subjectId)) {
          weightMap[subjectId] = air > watchedCount ? 1000 : 100
        } else {
          weightMap[subjectId] = air > watchedCount ? 10 : 1
        }
      })
      return list
        .sort((a, b) => weightMap[b.subject_id] - weightMap[a.subject_id])
        .sort(
          (a, b) => (topMap[b.subject_id] || 0) - (topMap[a.subject_id] || 0)
        )
    } catch (error) {
      console.warn(`[${namespace}] sortList`, error)

      // fallback
      return list
        .sort((a, b) => this.isToday(b.subject_id) - this.isToday(a.subject_id))
        .sort(
          (a, b) => (topMap[b.subject_id] || 0) - (topMap[a.subject_id] || 0)
        )
    }
  }

  /**
   * 显示收藏管理<Modal>
   * @param {*} subjectId
   * @param {*} model 游戏没有主动请求条目数据, 需要手动传递标题
   */
  showManageModal = (subjectId, modal) => {
    t('首页.显示收藏管理', {
      subjectId
    })

    this.setState({
      visible: true,
      subjectId,
      modal: modal || initItem.modal
    })
  }

  /**
   * 隐藏收藏管理<Modal>
   */
  closeManageModal = () => {
    this.setState({
      visible: false,
      modal: initItem.modal
    })
  }

  /**
   * <Item>展开或收起
   */
  itemToggleExpand = subjectId => {
    t('首页.展开或收起条目', {
      subjectId
    })

    const state = this.$Item(subjectId)
    this.setState({
      item: {
        [subjectId]: {
          ...state,
          expand: !state.expand
        }
      }
    })
    this.setStorage(undefined, undefined, namespace)
  }

  /**
   * <Item>置顶或取消置顶
   */
  itemToggleTop = (subjectId, isTop) => {
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
      if (isTop) {
        _top.push(subjectId)
      }
    }
    this.setState({
      top: _top
    })
    this.setStorage(undefined, undefined, namespace)
  }

  /**
   * 全部展开 (书籍不要展开, 展开就收不回去了)
   */
  expandAll = () => {
    t('首页.全部展开')

    const item = {}
    this.userCollection.list.forEach(({ subject_id: subjectId, subject }) => {
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
    this.setStorage(undefined, undefined, namespace)
  }

  /**
   * 全部关闭
   */
  closeAll = () => {
    t('首页.全部关闭')

    this.clearState('item')
    this.setStorage(undefined, undefined, namespace)
  }

  /**
   * 选择布局
   */
  selectLayout = title => {
    t('首页.选择布局', {
      title
    })

    this.setState({
      grid: title === '方格布局'
    })
    this.setStorage(undefined, undefined, namespace)
  }

  /**
   * 格子布局条目选择
   */
  selectGirdSubject = (subjectId, grid) => {
    t('首页.格子布局条目选择', {
      subjectId
    })

    this.setState({
      current: subjectId,
      grid: grid || initItem.grid
    })
    this.setStorage(undefined, undefined, namespace)
  }

  /**
   * 底部TabBar再次点击滚动到顶并刷新数据
   */
  scrollToIndex = {}
  connectRef = (ref, index) => {
    this.scrollToIndex[index] = ref?.scrollToIndex
  }

  onRefreshThenScrollTop = () => {
    try {
      const { page } = this.state
      if (typeof this.scrollToIndex[page] === 'function') {
        t('其他.刷新到顶', {
          screen: 'Home'
        })

        this.onHeaderRefresh()
        this.scrollToIndex[page]({
          animated: true,
          index: 0,
          viewOffset: 8000
        })
      }
    } catch (error) {
      warn('Home', 'onRefreshThenScrollTop', error)
    }
  }

  /**
   * 在线源头选择
   * @params {*} label
   */
  onlinePlaySelected = (label, subjectId) => {
    const { name_cn, name, type } = this.subject(subjectId)
    const cn = HTMLDecode(name_cn || name)
    t('首页.搜索源', {
      type: label,
      subjectId,
      subjectType: type
    })

    try {
      const bangumiInfo = this.bangumiInfo(subjectId)
      const { sites = [] } = bangumiInfo
      let item
      let url
      switch (label) {
        case 'AGE动漫':
          if (find(subjectId).aid) {
            url = `${SITE_AGEFANS()}/detail/${find(subjectId).aid}`
          } else {
            url = `${SITE_AGEFANS()}/search?query=${encodeURIComponent(
              cn
            )}&page=1`
          }
          break

        case '迅播动漫':
          url = `${SITE_XUNBO()}/search.php?searchword=${encodeURIComponent(
            cn
          )}`
          break

        case '人人影视':
          url = `${SITE_RRYS()}/search?keyword=${encodeURIComponent(
            cn
          )}&type=resource`
          break

        default:
          item = sites.find(item => item.site === label)
          if (item) {
            url = getBangumiUrl(item)
          }
          break
      }

      if (url) {
        open(url)
      }
    } catch (error) {
      warn(namespace, 'onlinePlaySelected', error)
    }
  }

  onItemPress = (navigation, subjectId, subject) => {
    t('首页.跳转', {
      to: 'Subject',
      from: 'list'
    })

    navigation.push('Subject', {
      subjectId,
      _jp: subject.name,
      _cn: subject.name_cn || subject.name,
      _image: subject?.images?.medium || ''
    })
  }

  onItemLongPress = subjectId => {
    const { top } = this.state
    const isTop = top.indexOf(subjectId) !== -1
    const data = [
      {
        text: <Text style={colorDark}>全部展开</Text>,
        onPress: () =>
          setTimeout(() => {
            this.expandAll()
          }, 40)
      },
      {
        text: <Text style={colorDark}>全部收起</Text>,
        onPress: this.closeAll
      },
      {
        text: <Text style={colorDark}>置顶</Text>,
        onPress: () => this.itemToggleTop(subjectId, true)
      }
    ]
    if (isTop) {
      data.push({
        text: <Text style={colorDark}>取消置顶</Text>,
        onPress: () => this.itemToggleTop(subjectId, false)
      })
    }
    Modal.operation(data)
  }

  /**
   * 设置应用初始页面
   */
  updateInitialPage = navigation => {
    if (this.initialPage === MODEL_SETTING_INITIAL_PAGE.getValue('进度')) {
      this.init()
      return
    }

    if (this.initialPage === MODEL_SETTING_INITIAL_PAGE.getValue('小圣杯')) {
      navigation.push('Tinygrail')
      return
    }

    setTimeout(() => {
      this.setState({
        isFocused: false
      })
      navigation.navigate(this.initialPage)
    }, 0)
  }

  // -------------------- action --------------------
  /**
   * 观看下一章节
   */
  doWatchedNextEp = async subjectId => {
    const state = this.$Item(subjectId)
    if (state.doing) {
      return
    }

    t('首页.观看下一章节', {
      subjectId
    })
    this.setState({
      item: {
        [subjectId]: {
          ...state,
          doing: true
        }
      }
    })

    const { id } = this.nextWatchEp(subjectId)
    await userStore.doUpdateEpStatus({
      id,
      status: MODEL_EP_STATUS.getValue('看过')
    })
    feedback()

    userStore.fetchUserCollection()
    userStore.fetchUserProgress()

    this.setState({
      item: {
        [subjectId]: {
          ...state,
          doing: false
        }
      }
    })
  }

  /**
   * 更新书籍下一个章节
   */
  doUpdateNext = async (subjectId, epStatus, volStatus) => {
    t('首页.更新书籍下一个章节', {
      subjectId
    })

    await collectionStore.doUpdateBookEp({
      subjectId,
      chap: epStatus,
      vol: volStatus
    })
    feedback()

    userStore.fetchUserCollection()
    userStore.fetchUserProgress()
  }

  /**
   * 管理收藏
   */
  doUpdateCollection = async values => {
    t('首页.管理收藏', {
      subjectId: values.subjectId
    })

    await collectionStore.doUpdateCollection(values)
    feedback()

    if (values.status !== MODEL_COLLECTION_STATUS.getValue('在看')) {
      userStore.fetchUserCollection()
    }

    this.closeManageModal()
  }

  /**
   * 章节菜单操作
   */
  doEpsSelect = async (value, item, subjectId, navigation) => {
    const status = MODEL_EP_STATUS.getValue(value)
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

      userStore.fetchUserCollection()
      userStore.fetchUserProgress(subjectId)
    }

    if (value === '看到') {
      t('首页.章节菜单操作', {
        title: '批量更新收视进度',
        subjectId
      })

      // 批量更新收视进度
      let sort
      if (this.subject(subjectId)?.eps?.[0]?.sort < 10) {
        // [0].sort从小于10开始的番剧都认为是非多季番, 直接使用正常sort去更新
        sort = Math.max(item.sort - 1, 0)
      } else {
        // 多季度非1开始的番不能直接使用sort, 需要把sp去除后使用当前item.sort查找index
        sort = (this.eps(subjectId) || [])
          .filter(i => i.type === 0)
          .sort((a, b) => (a.sort || 0) - (b.sort || 0))
          .findIndex(i => i.sort === item.sort)
      }

      await userStore.doUpdateSubjectWatched({
        subjectId,
        sort: sort === -1 ? item.sort : sort + 1
      })
      feedback()

      userStore.fetchUserCollection()
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
        item.url,
        navigation,
        {
          _title: `ep${item.sort}.${item.name || item.name_cn}`,
          _group: subject.name || subject.name_cn,
          _groupThumb: getCoverMedium((subject.images || {}).medium),
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

  /**
   * 章节按钮长按
   */
  doEpsLongPress = async ({ id }, subjectId) => {
    t('首页.章节按钮长按', {
      subjectId
    })

    const userProgress = this.userProgress(subjectId)
    let status
    if (userProgress[id]) {
      // 已观看 -> 撤销
      status = MODEL_EP_STATUS.getValue('撤销')
    } else {
      // 未观看 -> 看过
      status = MODEL_EP_STATUS.getValue('看过')
    }

    await userStore.doUpdateEpStatus({
      id,
      status
    })
    feedback()

    userStore.fetchUserCollection()
    userStore.fetchUserProgress(subjectId)
  }
}
