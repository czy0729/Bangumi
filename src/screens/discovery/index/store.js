/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-29 14:40:06
 */
import { observable, computed } from 'mobx'
import {
  _,
  systemStore,
  calendarStore,
  userStore,
  discoveryStore,
  usersStore
} from '@stores'
import { getTimestamp } from '@utils'
import { queue, t } from '@utils/fetch'
import store from '@utils/store'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

export const sectionWidth = (_.window.width - _.wind * 3) / 2
export const sectionHeight = sectionWidth / 2
export const years = [2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010]

const namespace = 'ScreenDiscovery'

export default class ScreenDiscovery extends store {
  state = observable({
    home: {
      list: [
        {
          type: MODEL_SUBJECT_TYPE.getLabel('动画')
        },
        {
          type: MODEL_SUBJECT_TYPE.getLabel('书籍')
        }
      ],
      pagination: {
        page: 1,
        pageTotal: 2
      },
      _loaded: getTimestamp()
    },
    expand: false
  })

  init = async () => {
    const { expand = false } =
      (await this.getStorage(undefined, namespace)) || {}
    this.setState({
      expand
    })

    const { setting } = systemStore
    if (setting.cdn) {
      calendarStore.fetchHomeFromCDN()
    }

    setTimeout(() => {
      this.fetchOnline()
      if (userStore.isWebLogin) {
        this.fetchChannel()
      }
    }, 800)
    return calendarStore.fetchHome()
  }

  // -------------------- fetch --------------------
  fetchHome = () => {
    this.setState({
      home: {
        list: MODEL_SUBJECT_TYPE.data.map(item => ({
          type: item.label
        })),
        pagination: {
          page: 2,
          pageTotal: 2
        },
        _loaded: getTimestamp()
      }
    })
  }

  fetchOnline = () => discoveryStore.fetchOnline()

  fetchChannel = () => {
    queue(
      MODEL_SUBJECT_TYPE.data.map(item => () =>
        discoveryStore.fetchChannel({
          type: item.label
        })
      ),
      1
    )
  }

  // -------------------- get --------------------
  @computed get userInfo() {
    return userStore.userInfo
  }

  @computed get home() {
    const { setting } = systemStore
    if (setting.cdn) {
      return calendarStore.homeFromCDN
    }
    return calendarStore.home
  }

  @computed get today() {
    const { today } = calendarStore.home
    return today
  }

  @computed get isLimit() {
    return userStore.isLimit
  }

  @computed get online() {
    return discoveryStore.online || systemStore.ota.online
  }

  @computed get friendsMap() {
    return usersStore.friendsMap
  }

  friendsChannel(type) {
    return computed(() => discoveryStore.channel(type).friends).get()
  }

  // -------------------- action --------------------
  openMenu = () => {
    this.setState({
      expand: true
    })
    this.setStorage(undefined, undefined, namespace)
  }

  closeMenu = () => {
    this.setState({
      expand: false
    })
    this.setStorage(undefined, undefined, namespace)
  }

  /**
   * 底部TabBar再次点击滚动到顶并刷新数据
   */
  scrollToIndex
  connectRef = ref => {
    this.scrollToIndex = ref?.scrollToIndex
  }

  onRefreshThenScrollTop = () => {
    try {
      if (typeof this.scrollToIndex === 'function') {
        t('其他.刷新到顶', {
          screen: 'Discovery'
        })

        this.fetchOnline()
        this.scrollToIndex({
          animated: true,
          index: 0,
          viewOffset: 8000
        })
      }
    } catch (error) {
      warn('Discovery', 'onRefreshThenScrollTop', error)
    }
  }
}
