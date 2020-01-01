/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-01 22:37:07
 */
import { observable, computed } from 'mobx'
import { _, calendarStore, userStore } from '@stores'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { xhrCustom } from '@utils/fetch'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

const namespace = 'ScreenDiscovery'
export const sectionWidth = (_.window.width - _.wind * 3) / 2
export const sectionHeight = sectionWidth / 2

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

    this.fetchOnline()
    return calendarStore.fetchHome()
  }

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
        url: 'https://czy0729.github.io/Bangumi/web/data.json'
      })
      const { online = '' } = JSON.parse(_response)
      this.setState({
        online
      })

      this.setStorage(undefined, undefined, namespace)
    } catch (error) {
      warn(namespace, 'fetchOnline', error)
    }
  }

  // -------------------- get --------------------
  @computed get userInfo() {
    return userStore.userInfo
  }

  @computed get home() {
    return calendarStore.home
  }
}
