/*
 * @Author: czy0729
 * @Date: 2019-04-27 14:09:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-29 16:42:51
 */
import { observable, computed } from 'mobx'
import { rakuenStore } from '@stores'
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

    // 超展开页面初始化时, 假如有缓存, 不重新请求
    const { page } = this.state
    const type = MODEL_RAKUEN_TYPE.getValue(tabs[page].title)
    const { _loaded, list } = this.rakuen(type)
    if (!_loaded || list.length === 0) {
      this.fetchRakuen(true)
    }

    return res
  }

  // -------------------- get --------------------
  rakuen(type) {
    const { scope } = this.state
    return computed(() => rakuenStore.rakuen(scope, type)).get()
  }

  // -------------------- fetch --------------------
  fetchRakuen = refresh => {
    const { scope, page } = this.state
    const type = MODEL_RAKUEN_TYPE.getValue(tabs[page].title)
    return rakuenStore.fetchRakuen({ scope, type }, refresh)
  }

  // -------------------- page --------------------
  /**
   * @issue onTabClick与onChange在用受控模式的时候, 有冲突
   * 暂时这样解决
   */
  onTabClick = ({ title }, page) => {
    if (page === this.state.page) {
      return
    }
    this.setState({
      page
    })
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
