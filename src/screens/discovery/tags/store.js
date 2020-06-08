/*
 * @Author: czy0729
 * @Date: 2019-10-03 14:48:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-26 09:42:17
 */
import { observable, computed } from 'mobx'
import { discoveryStore, userStore } from '@stores'
import store from '@utils/store'
import { x18s } from '@utils/app'
import { t } from '@utils/fetch'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import { HTML_TAGS } from '@constants/html'

export const tabs = MODEL_SUBJECT_TYPE.data.map(item => ({
  title: item.title,
  key: item.label
}))
const namespace = 'ScreenTags'

export default class ScreenTags extends store {
  state = observable({
    page: 0,
    _loaded: false
  })

  init = async () => {
    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      _loaded: true
    })

    const { page } = this.state
    const { key } = tabs[page]
    const { _loaded } = this.list(key)
    if (!_loaded) {
      return this.fetchList(key, true)
    }
    return true
  }

  // -------------------- fetch --------------------
  fetchList = (type, refresh) =>
    discoveryStore.fetchTags(
      {
        type
      },
      refresh
    )

  // -------------------- get --------------------
  list(type) {
    return computed(() => {
      const tags = discoveryStore.tags(type)
      if (userStore.isLimit) {
        return {
          ...tags,
          list: tags.list.filter(item => !x18s(item.name))
        }
      }
      return tags
    }).get()
  }

  @computed get url() {
    const { page } = this.state
    const { key } = tabs[page]
    return HTML_TAGS(key)
  }

  // -------------------- page --------------------
  onChange = (item, page) => {
    if (page === this.state.page) {
      return
    }

    t('标签索引.标签页切换')
    this.setState({
      page
    })
    this.setStorage(undefined, undefined, namespace)
    this.tabChangeCallback(page)
  }

  tabChangeCallback = page => {
    const { key } = tabs[page]
    const { _loaded } = this.list(key)

    if (!_loaded) {
      this.fetchList(key, true)
    }
  }
}
