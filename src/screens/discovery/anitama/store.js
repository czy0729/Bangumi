/*
 * @Author: czy0729
 * @Date: 2019-06-24 19:35:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-20 22:01:17
 */
import { observable, computed } from 'mobx'
import { discoveryStore } from '@stores'
import store from '@utils/store'
import { info } from '@utils/ui'
import { t } from '@utils/fetch'

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
      show: true,
      _loaded: true
    })

    discoveryStore.fetchDMZJTimeline()
    return res
  }

  // -------------------- fetch --------------------
  fetchList = () => {
    const { page } = this.state
    return discoveryStore.fetchDMZJTimeline(page)
  }

  // -------------------- get --------------------
  @computed get article() {
    const { page } = this.state
    const article = discoveryStore.dmzjTimeline(page)
    return article
  }

  // -------------------- page --------------------
  prev = () => {
    const { page } = this.state
    if (page == 1) return

    const _page = parseInt(page) - 1
    t('Anitama.上一页', {
      page: _page
    })

    this.setState({
      page: _page,
      show: false,
      ipt: String(_page)
    })
    this.fetchList()

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, namespace)
    }, 400)
  }

  next = () => {
    const { page } = this.state

    const _page = parseInt(page) + 1
    t('Anitama.下一页', {
      page: _page
    })

    this.setState({
      page: _page,
      show: false,
      ipt: String(_page)
    })
    this.fetchList()

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

    t('Anitama.页码跳转', {
      page: _ipt
    })

    this.setState({
      page: _ipt,
      show: false,
      ipt: String(_ipt)
    })
    this.fetchList()

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, namespace)
    }, 400)
  }
}
