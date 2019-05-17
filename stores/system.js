/*
 * @Author: czy0729
 * @Date: 2019-05-17 21:53:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-17 21:54:57
 */
import { NetInfo } from 'react-native'
import { observable, computed } from 'mobx'
import store from '@utils/store'

class SystemStore extends store {
  state = observable({
    wifi: false
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

  // -------------------- fetch --------------------
}

export default new SystemStore()
