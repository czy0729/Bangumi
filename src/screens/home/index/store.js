/*
 * @Author: czy0729
 * @Date: 2019-03-21 16:49:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-26 14:07:07
 */
import { InteractionManager } from 'react-native'
import { observable, computed } from 'mobx'
import {
  _,
  userStore,
  subjectStore,
  collectionStore,
  calendarStore,
  systemStore
} from '@stores'
import { Eps } from '@screens/_'
import { t, queue } from '@utils/fetch'
import { x18, appNavigate, getCoverMedium } from '@utils/app'
import store from '@utils/store'
import { IOS } from '@constants'
import {
  MODEL_SUBJECT_TYPE,
  MODEL_EP_STATUS,
  MODEL_COLLECTION_STATUS,
  MODEL_SETTING_HOME_SORTING
} from '@constants/model'

export const tabs = [
  {
    title: '全部'
  },
  {
    title: '动画'
  },
  {
    title: '书籍'
  },
  {
    title: '三次元'
  }
]
const namespace = 'ScreenHome'
const initItem = {
  expand: false,
  doing: false
}
const day = new Date().getDay()

export default class ScreenHome extends store {
  state = observable({
    _loaded: false, // 本地数据读取完成

    /**
     * base
     */
    visible: false, // <Modal>可见性
    subjectId: 0, // <Modal>当前条目Id
    page: 0, // <Tabs>当前页数
    _page: 0, // header上的假<Tabs>当前页数
    top: [], // <Item>置顶记录
    item: {
      // [subjectId]: initItem // 每个<Item>的状态
    },

    /**
     * layout
     */
    grid: false, // [废弃]
    current: 0
  })

  init = async () => {
    let res
    if (this.isLogin) {
      res = this.getStorage(undefined, namespace)
      const state = await res
      this.setState({
        ...state,
        _loaded: true
      })
      this.initFetch()
    }

    InteractionManager.runAfterInteractions(() => {
      userStore.logTourist()
      calendarStore.fetchOnAir()
    })

    return res
  }

  initFetch = async refresh => {
    const res = Promise.all([
      userStore.fetchUserCollection(),
      userStore.fetchUserProgress()
    ])
    const data = await res

    if (data[0]) {
      /**
       * 被动请求
       * 由于Bangumi没提供一次性查询多个章节信息的API, 暂时每项都发一次请求
       * cloudfare请求太快会被拒绝
       */
      InteractionManager.runAfterInteractions(() => {
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

  onHeaderRefresh = () => this.initFetch(true)

  // -------------------- get --------------------
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

  @computed get itemShadow() {
    return IOS ? true : systemStore.setting.itemShadow
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

  /**
   * 列表当前数据
   */
  currentUserCollection(title) {
    return computed(() => {
      const userCollection = {
        ...this.userCollection
      }
      const type = MODEL_SUBJECT_TYPE.getValue(title)
      if (type) {
        userCollection.list = userCollection.list.filter(
          item => item.subject.type == type
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
        if (length > Eps.pageLimit) {
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

  // -------------------- page --------------------
  /**
   * 标签页点击
   * @issue onTabClick与onChange在用受控模式的时候, 有冲突
   * 暂时这样解决
   */
  onTabClick = (item, page) => {
    if (page === this.state.page) {
      return
    }

    t('首页.标签页点击', {
      page
    })
    this.setState({
      page
    })

    // @issue onTabClick与onChange在用受控模式的时候有冲突, 暂时这样解决
    setTimeout(() => {
      this.setState({
        _page: page
      })
      this.setStorage(undefined, undefined, namespace)
    }, 400)
  }

  onChange = (item, page) => {
    if (page === this.state.page) {
      return
    }

    t('首页.标签页切换', {
      page
    })
    this.setState({
      page,
      _page: page
    })
    this.setStorage(undefined, undefined, namespace)
  }

  /**
   * 列表排序
   * 章节排序: 放送中还有未看 > 放送中没未看 > 明天放送还有未看 > 明天放送中没未看 > 未完结新番还有未看 > 默认排序
   */
  sortList = (list = []) => {
    if (this.homeSorting === MODEL_SETTING_HOME_SORTING.getValue('网页')) {
      return list
    }

    // 置顶排序
    const { top } = this.state
    const topMap = {}
    top.forEach((subjectId, order) => (topMap[subjectId] = order + 1))

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
   */
  showManageModal = subjectId => {
    t('首页.显示收藏管理', {
      subjectId
    })

    this.setState({
      visible: true,
      subjectId
    })
  }

  /**
   * 隐藏收藏管理<Modal>
   */
  closeManageModal = () => {
    this.setState({
      visible: false
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
  selectGirdSubject = subjectId => {
    t('首页.格子布局条目选择', {
      subjectId
    })

    this.setState({
      current: subjectId
    })
    this.setStorage(undefined, undefined, namespace)
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
      userStore.fetchUserCollection()
      userStore.fetchUserProgress(subjectId)
    }

    if (value === '看到') {
      t('首页.章节菜单操作', {
        title: '批量更新收视进度',
        subjectId
      })

      /**
       * 批量更新收视进度
       * @issue 多季度非1开始的番不能直接使用sort, 需要把sp去除后使用当前item.sort查找index
       */
      const sort = (this.eps(subjectId) || [])
        .filter(i => i.type === 0)
        .sort((a, b) => (a.sort || 0) - (b.sort || 0))
        .findIndex(i => i.sort === item.sort)
      await userStore.doUpdateSubjectWatched({
        subjectId,
        sort: sort === -1 ? item.sort : sort + 1
      })
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
    userStore.fetchUserCollection()
    userStore.fetchUserProgress(subjectId)
  }
}
