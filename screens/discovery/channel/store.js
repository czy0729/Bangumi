/*
 * @Author: czy0729
 * @Date: 2020-05-02 21:04:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-04 21:00:47
 */
import { observable, computed } from 'mobx'
import { discoveryStore } from '@stores'
import { HTML_CHANNEL } from '@constants/html'
import store from '@utils/store'

export default class ScreenChannel extends store {
  state = observable({
    type: ''
  })

  init = () => {
    this.setState({
      type: this.type
    })
    this.fetchChannel()
  }

  // -------------------- get --------------------
  @computed get type() {
    const { type } = this.state
    return type || this.params.type
  }

  @computed get channel() {
    return discoveryStore.channel(this.type)
  }

  @computed get url() {
    return HTML_CHANNEL(this.type)
  }

  // -------------------- fetch --------------------
  fetchChannel = () =>
    discoveryStore.fetchChannel({
      type: this.type
    })

  // -------------------- page --------------------
  toggleType = type => {
    this.setState({
      type
    })
    this.fetchChannel()
  }
}
