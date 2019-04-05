/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/*
 * @Author: czy0729
 * @Date: 2019-03-21 16:49:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-05 09:50:00
 */
import { observable, computed } from 'mobx'
import { WebBrowser } from 'expo'
import commonStore from '@stores/common'
import { userStore, subjectStore, collectionStore } from '@stores'
import { MODEL_EP_STATUS } from '@constants/model'
import { sleep, getStorage, setStorage } from '@utils'

const screen = '@screen|home|state'
const itemState = {
  expand: false,
  doing: false
}
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

export default class Store extends commonStore {
  state = observable({
    loading: true, // 是否加载数据中
    visible: false, // <Modal>可见性
    subjectId: 0, // <Modal>当前条目Id
    page: 0, // <Tabs>缓存当前页数,
    top: [], // <Item>置顶记录
    item: {
      // [subjectId]: itemState // 每个<Item>的状态
    }
  })

  // -------------------- get --------------------
  /**
   * <Item />
   */
  $item(subjectId) {
    return computed(() => this.state.item[subjectId] || itemState).get()
  }

  // 用户 -> 收藏 -> 条目 -> 章节
  /**
   * 用户是否登录
   */
  @computed get isLogin() {
    return userStore.isLogin
  }

  /**
   * 用户收藏
   */
  @computed get userCollection() {
    return userStore.getUserCollection()
  }

  /**
   * 用户条目收视进度
   */
  getUserProgress(subjectId) {
    return computed(() => userStore.getUserProgress(subjectId)).get()
  }

  /**
   * 条目信息
   */
  getSubject(subjectId) {
    return computed(() => {
      const { subject } =
        this.userCollection.find(item => item.subject_id === subjectId) || {}
      return subject || {}
    }).get()
  }

  /**
   * 条目章节数据
   */
  getEps(subjectId) {
    return computed(() => subjectStore.getSubjectEp(subjectId).eps || []).get()
  }

  /**
   * 条目下一个未看章节
   */
  getNextWatchEp(subjectId) {
    return computed(() => {
      const eps = this.getEps(subjectId)
      const userPorgress = this.getUserProgress(subjectId)
      const index = eps.findIndex(
        item => item.type === 0 && userPorgress[item.id] !== '看过'
      )
      if (index === -1) {
        return {}
      }
      return eps[index]
    }).get()
  }

  /**
   * 章节是否放送中
   */
  getIsToday(subjectId) {
    return computed(() => {
      const eps = this.getEps(subjectId)
      return eps.findIndex(item => item.status === 'Today') !== -1
    }).get()
  }

  /**
   * 条目观看进度百分比
   */
  getPercent(subjectId, subject = {}) {
    return computed(() => {
      const eps = this.getEps(subjectId)
      if (!subject.eps_count || !eps.length) {
        return 0
      }

      // 排除SP章节
      let watchedCount = 0
      const userProgress = this.getUserProgress(subjectId)
      eps
        .filter(item => item.type === 0)
        .forEach(item => {
          if (userProgress[item.id] === '看过') {
            watchedCount += 1
          }
        })
      return (watchedCount / subject.eps_count) * 100
    }).get()
  }

  // -------------------- page --------------------
  /**
   * 页面加载
   */
  mounted = async () => {
    if (this.isLogin) {
      const state = await getStorage(screen)
      if (state) {
        this.setState(state)
      }

      const data = await Promise.all([
        userStore.fetchUserCollection(),
        userStore.fetchUserProgress()
      ])
      this.setState({
        loading: false
      })

      if (data[1]) {
        // 由于Bangumi没提供一次性查询多个章节信息的Api
        // 暂时只能每一项都发一次请求
        for (const item of data[1]) {
          await subjectStore.fetchSubjectEp(item.subject_id)
          await sleep(1000)
        }
      }
    }
  }

  /**
   * <Tabs>换页
   */
  tabsChange = (item, page) => {
    this.setState({
      page
    })
    this.setStorage()
  }

  /**
   * 显示收藏管理<Modal>
   */
  showManageModal = subjectId => {
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
   * <Item>展开和收起
   */
  itemToggleExpand = subjectId => {
    const state = this.$item(subjectId)
    this.setState({
      item: {
        [subjectId]: {
          ...state,
          expand: !state.expand
        }
      }
    })
    this.setStorage()
  }

  /**
   * <Item>置顶和取消置顶
   */
  itemToggleTop = (subjectId, isTop) => {
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
    this.setStorage()
  }

  /**
   * 保存
   */
  setStorage = () => {
    const { loading, page, top, item } = this.state
    const state = {
      loading,
      page,
      top,
      item: {}
    }
    Object.keys(item).forEach(key => {
      state.item[key] = {
        expand: item[key].expand
      }
    })
    setStorage(screen, state)
  }

  // -------------------- action --------------------
  /**
   * 观看下一集
   */
  doWatchedNextEp = async subjectId => {
    const state = this.$item(subjectId)
    if (state.doing) {
      return
    }
    this.setState({
      item: {
        [subjectId]: {
          ...state,
          doing: true
        }
      }
    })

    const { id } = this.getNextWatchEp(subjectId)
    await userStore.doUpdateEpStatus({
      id,
      status: MODEL_EP_STATUS.getValue('看过')
    })
    userStore.fetchUserProgress(subjectId)

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
   * 管理收藏
   */
  doUpdateCollection = async values => {
    await collectionStore.doUpdateCollection(values)
    this.closeManageModal()
  }

  /**
   * 章节菜单操作
   */
  doEpsSelect = async (value, item, subjectId) => {
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
}
