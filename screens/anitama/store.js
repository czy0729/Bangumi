/*
 * @Author: czy0729
 * @Date: 2019-06-24 19:35:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-24 21:16:41
 */
import { observable, computed } from 'mobx'
import { discoveryStore } from '@stores'
import store from '@utils/store'
import { info } from '@utils/ui'

const namespace = 'ScreenAnitama'

export default class ScreenAnitama extends store {
  state = observable({
    page: 1,
    show: true,
    ipt: '1',
    history: [],
    _loaded: false
  })

  init = async () => {
    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      _loaded: true
    })

    discoveryStore.fetchAnitamaTimeline()
    return res
  }

  // -------------------- fetch --------------------
  fetchAnitamaTimeline = () => {
    const { page } = this.state
    return discoveryStore.fetchAnitamaTimeline(page)
  }

  // -------------------- get --------------------
  @computed get anitamaTimeline() {
    const { page } = this.state
    return discoveryStore.anitamaTimeline(page)
  }

  // -------------------- page --------------------
  prev = async () => {
    const { page } = this.state
    if (page === 1) {
      return
    }

    this.setState({
      page: page - 1,
      show: false,
      ipt: String(page - 1)
    })
    this.fetchAnitamaTimeline()

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, namespace)
    }, 400)
  }

  next = async () => {
    const { page } = this.state
    this.setState({
      page: page + 1,
      show: false,
      ipt: String(page + 1)
    })
    this.fetchAnitamaTimeline()

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, namespace)
    }, 400)
  }

  onChange = ({ nativeEvent }) => {
    const { text } = nativeEvent
    this.setState({
      ipt: text
    })
  }

  pushHistory = aid => {
    const { history } = this.state
    if (!history.includes(aid)) {
      this.setState({
        history: [...history, aid]
      })
      this.setStorage(undefined, undefined, namespace)
    }
  }

  // -------------------- action --------------------
  doSearch = () => {
    const { ipt } = this.state
    const _ipt = ipt === '' ? 1 : parseInt(ipt)
    if (_ipt < 1) {
      info('请输入正确页码')
      return
    }

    this.setState({
      page: _ipt,
      show: false,
      ipt: String(_ipt)
    })
    this.fetchAnitamaTimeline()

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, namespace)
    }, 400)
  }
}
