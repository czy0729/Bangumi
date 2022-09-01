/*
 * @Author: czy0729
 * @Date: 2019-06-24 19:35:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 12:17:15
 */
import { observable, computed } from 'mobx'
import { discoveryStore } from '@stores'
import { info } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { MODEL_NEWS } from '@constants'
import { Id } from '@types'

const namespace = 'ScreenAnitama'
const excludeState = {
  page: 1,
  ipt: '1'
}
let prevPage

export default class ScreenAnitama extends store {
  state = observable({
    ...excludeState,
    show: false,
    history: [],
    type: MODEL_NEWS.data[0].value,
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
  /** 资讯 */
  fetchList = () => {
    const { page, type } = this.state
    const label = MODEL_NEWS.getLabel(type)
    switch (label) {
      case '机核GCORES':
        return discoveryStore.fetchGCORESTimeline(page)

      default:
        return discoveryStore.fetchDMZJTimeline(page)
    }
  }

  // -------------------- get --------------------
  /** 资讯 */
  @computed get article() {
    const { page, type } = this.state
    const label = MODEL_NEWS.getLabel(type)
    switch (label) {
      case '机核GCORES':
        return discoveryStore.gcoresTimeline(page)

      default:
        return discoveryStore.dmzjTimeline(page)
    }
  }

  @computed get url() {
    const { page, type } = this.state
    const label = MODEL_NEWS.getLabel(type)
    switch (label) {
      case '机核GCORES':
        return `https://www.gcores.com/news?page=${page}`

      default:
        return 'https://m.news.dmzj.com'
    }
  }

  // -------------------- page --------------------
  /** 前一页 */
  prev = () => {
    const { page } = this.state
    if (page == 1) return

    const _page = parseInt(String(page)) - 1
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

  /** 下一页 */
  next = () => {
    const { page } = this.state

    const _page = parseInt(String(page)) + 1
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

  /** 切换站点 */
  toggleType = (label: string) => {
    this.setState({
      type: MODEL_NEWS.getValue(label),
      ...excludeState
    })
    this.setStorage(undefined, undefined, namespace)

    this.fetchList()
  }

  /** 分页输入框改变 */
  onChange = ({ nativeEvent }) => {
    const { text } = nativeEvent
    this.setState({
      ipt: text
    })
  }

  /** 记录文章已看过 */
  pushHistory = (aid: Id) => {
    const { history } = this.state
    if (!history.includes(aid)) {
      this.setState({
        history: [...history, aid]
      })
      this.setStorage(undefined, undefined, namespace)
    }
  }

  // -------------------- action --------------------
  /** 页码跳转 */
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
