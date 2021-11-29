/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-29 14:08:22
 */
import { observable, computed } from 'mobx'
import { _, userStore, collectionStore, usersStore } from '@stores'
import { debounce } from '@utils'
import store from '@utils/store'
import { x18 } from '@utils/app'
import { t } from '@utils/fetch'
import { info } from '@utils/ui'
import { getPinYinFirstCharacter } from '@utils/thirdParty/pinyin'
import { IOS } from '@constants'
import {
  MODEL_SUBJECT_TYPE,
  MODEL_COLLECTION_STATUS,
  MODEL_COLLECTIONS_ORDERBY
} from '@constants/model'

export const H_BG = Math.min(parseInt(_.window.width * 0.68), _.device(288, 380)) // 整个背景高度
export const H_RADIUS_LINE = _.radiusLg
export const H_HEADER = (IOS ? 88 : 80) + H_RADIUS_LINE // fixed后带背景的头部高度
export const H_TABBAR = 48 * _.ratio // TabBar高度
export const H_FILTER = 36 + 2 * _.md
export const H_FIXED = H_BG - H_HEADER

export const tabs = MODEL_COLLECTION_STATUS.data.map(item => ({
  title: item.label,
  key: item.value
}))
export const defaultSubjectType = MODEL_SUBJECT_TYPE.getLabel('动画')
export const defaultOrder = MODEL_COLLECTIONS_ORDERBY.getValue('收藏时间')

const namespace = 'ScreenUser'
const excludeState = {
  isFocused: true,
  showFilter: false,
  filter: '',
  fliterInputText: '',
  fetching: false
}
const pinYinFirstCharacter = {}
function testPinYinFirstCharacter(text, filter) {
  // 支持每个字符首拼音筛选
  if (/^[a-zA-Z]+$/.test(filter) && text) {
    if (!pinYinFirstCharacter[text]) {
      pinYinFirstCharacter[text] = getPinYinFirstCharacter(text, text.length).replace(
        / /g,
        ''
      )
    }

    if (pinYinFirstCharacter[text].includes(filter)) return true
  }

  return false
}

export default class ScreenUser extends store {
  state = observable({
    subjectType: defaultSubjectType,
    order: defaultOrder,
    list: true, // list | grid
    tag: '',
    page: 2, // <Tabs>当前页数
    ...excludeState,
    _loaded: false
  })

  init = async () => {
    const state = (await this.getStorage(undefined, namespace)) || {}
    this.setState({
      ...state,
      ...excludeState,
      _loaded: true
    })

    let res

    // 用户信息
    await this.fetchUsersInfo()

    // 用户收藏概览统计
    userStore.fetchUserCollectionsStatus(this.userId)

    // 用户收藏记录
    const { order } = this.state
    if (MODEL_COLLECTIONS_ORDERBY.getLabel(order) !== '网站评分')
      this.fetchUserCollections(true)
    this.fetchUsers()
    return res
  }

  // -------------------- fetch --------------------
  /**
   * 用户信息(自己视角)
   */
  fetchUsersInfo = () => userStore.fetchUsersInfo(this.userId)

  /**
   * 用户信息(他人视角)
   */
  fetchUsers = () =>
    usersStore.fetchUsers({
      userId: this.userId
    })

  /**
   * 普通的收藏请求
   * @param {*} refresh
   */
  fetchUserCollectionsNormal = refresh => {
    const { subjectType, order, tag } = this.state
    return collectionStore.fetchUserCollections(
      {
        subjectType,
        type: this.type,
        order,
        tag,
        userId: this.username
      },
      refresh
    )
  }

  /**
   * 网站评分需要递归请求完所有数据, 再通过本地排序显示
   */
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

  /**
   * 收藏统一请求入口
   * @param {*} refresh
   */
  fetchUserCollections = async refresh => {
    const { order } = this.state
    return MODEL_COLLECTIONS_ORDERBY.getLabel(order) === '网站评分'
      ? this.fetchUserCollectionsByScore()
      : this.fetchUserCollectionsNormal(refresh)
  }

