/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-14 04:18:46
 */
import { observable, computed } from 'mobx'
import { _, userStore, collectionStore, usersStore } from '@stores'
import store from '@utils/store'
import { x18 } from '@utils/app'
import { t } from '@utils/fetch'
import { IOS } from '@constants'
import {
  MODEL_SUBJECT_TYPE,
  MODEL_COLLECTION_STATUS,
  MODEL_COLLECTIONS_ORDERBY
} from '@constants/model'

export const H_BG = Math.min(parseInt(_.window.width * 0.64), 288) // 整个背景高度
export const H_HEADER = IOS ? 88 : 80 // fixed后带背景的头部高度
export const H_TABBAR = 48 // TabBar高度
export const tabs = MODEL_COLLECTION_STATUS.data.map(item => ({
  title: item.label,
  key: item.value
}))

const namespace = 'ScreenUser'
const defaultSubjectType = MODEL_SUBJECT_TYPE.getLabel('动画')
const defaultOrder = MODEL_COLLECTIONS_ORDERBY.getValue('收藏时间')

export default class ScreenUser extends store {
  state = observable({
    subjectType: defaultSubjectType,
    order: defaultOrder,
    list: true, // list | grid
    tag: '',
    page: 2, // <Tabs>当前页数
    _loaded: false
  })

  init = async () => {
    const state = await this.getStorage(undefined, namespace)
    this.setState({
      ...state,
      _loaded: true
    })

    let res

    // 用户信息
    await this.fetchUsersInfo()

    // 用户收藏概览统计
    userStore.fetchUserCollectionsStatus(this.userId)

    // 用户收藏记录
    this.fetchUserCollections(true)
    this.fetchUsers()
    return res
  }

  onHeaderRefresh = () => this.fetchUserCollections(true)

  // -------------------- fetch --------------------
  fetchUsersInfo = () => userStore.fetchUsersInfo(this.userId)

  fetchUserCollections = refresh => {
    const { subjectType, order, tag } = this.state
    return collectionStore.fetchUserCollections(
      {
        subjectType,
        type: this.type,
        order,
        tag,
        userId: this.usersInfo.username || this.userId
      },
      refresh
    )
  }

  fetchUsers = () => {
    usersStore.fetchUsers({
      userId: this.userId
    })
  }

  // -------------------- get --------------------
  @computed get isLogin() {
    return userStore.isLogin
  }

  @computed get myUserId() {
    return userStore.myUserId
  }

  @computed get userId() {
    const { userId } = this.params
    return userId || this.myUserId
  }

  @computed get usersInfo() {
    return userStore.usersInfo(this.userId)
  }

  @computed get userCollectionsStatus() {
    return userStore.userCollectionsStatus(this.userId)
  }

  @computed get users() {
    return usersStore.users(this.userId)
  }

  @computed get avatar() {
    const { sign = '' } = this.users
    const avatars = sign.match(/\[avatar\](.+?)\[\/avatar\]/)
    return avatars ? String(avatars[1]).trim() : ''
  }

  @computed get bg() {
    const { sign = '' } = this.users
    const bgs = sign.match(/\[bg\](.+?)\[\/bg\]/)
    return bgs ? String(bgs[1]).trim() : ''
  }

  @computed get type() {
    const { page } = this.state
    return MODEL_COLLECTION_STATUS.getValue(tabs[page].title)
  }

  /**
   * 条目动作
   */
  @computed get action() {
    const { subjectType } = this.state
    switch (MODEL_SUBJECT_TYPE.getTitle(subjectType)) {
      case '音乐':
        return '听'
      case '游戏':
        return '玩'
      default:
        return '看'
    }
  }

  @computed get counts() {
    const counts = {
      动画: {},
      书籍: {},
      游戏: {},
      音乐: {},
      三次元: {}
    }
    if (this.userCollectionsStatus.length) {
      this.userCollectionsStatus.forEach(item => {
        item.collects.forEach(i => {
          const type = MODEL_COLLECTION_STATUS.getLabel(i.status.type)
          counts[item.name_cn][type] = i.count
        })
      })
    }
    return counts
  }

  userCollections(subjectType, type) {
    const { username } = this.usersInfo
    return computed(() => {
      const userCollections = collectionStore.userCollections(
        username || this.userId,
        subjectType,
        type
      )
      if (userStore.isLimit) {
        return {
          ...userCollections,
          list: userCollections.list.filter(item => !x18(item.id))
        }
      }
      return userCollections
    }).get()
  }

  userCollectionsTags(subjectType, type) {
    const { username } = this.usersInfo
    return computed(() =>
      collectionStore.userCollectionsTags(
        username || this.userId,
        subjectType,
        type
      )
    ).get()
  }

  // -------------------- page --------------------
  onChange = page => {
    t('我的.标签页切换', {
      page
    })

    this.setState({
      page,
      tag: ''
    })
    this.fetchUserCollections(true)
    this.setStorage(undefined, undefined, namespace)
  }

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
      this.fetchUserCollections(true)
      this.setStorage(undefined, undefined, namespace)
    }
  }

  onOrderSelect = label => {
    t('我的.排序选择', {
      label
    })

    this.setState({
      order: MODEL_COLLECTIONS_ORDERBY.getValue(label)
    })
    this.fetchUserCollections(true)
    this.setStorage(undefined, undefined, namespace)
  }

  onFilterSelect = label => {
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
    this.fetchUserCollections(true)
    this.setStorage(undefined, undefined, namespace)
  }

  toggleList = () => {
    const { list } = this.state
    t('我的.布局选择', {
      list: !list
    })

    this.setState({
      list: !list
    })
    this.setStorage(undefined, undefined, namespace)
  }
}
