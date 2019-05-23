/*
 * @Author: czy0729
 * @Date: 2019-05-17 21:53:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-23 15:55:12
 */
import { NetInfo } from 'react-native'
import { observable, computed } from 'mobx'
import store from '@utils/store'

const initImageViewer = {
  visible: false,
  imageUrls: []
}

class SystemStore extends store {
  state = observable({
    wifi: false,
    imageViewer: initImageViewer
  })

  async init() {
    const res = NetInfo.getConnectionInfo()
    const { type } = await res
    if (type === 'wifi') {
      this.setState({
        wifi: true
      })
    }

    return res
  }

  // -------------------- get --------------------
  @computed get isWifi() {
    return this.state.wifi
  }

  @computed get imageViewer() {
    return this.state.imageViewer
  }

  // -------------------- fetch --------------------

  // -------------------- page --------------------
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
}

export default new SystemStore()