  /**
   * 当前Tab一直请求到最后, 用于页内搜索
   */
  fetchUntilTheEnd = async (lastSubjectType, lastType, isNext) => {
    if (!this.isTabActive(lastSubjectType, lastType))
      return console.info('fetchUntilTheEnd abort')

    const { subjectType, page } = this.state
    const { key: type } = tabs[page]
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

  /**
   * 若在搜索模式下, 请求到底, 否则正常请求
   */
  fetchIsNeedToEnd = refresh => {
    const { showFilter, filter, subjectType, page } = this.state
    if (showFilter && filter) return this.fetchUntilTheEnd(subjectType, tabs[page].key)
    return this.fetchUserCollections(refresh)
  }

  /**
   * 若在搜索模式下, 刷新并请求到底, 否则正常请求
   */
  fetchIsNeedRefreshToEnd = async () => {
    const { showFilter, filter, subjectType, page } = this.state
    if (showFilter && filter) {
      await this.fetchUserCollections(true)
      return this.fetchUntilTheEnd(subjectType, tabs[page].key)
    }
    return this.fetchUserCollections(true)
  }

  // -------------------- get --------------------
  /**
   * 我的用户Id
   */
  @computed get myUserId() {
    return userStore.myUserId
  }

  /**
   * 用户原始userId(数字)
   */
  @computed get userId() {
    const { userId } = this.params
    return userId || this.myUserId
  }

  /**
   * 用户信息
   */
  @computed get usersInfo() {
    return userStore.usersInfo(this.userId)
  }

  /**
   * 用户自定义唯一userId
   */
  @computed get username() {
    return this.usersInfo.username || this.userId
  }

  /**
   * 用户签名, 用户获取自定义数据
   */
  @computed get sign() {
    return usersStore.users(this.userId)?.sign || ''
  }

  /**
   * 自定义头像
   */
  @computed get avatar() {
    const avatars = this.sign.match(/\[avatar\](.+?)\[\/avatar\]/)
    const src = avatars ? String(avatars[1]).trim() : ''
    return /(jpg|jpeg|png|bmp|gif)$/.test(src) ? src : ''
  }

  /**
   * 自定义背景
   */
  @computed get bg() {
    const bgs = this.sign.match(/\[bg\](.+?)\[\/bg\]/)
    return bgs ? String(bgs[1]).trim() : ''
  }

  /**
   * 当前类型key
   */
  @computed get type() {
    const { page } = this.state
    return MODEL_COLLECTION_STATUS.getValue(tabs[page].title)
  }

  /**
   * 当前类型label
   */
  @computed get label() {
    const { page } = this.state
    return tabs[page].title
  }

  /**
   * 条目动作
   */
  @computed get action() {
    const { subjectType } = this.state
    switch (MODEL_SUBJECT_TYPE.getTitle(subjectType)) {
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

  /**
   * 各个tab条目计数
   */
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
          const type = MODEL_COLLECTION_STATUS.getLabel(i.status.type)
          counts[item.name_cn][type] = i.count
        })
      })
    }
    return counts
  }

  /**
   * 是否当前tab
   * @param {*} subjectType
   * @param {*} type
   * @param {*} isBetween 前后tab也算当前
   * @returns
   */
  isTabActive(subjectType, type, isBetween) {
    return computed(() => {
      const { subjectType: _subjectType, page } = this.state
      if (!subjectType === _subjectType) return false
      if (isBetween) {
        return (
          tabs[page]?.key === type ||
          tabs[page - 1]?.key === type ||
          tabs[page + 1]?.key === type
        )
      }
      return tabs[page]?.key === type
    }).get()
  }

  isFiltering(subjectType, type) {
    return computed(() => {
      if (!this.isTabActive(subjectType, type)) return false

      const { showFilter, filter, fetching } = this.state
      return !!(showFilter && filter && fetching)
    }).get()
  }

  /**
   * 用户收藏
   * @param {*} subjectType
   * @param {*} type
   * @returns
   */
  userCollections(subjectType, type) {
    return computed(() => {
      // eslint-disable-next-line prefer-const
      let { list, ...other } = collectionStore.userCollections(
        this.username,
        subjectType,
        type
      )

      if (this.isTabActive(subjectType, type, true)) {
        const { filter } = this.state
        if (filter) {
          const _filter = filter.toUpperCase()
          list = list.filter(item => {
            const cn = (item.nameCn || '').toUpperCase()
            const jp = (item.name || '').toUpperCase()
            if (cn.includes(_filter) || jp.includes(_filter)) return true

            return (
              testPinYinFirstCharacter(cn, _filter) ||
              testPinYinFirstCharacter(jp, _filter)
            )
          })
        }
      }

      if (userStore.isLimit) list = list.filter(item => !x18(item.id))

      return { list, ...other }
    }).get()
  }

  userCollectionsTags(subjectType, type) {
    return computed(() =>
      collectionStore.userCollectionsTags(this.username, subjectType, type)
    ).get()
  }

  // -------------------- page --------------------
  scrollToIndex = {}
  scrollToOffset = {}

  /**
   * 收集ListView.scrollToIndex引用
   * @param {*} ref
   * @param {*} index
   */
  connectRef = (ref, index) => {
    this.scrollToIndex[index] = ref?.scrollToIndex
    this.scrollToOffset[index] = ref?.scrollToOffset
  }

  /**
   * 刷新到顶
   */
  onRefreshThenScrollTop = () => {
    try {
      const { page } = this.state
      if (typeof this.scrollToIndex[page] === 'function') {
        t('其他.刷新到顶', {
          screen: 'User'
        })

        this.fetchIsNeedToEnd(true)
        this.scrollToIndex[page]({
          animated: true,
          index: 0,
          viewOffset: 8000
        })
      }
    } catch (error) {
      warn('User', 'onRefreshThenScrollTop', error)
    }
  }

  /**
   * 标签页切换
   * @param {*} page
   */
  onChange = page => {
    t('我的.标签页切换', {
      page
    })

    this.setState({
      page,
      tag: ''
    })
    this.fetchIsNeedToEnd(true)
    this.setStorage(undefined, undefined, namespace)
  }

  /**
   * 条目类型选择
   * @param {*} title
   */
  onSelectSubjectType = title => {
    t('我的.类型选择', {
      title
    })

    const { subjectType } = this.state
    const nextSubjectType = MODEL_SUBJECT_TYPE.getLabel(title)
    if (nextSubjectType !== subjectType) {
      this.setState({
        subjectType: nextSubjectType,
        tag: ''
      })
      this.fetchIsNeedRefreshToEnd()
      this.setStorage(undefined, undefined, namespace)
    }
  }

  /**
   * 排序选择
   * @param {*} label
   */
  onOrderSelect = async label => {
    t('我的.排序选择', {
      label
    })

    this.setState({
      order: MODEL_COLLECTIONS_ORDERBY.getValue(label)
    })
    this.fetchIsNeedRefreshToEnd()
    this.setStorage(undefined, undefined, namespace)
  }

  /**
   * 标签选择
   * @param {*} label
   */
  onTagSelect = label => {
    t('我的.筛选选择', {
      label
    })

    let tag
    if (label === '重置') {
      tag = ''
    } else {
      tag = label.replace(/ \(\d+\)/, '')
    }

    this.setState({
      tag
    })
    this.fetchIsNeedRefreshToEnd()
    this.setStorage(undefined, undefined, namespace)
  }

  /**
   * 布局选择
   */
  onToggleList = () => {
    const { list } = this.state
    t('我的.布局选择', {
      list: !list
    })

    this.setState({
      list: !list
    })
    this.setStorage(undefined, undefined, namespace)
  }

  /**
   * 展开收起搜索栏
   */
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
          offset: H_FIXED,
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

  /**
   * 同步更新filterInputText, 异步更新filter
   * @param {*} filter
   */
  onFilterChange = filter => {
    const _filter = filter.trim()
    this.setState({
      fliterInputText: _filter
    })
    this._onFilterChange(_filter)
  }
  _onFilterChange = debounce(filter => {
    this.setState({
      filter
    })

    const { subjectType, page } = this.state
    if (filter.length) this.fetchUntilTheEnd(subjectType, tabs[page].key)
  }, 1200)
}
