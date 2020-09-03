/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-09-03 22:47:33
 */
import { observable, computed } from 'mobx'
import { _, systemStore, calendarStore, userStore } from '@stores'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

export const sectionWidth = (_.window.width - _.wind * 3) / 2
export const sectionHeight = sectionWidth / 2

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
      await calendarStore.fetchHomeFromCDN()
    }

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
    const { online } = systemStore.ota
    return online
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
}
