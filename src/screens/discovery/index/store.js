/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-03 17:48:51
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
import { matchBgmUrl } from '@utils/match'
import { info } from '@utils/ui'
import { appNavigate } from '@utils/app'
import { DEV } from '@constants'
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
    expand: false,
    visible: false,
    link: ''
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
      if (!DEV && userStore.isWebLogin) {
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
      MODEL_SUBJECT_TYPE.data.map(
        item => () =>
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

  toggleLinkModal = () => {
    const { visible } = this.state
    this.setState({
      visible: !visible
    })
  }

  onChangeText = link => {
    this.setState({
      link
    })
  }

  onLinkSubmit = navigation => {
    let { link } = this.state
    if (!link.length) {
      info('请输入链接')
      return
    }

    if (!(link.includes('http://') || link.includes('https://'))) {
      link = `https://${link}`
    }

    const urls = matchBgmUrl(link, true) || []
    const url = urls[0]
    if (!url) {
      info('链接不符合格式')
      return
    }

    appNavigate(url, navigation)
    this.setState({
      visible: false,
      link: ''
    })

    t('发现.剪贴板', {
      link
    })
  }
}
