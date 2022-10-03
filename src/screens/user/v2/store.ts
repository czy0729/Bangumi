/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-04 07:24:22
 */
import { observable, computed } from 'mobx'
import { _, userStore, collectionStore, usersStore, uiStore } from '@stores'
import {
  HTMLDecode,
  debounce,
  feedback,
  getPinYinFilterValue,
  info,
  t2s,
  x18
} from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { fixedRemote } from '@utils/user-setting'
import {
  MODEL_SUBJECT_TYPE,
  MODEL_COLLECTION_STATUS,
  MODEL_COLLECTIONS_ORDERBY
} from '@constants'
import {
  CollectionsOrder,
  CollectionsOrderCn,
  CollectionStatus,
  CollectionStatusCn,
  SubjectType,
  SubjectTypeCn
} from '@types'
import { NAMESPACE, EXCLUDE_STATE, STATE, H_HEADER, TABS } from './ds'
import { Params } from './types'

export default class ScreenUser extends store {
  params: Params

  state = observable(STATE)

  init = async () => {
    const state = (await this.getStorage(NAMESPACE)) || {}
    this.setState({
      ...state,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    // 用户信息
    await this.fetchUsersInfo()

    // 用户收藏概览统计
    userStore.fetchUserCollectionsStatus(this.userId)

    // 用户收藏记录
    const { order } = this.state
    if (MODEL_COLLECTIONS_ORDERBY.getLabel<CollectionsOrderCn>(order) !== '网站评分') {
      this.fetchUserCollections(true)
    }

    // 用户信息 (他人视角)
    this.fetchUsers()

    return true
  }

  // -------------------- fetch --------------------
  /** 用户信息 (自己视角) */
  fetchUsersInfo = () => {
    return userStore.fetchUsersInfo(this.userId)
  }

  /** 用户信息 (他人视角) */
  fetchUsers = () => {
    return usersStore.fetchUsers({
      userId: this.userId
    })
  }

  /** 用户收藏概览 (HTML, 全部) */
  fetchUserCollectionsNormal = async (refresh: boolean = false) => {
    const { subjectType, order, tag } = this.state
    const data = await collectionStore.fetchUserCollections(
      {
        subjectType,
        type: this.type,
        order,
        tag,
        userId: this.username
      },
      refresh
    )

    // 别人的空间
    if (!this.isMe) {
      // 延迟获取收藏中的条目的具体收藏状态
      setTimeout(() => {
        collectionStore.fetchCollectionStatusQueue(
          data.list.filter(item => item.collected).map(item => item.id)
        )
      }, 160)
    }

    return data
  }

  /** 网站评分需要递归请求完所有数据, 再通过本地排序显示 */
  fetchUserCollectionsByScore = async () => {
    const { pagination } = await this.fetchUserCollectionsNormal(true)
    const { pageTotal } = pagination
    let { page } = pagination
    for (; page < pageTotal; page += 1) {
      info(`排序中 ${page + 1} / ${pageTotal}`)
      await this.fetchUserCollectionsNormal()
    }

    const { subjectType } = this.state
    collectionStore.sortUserCollectionsByScore(this.username, subjectType, this.type)

    return true
  }

  /** 收藏统一请求入口 */
  fetchUserCollections = async (refresh: boolean = false) => {
    const { order } = this.state
    return MODEL_COLLECTIONS_ORDERBY.getLabel<CollectionsOrderCn>(order) === '网站评分'
      ? this.fetchUserCollectionsByScore()
      : this.fetchUserCollectionsNormal(refresh)
  }

  /** 当前 Tab 一直请求到最后, 用于页内搜索 */
  fetchUntilTheEnd = async (
    lastSubjectType: SubjectType,
    lastType: CollectionStatus,
    isNext: boolean = false
  ) => {
    if (!this.isTabActive(lastSubjectType, lastType)) {
      console.info('fetchUntilTheEnd abort')
      return
    }

    const { subjectType, page } = this.state
    const { key: type } = TABS[page]
    const { pagination } = collectionStore.userCollections(
      this.username,
      subjectType,
      type
    )

    if (pagination.page >= pagination.pageTotal) {
      if (isNext) {
        console.info('fetchUntilTheEnd end')
        this.setState({
          fetching: false
        })
      }
      return
    }

    console.info('fetchUntilTheEnd')
    this.setState({
      fetching: true
    })
    await this.fetchUserCollections()

    return this.fetchUntilTheEnd(lastSubjectType, lastType, true)
  }

  /** 若在搜索模式下, 请求到底, 否则正常请求 */
  fetchIsNeedToEnd = (refresh: boolean = false) => {
    const { showFilter, filter, subjectType, page } = this.state
    if (showFilter && filter) return this.fetchUntilTheEnd(subjectType, TABS[page].key)
    return this.fetchUserCollections(refresh)
  }

  /** 若在搜索模式下, 刷新并请求到底, 否则正常请求 */
  fetchIsNeedRefreshToEnd = async () => {
    const { showFilter, filter, subjectType, page } = this.state
    if (showFilter && filter) {
      await this.fetchUserCollections(true)
      return this.fetchUntilTheEnd(subjectType, TABS[page].key)
    }
    return this.fetchUserCollections(true)
  }

  // -------------------- get --------------------
  /** 我的用户 Id */
  @computed get myUserId() {
    return userStore.myUserId
  }

  /** * 用户原始 userId (数字) */
  @computed get userId() {
    const { userId } = this.params
    return userId || this.myUserId
  }

  /** 用户自定义唯一 userId */
  @computed get username() {
    return this.usersInfo.username || this.userId
  }

  /** 是否自己 */
  @computed get isMe() {
    const { userId } = this.params
    return !userId || (userId && userId === userStore.myId)
  }

  /** 用户信息 */
  @computed get usersInfo() {
    return userStore.usersInfo(this.userId)
  }

  /** 用户签名, 用户获取自定义数据 */
  @computed get sign() {
    return usersStore.users(this.userId)?.sign || ''
  }

  /** 自定义头像 */
  @computed get avatar() {
    const avatars = this.sign.match(/\[avatar\](.+?)\[\/avatar\]/)
    const src = avatars ? String(avatars[1]).trim() : ''
    return fixedRemote(HTMLDecode(src), true)
  }

  /** 自定义背景 */
  @computed get bg() {
    const bgs = this.sign.match(/\[bg\](.+?)\[\/bg\]/)
    return fixedRemote(HTMLDecode(bgs ? String(bgs[1]).trim() : ''))
  }

  /** 当前类型 key */
  @computed get type() {
    const { page } = this.state
    return MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(TABS[page].title)
  }

  /** 当前类型 label */
  @computed get label() {
    const { page } = this.state
    return TABS[page].title
  }

  /** 条目动作 */
  @computed get action() {
    const { subjectType } = this.state
    switch (MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subjectType)) {
      case '书籍':
        return '读'

      case '音乐':
        return '听'

      case '游戏':
        return '玩'

      default:
        return '看'
    }
  }

  /** 各个 tab 条目计数 */
  @computed get counts() {
    const counts = {
      动画: {},
      书籍: {},
      游戏: {},
      音乐: {},
      三次元: {}
    }

    const data = userStore.userCollectionsStatus(this.userId)
    if (data.length) {
      data.forEach(item => {
        item.collects.forEach(i => {
          const type = MODEL_COLLECTION_STATUS.getLabel<CollectionStatusCn>(
            i.status.type
          )
          counts[item.name_cn][type] = i.count
        })
      })
    }
    return counts
  }

  @computed get h_fixed() {
    return _.parallaxImageHeight - H_HEADER
  }

  /**
   * 是否当前tab
   * @param {*} subjectType
   * @param {*} type
   * @param {*} isBetween 前后tab也算当前
   * @returns
   */
  isTabActive(
    subjectType: SubjectType,
    type: CollectionStatus,
    isBetween: boolean = false
  ) {
    return computed(() => {
      const { subjectType: _subjectType, page } = this.state
      if (subjectType !== _subjectType) return false

      if (isBetween) {
        return (
          TABS[page]?.key === type ||
          TABS[page - 1]?.key === type ||
          TABS[page + 1]?.key === type
        )
      }
      return TABS[page]?.key === type
    }).get()
  }

  /** 是否应用筛选中 */
  isFiltering(subjectType: SubjectType, type: CollectionStatus) {
    return computed(() => {
      if (!this.isTabActive(subjectType, type)) return false

      const { showFilter, filter, fetching } = this.state
      return !!(showFilter && filter && fetching)
    }).get()
  }

  /** 过滤 */
  @computed get filter() {
    const { filter } = this.state
    return t2s(filter.toUpperCase())
  }

  /** 用户收藏 */
  userCollections(subjectType: SubjectType, type: CollectionStatus) {
    return computed(() => {
      // eslint-disable-next-line prefer-const
      let { list, ...other } = collectionStore.userCollections(
        this.username,
        subjectType,
        type
      )

      if (this.isTabActive(subjectType, type, true)) {
        if (this.filter) {
          list = list.filter(item => {
            const cn = (item.nameCn || '').toUpperCase()
            const jp = (item.name || '').toUpperCase()
            if (cn.includes(this.filter) || jp.includes(this.filter)) return true

            return (
              getPinYinFilterValue(cn, this.filter) ||
              getPinYinFilterValue(jp, this.filter)
            )
          })
        }
      }

      if (userStore.isLimit) list = list.filter(item => !x18(item.id))

      return { list, ...other }
    }).get()
  }

  /** 用户收藏概览的标签 (HTML) */
  userCollectionsTags(subjectType: SubjectType, type: CollectionStatus) {
    return computed(() =>
      collectionStore.userCollectionsTags(this.username, subjectType, type)
    ).get()
  }

  // -------------------- page --------------------
  scrollToIndex = {}

  scrollToOffset = {}

  /**
   * 收集 ListView.scrollToIndex 引用
   * @param {*} ref
   * @param {*} index
   */
  connectRef = (
    ref: {
      scrollToIndex: any
      scrollToOffset: any
    },
    index: string | number
  ) => {
    this.scrollToIndex[index] = ref?.scrollToIndex
    this.scrollToOffset[index] = ref?.scrollToOffset
  }

  /** 刷新到顶 */
  onRefreshThenScrollTop = () => {
    try {
      const { page } = this.state
      if (typeof this.scrollToIndex[page] === 'function') {
        t('其他.刷新到顶', {
          screen: 'User'
        })

        this.scrollToIndex[page]({
          animated: true,
          index: 0,
          viewOffset: 8000
        })
        setTimeout(() => {
          feedback()
        }, 400)

        this.fetchIsNeedToEnd(true)
      }
    } catch (error) {
      console.error('User', 'onRefreshThenScrollTop', error)
    }
  }

  /** 标签页切换 */
  onChange = (page: number) => {
    t('我的.标签页切换', {
      page
    })

    this.setState({
      page,
      tag: ''
    })
    this.fetchIsNeedToEnd(true)
    this.setStorage(NAMESPACE)
  }

  /** 条目类型选择 */
  onSelectSubjectType = (title: SubjectTypeCn) => {
    t('我的.类型选择', {
      title
    })

    const { subjectType } = this.state
    const nextSubjectType = MODEL_SUBJECT_TYPE.getLabel<SubjectType>(title)
    if (nextSubjectType !== subjectType) {
      this.setState({
        subjectType: nextSubjectType,
        tag: ''
      })
      this.fetchIsNeedRefreshToEnd()
      this.setStorage(NAMESPACE)
    }
  }

  /** 排序选择 */
  onOrderSelect = async (label: CollectionsOrderCn) => {
    t('我的.排序选择', {
      label
    })

    this.setState({
      order: MODEL_COLLECTIONS_ORDERBY.getValue<CollectionsOrder>(label)
    })
    this.fetchIsNeedRefreshToEnd()
    this.setStorage(NAMESPACE)
  }

  /** 标签选择 */
  onTagSelect = (label: string) => {
    t('我的.筛选选择', {
      label
    })

    let tag: string
    if (label === '重置') {
      tag = ''
    } else {
      tag = label.replace(/ \(\d+\)/, '')
    }

    this.setState({
      tag
    })
    this.fetchIsNeedRefreshToEnd()
    this.setStorage(NAMESPACE)
  }

  /** 布局选择 */
  onToggleList = () => {
    const { list } = this.state
    t('我的.布局选择', {
      list: !list
    })

    this.setState({
      list: !list
    })
    this.setStorage(NAMESPACE)
  }

  /** 固定切换 (工具条) */
  onToggleFixed = () => {
    const { fixed } = this.state

    this.setState({
      fixed: !fixed
    })
    this.setStorage(NAMESPACE)
  }

  /** 是否显示条目年份 (工具条) */
  onToggleShowYear = () => {
    const { showYear } = this.state

    this.setState({
      showYear: !showYear
    })
    this.setStorage(NAMESPACE)
  }

  /** 展开收起搜索栏 */
  onToggleFilter = () => {
    const { showFilter } = this.state
    if (!showFilter) {
      this.setState({
        showFilter: !showFilter,
        filter: ''
      })
      setTimeout(() => {
        const { page } = this.state
        this.scrollToOffset[page]?.({
          offset: this.h_fixed,
          animated: true
        })
      }, 0)
    } else {
      this.setState({
        showFilter: !showFilter,
        fliterInputText: ''
      })

      // 因为会瞬间触发大量计算, 卡住UI, 需要把关键字延迟入库
      setTimeout(() => {
        this.setState({
          filter: ''
        })
      }, 160)
    }
  }

  /** 同步更新 filterInputText, 异步更新 filter */
  onFilterChange = (filter: string) => {
    const _filter = String(filter).trim()
    this.setState({
      fliterInputText: _filter
    })
    this._onFilterChange(_filter)
  }

  _onFilterChange = debounce((filter: string) => {
    try {
      this.setState({
        filter
      })

      const { subjectType, page } = this.state
      if (filter.length) this.fetchUntilTheEnd(subjectType, TABS[page].key)
    } catch (error) {}
  }, 1200)

  onManagePress = args => {
    uiStore.showManageModal(args, '时光机', values => {
      // 状态不相同需要手动更新列表数据
      if (this.isMe && this.type && values?.status && this.type !== values?.status) {
        collectionStore.removeOneInUserCollections({
          userId: this.username,
          subjectType: this.state.subjectType,
          type: this.type,
          subjectId: values.subjectId
        })
      }
    })
  }
}
