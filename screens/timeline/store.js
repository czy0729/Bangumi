/*
 * @Author: czy0729
 * @Date: 2019-04-12 13:58:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-20 02:39:45
 */
import { observable, computed } from 'mobx'
import { timelineStore } from '@stores'
import { MODEL_TIMELINE_SCOPE, MODEL_TIMELINE_TYPE } from '@constants/model'
import store from '@utils/store'

export const tabs = MODEL_TIMELINE_TYPE.data.map(item => ({
  title: item.label
}))

export default class ScreenTimeline extends store {
  state = observable({
    loading: true, // 是否加载数据中
    scope: MODEL_TIMELINE_SCOPE.getValue('好友'),
    page: 0 // <Tabs>缓存当前页数,
  })

  // -------------------- get --------------------
  getTimeline(scope, type) {
    return computed(() => timelineStore.getTimeline(scope, type)).get()
  }

  // -------------------- fetch --------------------
  fetchTimeline = refresh => {
    const { scope, page } = this.state
    const type = MODEL_TIMELINE_TYPE.getValue(tabs[page].title)
    return timelineStore.fetchTimeline({ scope, type }, refresh)
  }

  // -------------------- page --------------------
  initFetch = async () => {
    const state = await this.getStorage()
    if (state) {
      this.setState(state)
    }

    this.fetchTimeline(true)
    this.setState({
      loading: false
    })
    this.setStorage()
  }

  tabsChange = (item, page) => {
    this.setState({
      page
    })
    this.setStorage()
    this.fetchTimeline(true)
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
}
