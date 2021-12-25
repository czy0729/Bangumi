/*
 * @Author: czy0729
 * @Date: 2019-06-24 19:35:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-25 08:18:23
 */
import { observable, computed } from 'mobx'
import { discoveryStore } from '@stores'
import store from '@utils/store'
import { info } from '@utils/ui'
import { t } from '@utils/fetch'

const namespace = 'ScreenAnitama'
const excludeState = {
  page: 1,
  ipt: '1'
}
let prevPage

export default class ScreenAnitama extends store {
  state = observable({
    show: false,
    history: [],
    ...excludeState,
    _loaded: false
  })

  init = async () => {
    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      ...excludeState,
      show: true,
      _loaded: true
    })

    // App首次启动使用页码1, 再次进入页面使用之前的页码
    if (!prevPage) {
      prevPage = this.state.page
    } else {
      this.setState({
        page: Number(prevPage),
        ipt: String(prevPage)
      })
    }

    this.fetchList()
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
    prevPage = _page
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
    prevPage = _page
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
    prevPage = _ipt
    this.fetchList()

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, namespace)
    }, 400)
  }
}
