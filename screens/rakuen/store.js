/*
 * @Author: czy0729
 * @Date: 2019-04-27 14:09:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-22 15:49:18
 */
import { observable, computed } from 'mobx'
import { rakuenStore, userStore } from '@stores'
import store from '@utils/store'
import { MODEL_RAKUEN_SCOPE, MODEL_RAKUEN_TYPE } from '@constants/model'

export const tabs = MODEL_RAKUEN_TYPE.data.map(item => ({
  title: item.label
}))

export default class RakuenStore extends store {
  state = observable({
    scope: MODEL_RAKUEN_SCOPE.getValue('全局聚合'),
    page: 0, // <Tabs>当前页数
    _page: 0, // header上的假<Tabs>当前页数
    _loaded: false
  })

  init = async () => {
    const res = this.getStorage()
    const state = await res
    this.setState({
      ...state,
      _loaded: true
    })

    this.fetchRakuen(true)

    return res
  }

  // -------------------- get --------------------
  rakuen(type) {
    const { scope } = this.state
    return computed(() => rakuenStore.rakuen(scope, type)).get()
  }

  comments(topidId) {
    return computed(() => rakuenStore.comments(topidId)).get()
  }

  @computed get notifyUnread() {
    return rakuenStore.notify.unread
  }

  @computed get isWebLogin() {
    return userStore.isWebLogin
  }

  // -------------------- fetch --------------------
  fetchRakuen = refresh => {
    const { scope, page } = this.state
    const type = MODEL_RAKUEN_TYPE.getValue(tabs[page].title)
    return rakuenStore.fetchRakuen({ scope, type }, refresh)
  }

  // -------------------- page --------------------
  onTabClick = ({ title }, page) => {
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
    }, 400)
    this.shouldFetchRakuen(title)
  }

  onChange = ({ title }, page) => {
    if (page === this.state.page) {
      return
    }

    this.setState({
      page,
      _page: page
    })
    this.shouldFetchRakuen(title)
  }

  shouldFetchRakuen(title) {
    const type = MODEL_RAKUEN_TYPE.getValue(title)
    const { _loaded, list } = this.rakuen(type)
    if (!_loaded || list.length === 0) {
      this.fetchRakuen(true)
    }
    this.setStorage()
  }

  // -------------------- action --------------------
}
