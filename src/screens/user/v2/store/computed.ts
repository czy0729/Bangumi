/*
 * @Author: czy0729
 * @Date: 2023-04-04 06:22:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-07 21:15:55
 */
import { computed } from 'mobx'
import { _, collectionStore, systemStore, usersStore, userStore } from '@stores'
import { getBlurRadius, getPinYinFilterValue, HTMLDecode, t2s, x18 } from '@utils'
import { fixedRemote } from '@utils/user-setting'
import { MODEL_COLLECTION_STATUS, MODEL_COLLECTIONS_ORDERBY, MODEL_SUBJECT_TYPE } from '@constants'
import {
  CollectionsOrderCn,
  CollectionStatus,
  CollectionStatusCn,
  SubjectType,
  SubjectTypeCn
} from '@types'
import { H_HEADER, TABS } from '../ds'
import State from './state'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

export default class Computed extends State {
  save = () => {
    return this.saveStorage(NAMESPACE, EXCLUDE_STATE)
  }

  /** 我的用户 Id */
  @computed get myUserId() {
    return userStore.myUserId
  }

  /** * 用户原始 userId (数字) */
  @computed get userId() {
    return this.params.userId || this.myUserId
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
    return MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(TABS[this.state.page].title)
  }

  /** 当前类型 label */
  @computed get label() {
    return TABS[this.state.page].title
  }

  /** 条目动作 */
  @computed get action() {
    switch (MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(this.state.subjectType)) {
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
    const counts: Record<SubjectTypeCn, Partial<Record<CollectionStatusCn, number>>> = {
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
          const type = MODEL_COLLECTION_STATUS.getLabel<CollectionStatusCn>(i.status.type)
          counts[item.name_cn][type] = i.count
        })
      })
    }
    return counts
  }

  /** tab 条目计数 */
  count(subjectTypeCn: SubjectTypeCn, collectionStatus: CollectionStatusCn) {
    return computed(() => this.counts[subjectTypeCn][collectionStatus]).get()
  }

  /** 顶部背景高度 */
  @computed get fixedHeight() {
    return _.parallaxImageHeight - H_HEADER
  }

  /**
   * 是否当前tab
   * @param {*} subjectType
   * @param {*} type
   * @param {*} isBetween 前后tab也算当前
   * @returns
   */
  isTabActive(subjectType: SubjectType, type: CollectionStatus, isBetween: boolean = false) {
    return computed(() => {
      const { subjectType: _subjectType } = this.state
      if (subjectType !== _subjectType) return false

      const { page } = this.state
      if (isBetween) {
        return (
          TABS[page]?.key === type || TABS[page - 1]?.key === type || TABS[page + 1]?.key === type
        )
      }

      return TABS[page]?.key === type
    }).get()
  }

  /** 是否应用筛选中 */
  isFiltering(subjectType: SubjectType, type: CollectionStatus) {
    return computed(() => {
      if (!this.isTabActive(subjectType, type)) return false

      return !!(this.state.showFilter && this.state.filter && this.state.fetching)
    }).get()
  }

  /** 过滤 */
  @computed get filter() {
    return t2s(this.state.filter.toUpperCase())
  }

  /** 用户收藏 */
  userCollections(subjectType: SubjectType, type: CollectionStatus) {
    return computed(() => {
      // eslint-disable-next-line prefer-const
      let { list, ...other } = collectionStore.userCollections(this.username, subjectType, type)

      if (this.isTabActive(subjectType, type, true)) {
        if (this.filter) {
          list = list.filter(item => {
            const cn = (item.nameCn || '').toUpperCase()
            const jp = (item.name || '').toUpperCase()
            if (cn.includes(this.filter) || jp.includes(this.filter)) return true

            return getPinYinFilterValue(cn, this.filter) || getPinYinFilterValue(jp, this.filter)
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

  /** 是否根据网站评分排序 */
  @computed get isSortByScore() {
    return MODEL_COLLECTIONS_ORDERBY.getLabel<CollectionsOrderCn>(this.state.order) === '网站评分'
  }

  /** 自定义背景 */
  @computed get imageSource() {
    return {
      uri: this.bg || this.avatar || this.usersInfo.avatar?.large
    }
  }

  /** 背景模糊像素 */
  @computed get blurRadius() {
    return getBlurRadius(this.imageSource.uri, this.bg, this.usersInfo.avatar?.large)
  }

  /** 长列表列数 */
  @computed get numColumns() {
    return this.state.list ? undefined : Number(systemStore.setting.userGridNum)
  }

  /** 检查 tabbar 此页是否已经渲染过 */
  loadedPage(index: number) {
    return computed(() => {
      return this.state.loadedPage.includes(index)
    }).get()
  }
}
