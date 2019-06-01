/*
 * 条目
 * params { _jp, _cn, _image }
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-01 15:09:59
 */
import { observable, computed } from 'mobx'
import bangumiData from 'bangumi-data'
import { subjectStore, userStore, collectionStore } from '@stores'
import { MODEL_SUBJECT_TYPE, MODEL_EP_STATUS } from '@constants/model'
import { queue } from '@utils/fetch'
import { appNavigate } from '@utils/app'
import store from '@utils/store'

const namespace = 'ScreenSubject'

export default class ScreenSubject extends store {
  state = observable({
    visible: false, // 是否显示管理模态框
    epsReverse: false, // 章节是否倒序
    bangumiInfo: {
      sites: [], // 动画在线地址
      type: '' // 动画类型
    },
    _loaded: true
  })

  init = async () => {
    const state = await this.getStorage(undefined, namespace)
    this.setState({
      ...state,
      visible: false,
      _loaded: true
    })

    const { subjectId } = this.params
    const res = subjectStore.fetchSubject(subjectId)
    const data = await res
    const item = bangumiData.items.find(item => item.title === data.name)
    if (item) {
      this.setState({
        bangumiInfo: {
          sites: item.sites,
          type: item.type
        }
      })
    }

    queue([
      () => subjectStore.fetchSubjectEp(subjectId),
      () => collectionStore.fetchCollection(subjectId),
      () => userStore.fetchUserProgress(subjectId),
      () => subjectStore.fetchSubjectFormHTML(subjectId),
      () => this.fetchSubjectComments(true)
    ])
    return res
  }

  // -------------------- fetch --------------------
  fetchSubjectComments = (refresh, reverse) => {
    const { subjectId } = this.params
    return subjectStore.fetchSubjectComments({ subjectId }, refresh, reverse)
  }

  // -------------------- get --------------------
  @computed get isLogin() {
    return userStore.isLogin
  }

  @computed get subject() {
    const { subjectId } = this.params
    return subjectStore.subject(subjectId)
  }

  @computed get subjectFormHTML() {
    const { subjectId } = this.params
    return subjectStore.subjectFormHTML(subjectId)
  }

  @computed get subjectEp() {
    const { subjectId } = this.params
    return subjectStore.subjectEp(subjectId)
  }

  @computed get subjectComments() {
    const { subjectId } = this.params
    return subjectStore.subjectComments(subjectId)
  }

  @computed get collection() {
    const { subjectId } = this.params
    return collectionStore.collection(subjectId)
  }

  @computed get userProgress() {
    const { subjectId } = this.params
    return userStore.userProgress(subjectId)
  }

  @computed get type() {
    const { _loaded, type: _type } = this.subject
    if (!_loaded) {
      return ''
    }

    return MODEL_SUBJECT_TYPE.getTitle(_type)
  }

  // -------------------- page --------------------
  showManageModel = () => {
    this.setState({
      visible: true
    })
  }

  closeManageModal = () => {
    this.setState({
      visible: false
    })
  }

  /**
   * 章节倒序
   */
  toggleReverseEps = () => {
    const { epsReverse } = this.state
    this.setState({
      epsReverse: !epsReverse
    })
    this.setStorage(undefined, undefined, ScreenSubject)
  }

  /**
   * 吐槽箱倒序
   */
  toggleReverseComments = () => {
    const { _reverse } = this.subjectComments
    this.fetchSubjectComments(true, !_reverse)
  }

  // -------------------- action --------------------
  /**
   * 章节菜单操作
   */
  doEpsSelect = async (value, item, navigation) => {
    const { subjectId } = this.params
    const status = MODEL_EP_STATUS.getValue(value)
    if (status) {
      // 更新收视进度
      await userStore.doUpdateEpStatus({
        id: item.id,
        status
      })
      userStore.fetchUserCollection()
      userStore.fetchUserProgress()
    }

    if (value === '看到') {
      // 批量更新收视进度
      await userStore.doUpdateSubjectWatched({
        subjectId,
        sort: item.sort
      })
      userStore.fetchUserCollection()
      userStore.fetchUserProgress()
    }

    if (value.includes('本集讨论')) {
      appNavigate(item.url, navigation)
    }
  }

  /**
   * 管理收藏
   */
  doUpdateCollection = async values => {
    const { subjectId } = this.params
    await collectionStore.doUpdateCollection(values)
    collectionStore.fetchCollection(subjectId)
    this.closeManageModal()
  }
}
