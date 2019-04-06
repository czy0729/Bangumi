/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-06 11:50:52
 */
import { observable, computed } from 'mobx'
import { WebBrowser } from 'expo'
import bangumiData from 'bangumi-data'
import { userStore, subjectStore, collectionStore } from '@stores'
import commonStore from '@stores/common'
import { MODEL_EP_STATUS } from '@constants/model'
import { queue } from '@utils/fetch'

export default class Store extends commonStore {
  state = observable({
    visible: false,
    bangumiInfo: {
      begin: '',
      comment: '',
      end: '',
      lang: '',
      officialSite: '',
      sites: [],
      title: '',
      titleTranslate: {},
      type: ''
    }
  })

  // -------------------- get --------------------
  @computed get isLogin() {
    return userStore.isLogin
  }

  @computed get subject() {
    return subjectStore.getSubject(this.params.subjectId)
  }

  @computed get subjectFormHTML() {
    return subjectStore.getSubjectFormHTML(this.params.subjectId)
  }

  @computed get eps() {
    return subjectStore.getSubjectEp(this.params.subjectId).eps
  }

  @computed get collection() {
    return collectionStore.getCollection(this.params.subjectId)
  }

  @computed get userProgress() {
    return userStore.getUserProgress(this.params.subjectId)
  }

  // -------------------- page --------------------
  initFetch = async () => {
    const res = subjectStore.fetchSubject(this.params.subjectId)
    const data = await res
    const item = bangumiData.items.find(item => item.title === data.name)
    if (item) {
      this.setState({
        bangumiInfo: item
      })
    }

    queue([
      () => subjectStore.fetchSubjectFormHTML(this.params.subjectId),
      () => subjectStore.fetchSubjectEp(this.params.subjectId),
      () => collectionStore.fetchCollection(this.params.subjectId),
      () => userStore.fetchUserProgress(this.params.subjectId)
    ])
    return res
  }

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
        subjectId: this.subjectId,
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
    await collectionStore.doUpdateCollection(values)
    collectionStore.fetchCollection(this.params.subjectId)
    this.closeManageModal()
  }
}
