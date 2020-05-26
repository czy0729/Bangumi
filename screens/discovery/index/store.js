/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-25 20:48:23
 */
import { observable, computed } from 'mobx'
import { _, systemStore, calendarStore, userStore } from '@stores'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { xhrCustom } from '@utils/fetch'
import { GITHUB_DATA } from '@constants'
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
    online: ''
  })

  init = async () => {
    const { online = '' } = (await this.getStorage(undefined, namespace)) || {}
    this.setState({
      online
    })

    const { setting } = systemStore
    if (setting.cdn) {
      await calendarStore.fetchHomeFromCDN()
    }

    this.fetchOnline()
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

  fetchOnline = async () => {
    try {
      const { _response } = await xhrCustom({
        url: `${GITHUB_DATA}?t=${getTimestamp()}`
      })
      const data = JSON.parse(_response)
      const { online = '' } = data
      this.setState({
        online
      })

      this.setStorage(undefined, undefined, namespace)
      return data
    } catch (error) {
      warn(namespace, 'fetchOnline', error)
      return {}
    }
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
}
