/*
 * @Author: czy0729
 * @Date: 2019-06-24 19:35:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-07 09:15:59
 */
import { computed, observable } from 'mobx'
import { discoveryStore } from '@stores'
import { info } from '@utils'
import { t } from '@utils/fetch'
import store from '@utils/store'
import { MODEL_NEWS, NEWS } from '@constants'
import { Id } from '@types'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

let prevPage: number

export default class ScreenAnitama extends store<typeof STATE> {
  state = observable(STATE)

  init = async () => {
    const state = await this.getStorage(NAMESPACE)

    // 动漫之家 api 暂时挂了
    if (state?.type === NEWS[2].value) state.type = NEWS[0].value
    this.setState({
      ...state,
      ...EXCLUDE_STATE,
      show: true,
      _loaded: true
    })

    // App 首次启动使用页码 1, 再次进入页面使用之前的页码
    if (!prevPage) {
      prevPage = this.state.page
    } else {
      this.setState({
        page: Number(prevPage),
        ipt: String(prevPage)
      })
    }

    this.fetchList()
    return true
  }

  // -------------------- fetch --------------------
  /** 资讯 */
  fetchList = () => {
    const { page, type } = this.state
    const label = MODEL_NEWS.getLabel(type)
    switch (label) {
      case '和邪社':
        return discoveryStore.fetchHeXieSheTimeline(page)

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
      case '和邪社':
        return discoveryStore.hexiesheTimeline(page)

      case '机核GCORES':
        return discoveryStore.gcoresTimeline(page)

      default:
        return discoveryStore.dmzjTimeline(page)
    }
  }

  @computed get url() {
    const { type } = this.state
    const label = MODEL_NEWS.getLabel(type)
    switch (label) {
      case '和邪社':
        return 'https://www.hexieshe.cn'

      case '机核GCORES':
        return 'https://www.gcores.com/news'

      default:
        return 'https://m.news.dmzj.com'
    }
  }

  // -------------------- page --------------------
  /** 隐藏后延迟显示列表 (用于重置滚动位置) */
  resetScrollView = () => {
    this.setState({
      show: false
    })

    setTimeout(() => {
      this.setState({
        show: true
      })

      this.setStorage(NAMESPACE)
    }, 400)
  }

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
      ipt: String(_page)
    })
    prevPage = _page
    this.fetchList()
    this.resetScrollView()
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
      ipt: String(_page)
    })
    prevPage = _page
    this.fetchList()
    this.resetScrollView()
  }

  /** 切换站点 */
  toggleType = (label: string) => {
    this.setState({
      type: MODEL_NEWS.getValue(label),
      ...EXCLUDE_STATE
    })
    this.setStorage(NAMESPACE)
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
      this.setStorage(NAMESPACE)
    }
  }

  /** 切换是否使用内置浏览器打开网页 */
  toggleUseWebView = () => {
    const value = !this.state.useWebView
    this.setState({
      useWebView: value
    })
    this.setStorage(NAMESPACE)

    if (value) {
      info('使用内置浏览器打开')
    } else {
      info('使用外部浏览器打开')
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
      ipt: String(_ipt)
    })
    prevPage = _ipt
    this.fetchList()
    this.resetScrollView()
  }
}
