/*
 * @Author: czy0729
 * @Date: 2019-04-12 13:58:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-24 22:17:35
 */
import { observable, computed } from 'mobx'
import { systemStore, userStore, timelineStore } from '@stores'
import { fetchHTML } from '@utils/fetch'
import store from '@utils/store'
import { MODEL_TIMELINE_SCOPE, MODEL_TIMELINE_TYPE } from '@constants/model'

export const tabs = MODEL_TIMELINE_TYPE.data.map(item => ({
  title: item.label
}))

export default class ScreenTimeline extends store {
  state = observable({
    scope: MODEL_TIMELINE_SCOPE.getValue('好友'),
    page: 0, // <Tabs>当前页数
    _page: 0, // header上的假<Tabs>当前页数,
    _loaded: false
  })

  init = async () => {
    const res = this.getStorage()
    const state = await res
    this.setState({
      ...state,
      _loaded: true
    })

    if (this.autoFetch) {
      this.fetchTimeline(true)
    }

    return res
  }

  // -------------------- get --------------------
  @computed get autoFetch() {
    return systemStore.setting.autoFetch
  }

  @computed get isWebLogin() {
    return userStore.isWebLogin
  }

  @computed get myUserId() {
    return userStore.myUserId
  }

  timeline(scope, type) {
    return computed(() => timelineStore.timeline(scope, type)).get()
  }

  // -------------------- fetch --------------------
  fetchTimeline = refresh => {
    const { scope, page } = this.state
    const type = MODEL_TIMELINE_TYPE.getValue(tabs[page].title)
    return timelineStore.fetchTimeline({ scope, type }, refresh)
  }

  // -------------------- page --------------------
  /**
   * @issue onTabClick与onChange在用受控模式的时候, 有冲突
   * 暂时这样解决
   */
  onTabClick = (item, page) => {
    if (page === this.state.page) {
      return
    }

    this.setState({
      page
    })
    // @issue onTabClick与onChange在用受控模式的时候有冲突, 暂时这样解决
    setTimeout(() => {
      this.setState({
        _page: page
      })
      this.setStorage()
    }, 400)
    this.fetchTimeline(true)
  }

  onChange = (item, page) => {
    if (page === this.state.page) {
      return
    }

    // 这里最后一个tab是假占位, 跳回到第一个tab
    if (page + 1 === tabs.length) {
      this.setState({
        page: 0,
        _page: 0
      })
    } else {
      this.setState({
        page,
        _page: page
      })
    }

    this.fetchTimeline(true)
    this.setStorage()
  }

  onSelectScope = label => {
    const { scope } = this.state
    const nextScope = MODEL_TIMELINE_SCOPE.getValue(label)
    if (nextScope !== scope) {
      this.setState({
        scope: nextScope
      })
      this.fetchTimeline(true)
      this.setStorage()
    }
  }

  // -------------------- action --------------------
  /**
   * 删除时间线
   */
  doDelete = async href => {
    if (!href) {
      return false
    }

    const res = fetchHTML({
      method: 'POST',
      url: href
    })
    await res
    this.fetchTimeline(true)

    return res
  }
}
