/*
 * @Author: czy0729
 * @Date: 2019-05-17 21:53:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-28 20:18:14
 */
import { NetInfo } from 'react-native'
import { observable, computed } from 'mobx'
import store from '@utils/store'
import { MODEL_SETTING_QUALITY } from '@constants/model'

const namespace = 'System'
const initSetting = {
  quality: MODEL_SETTING_QUALITY.getValue('默认'), // 图片质量
  cnFirst: true, // 是否中文优先
  autoFetch: true // 切换页面自动请求
}
const initImageViewer = {
  visible: false,
  imageUrls: []
}

class System extends store {
  state = observable({
    setting: initSetting,
    wifi: false,
    imageViewer: initImageViewer,
    dev: false
  })

  async init() {
    let res
    res = Promise.all([this.getStorage('setting', namespace)])
    const state = await res
    this.setState({
      setting: state[0] || initSetting
    })

    res = NetInfo.getConnectionInfo()
    const { type } = await res
    if (type === 'wifi') {
      this.setState({
        wifi: true
      })
    }

    return res
  }

  // -------------------- get --------------------
  @computed get setting() {
    return this.state.setting
  }

  @computed get isWifi() {
    return this.state.wifi
  }

  @computed get imageViewer() {
    return this.state.imageViewer
  }

  // -------------------- fetch --------------------

  // -------------------- page --------------------
  /**
   * 设置``
   */
  setQuality = label => {
    const quality = MODEL_SETTING_QUALITY.getValue(label)
    if (quality) {
      const key = 'setting'
      this.setState({
        [key]: {
          ...this.setting,
          quality
        }
      })
      this.setStorage(key, undefined, namespace)
    }
  }

  /**
   * 切换`中文优先`
   */
  switchCnFirst = () => {
    const { cnFirst } = this.setting
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        cnFirst: !cnFirst
      }
    })
    this.setStorage(key, undefined, namespace)
  }

  /**
   * 切换`切换页面自动请求`
   */
  switchAutoFetch = () => {
    const { autoFetch } = this.setting
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        autoFetch: !autoFetch
      }
    })
    this.setStorage(key, undefined, namespace)
  }

  /**
   * 显示ImageViewer
   * @param {*} imageUrls Image Source
   */
  showImageViewer = (imageUrls = []) => {
    this.setState({
      imageViewer: {
        visible: true,
        imageUrls
      }
    })
  }

  /**
   * 隐藏ImageViewer
   */
  closeImageViewer = () => {
    this.setState({
      imageViewer: initImageViewer
    })
  }

  toggleDev = () => {
    const { dev } = this.state
    this.setState({
      dev: !dev
    })
  }
}

export default new System()
