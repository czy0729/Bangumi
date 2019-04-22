/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-22 19:08:53
 */
import { observable, computed } from 'mobx'
import { WebBrowser } from 'expo'
import bangumiData from 'bangumi-data'
import { userStore, subjectStore, collectionStore } from '@stores'
import { MODEL_EP_STATUS } from '@constants/model'
import { queue } from '@utils/fetch'
import store from '@utils/store'

export default class Store extends store {
  state = observable({
    visible: false,
    bangumiInfo: {
      sites: [], // 动画在线地址
      type: '' // 动画类型
    }
  })

  init = async () => {
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
      () => this.fetchSubjectCommentsFormHTML(true),
      () => subjectStore.fetchSubjectFormHTML(subjectId),
      () => subjectStore.fetchSubjectEp(subjectId),
      () => collectionStore.fetchCollection(subjectId),
      () => userStore.fetchUserProgress(subjectId)
    ])
    return res
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

  @computed get subjectEps() {
    const { subjectId } = this.params
    return subjectStore.subjectEp(subjectId).eps
  }

  @computed get subjectCommentsFormHTML() {
    const { subjectId } = this.params
    return subjectStore.subjectCommentsFormHTML(subjectId)
  }

  @computed get collection() {
    const { subjectId } = this.params
    return collectionStore.collection(subjectId)
  }

  @computed get userProgress() {
    const { subjectId } = this.params
    return userStore.userProgress(subjectId)
  }

  // -------------------- fetch --------------------
  fetchSubjectCommentsFormHTML = refresh => {
    const { subjectId } = this.params
    return subjectStore.fetchSubjectCommentsFormHTML({ subjectId }, refresh)
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

  // -------------------- action --------------------
  /**
   * 章节菜单操作
   */
  doEpsSelect = async (value, item) => {
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

    if (value === '本集讨论') {
      WebBrowser.openBrowserAsync(item.url)
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
