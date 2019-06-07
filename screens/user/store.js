/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-08 05:10:03
 */
import { observable, computed } from 'mobx'
import { userStore, collectionStore } from '@stores'
import store from '@utils/store'
import {
  MODEL_SUBJECT_TYPE,
  MODEL_COLLECTION_STATUS,
  MODEL_COLLECTIONS_ORDERBY
} from '@constants/model'
import _ from '@styles'

export const height = _.window.width * 0.64

// @todo 偏差了6pt, 有空再纠正
export const headerHeight = _.headerHeight + 6
export const tabs = MODEL_COLLECTION_STATUS.data.map(item => ({
  title: item.label
}))
tabs.push({
  title: ' '
})
const namespace = 'ScreenUser'
const defaultSubjectType = MODEL_SUBJECT_TYPE.getLabel('动画')
const defaultOrder = MODEL_COLLECTIONS_ORDERBY.getValue('收藏时间')

export default class ScreenUser extends store {
  state = observable({
    subjectType: defaultSubjectType,
    order: defaultOrder,
    list: true, // list | grid
    tag: '',
    page: 1, // <Tabs>当前页数
    _page: 1, // header上的假<Tabs>当前页数,
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
    if (!this.usersInfo._loaded) {
      res = this.fetchUsersInfo()
      await res
    }

    // 用户收藏概览统计
    if (!this.userCollectionsStatus._loaded) {
      const { userId } = this.params
      userStore.fetchUserCollectionsStatus(userId)
    }

    // 用户收藏记录
    this.fetchUserCollections(true)
    return res
  }

  // -------------------- get --------------------
  @computed get usersInfo() {
    const { userId } = this.params
    return userStore.usersInfo(userId)
  }

  @computed get userCollectionsStatus() {
    const { userId } = this.params
    return userStore.userCollectionsStatus(userId)
  }

  @computed get myUserId() {
    return userStore.myUserId
  }

  userCollections(subjectType, type) {
    const { userId } = this.params
    return computed(() =>
      collectionStore.userCollections(userId, subjectType, type)
    ).get()
  }

  userCollectionsTags(subjectType, type) {
    const { userId } = this.params
    return computed(() =>
      collectionStore.userCollectionsTags(userId, subjectType, type)
    ).get()
  }

  // -------------------- fetch --------------------
  fetchUsersInfo = () => {
    const { userId } = this.params
    return userStore.fetchUsersInfo(userId)
  }

  fetchUserCollections = refresh => {
    const { userId } = this.params
    const { subjectType, order, tag, page } = this.state
    return collectionStore.fetchUserCollections(
      {
        subjectType,
        type: MODEL_COLLECTION_STATUS.getValue(tabs[page].title),
        order,
        tag,
        userId
      },
      refresh
    )
  }

  // -------------------- page --------------------
  onTabClick = (item, page) => {
    if (page === this.state.page) {
      return
    }

    this.setState({
      page,
      tag: ''
    })

    // @issue onTabClick与onChange在用受控模式的时候有冲突, 暂时这样解决
    setTimeout(() => {
      this.setState({
        _page: page
      })
      this.setStorage(undefined, undefined, namespace)
    }, 400)
    this.fetchUserCollections(true)
  }

  onChange = (item, page) => {
    if (page === this.state.page) {
      return
    }

    // 这里最后一个tab是假占位, 跳回到第一个tab
    if (page + 1 === tabs.length) {
      setTimeout(() => {
        this.setState({
          page: 0,
          _page: 0,
          tag: ''
        })
      }, 400)
    } else {
      this.setState({
        page,
        _page: page,
        tag: ''
      })
      this.fetchUserCollections(true)
    }
    this.setStorage(undefined, undefined, namespace)
  }

  onSelectSubjectType = title => {
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
    this.setState({
      order: MODEL_COLLECTIONS_ORDERBY.getValue(label)
    })
    this.fetchUserCollections(true)
    this.setStorage(undefined, undefined, namespace)
  }

  onFilterSelect = label => {
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
    this.setState({
      list: !list
    })
    this.setStorage(undefined, undefined, namespace)
  }

  // -------------------- action --------------------
}
