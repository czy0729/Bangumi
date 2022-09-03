/*
 * @Author: czy0729
 * @Date: 2019-10-03 14:48:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-03 13:03:46
 */
import { observable, computed } from 'mobx'
import { discoveryStore, userStore } from '@stores'
import { x18s } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { HTML_TAGS } from '@constants'
import { SubjectType } from '@types'
import { EXCLUDE_STATE, NAMESPACE, STATE, TABS } from './ds'

export default class ScreenTags extends store {
  state = observable(STATE)

  init = async () => {
    const state = await this.getStorage(NAMESPACE)
    this.setState({
      ...state,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    const { _loaded } = this.list(this.type)
    if (!_loaded) return this.fetchList(this.type, true)
    return true
  }

  // -------------------- fetch --------------------
  /** 标签 */
  fetchList = (type: SubjectType, refresh: boolean = false) => {
    const { filter } = this.state
    return discoveryStore.fetchTags(
      {
        type,
        filter
      },
      refresh
    )
  }

  // -------------------- get --------------------
  @computed get type() {
    const { page } = this.state
    return TABS[page].key
  }

  @computed get url() {
    const { page, filter } = this.state
    return HTML_TAGS(this.type, page, filter)
  }

  /** 标签 */
  list(type: SubjectType) {
    return computed(() => {
      const { filter } = this.state
      const tags = discoveryStore.tags(type, filter)
      if (userStore.isLimit) {
        return {
          ...tags,
          list: tags.list.filter(item => !x18s(item.name))
        }
      }
      return tags
    }).get()
  }

  // -------------------- page --------------------
  /** 标签页切换 */
  onChange = (page: number) => {
    if (page === this.state.page) return

    t('标签索引.标签页切换')
    this.setState({
      page
    })
    this.setStorage(NAMESPACE)
    this.tabChangeCallback(page)
  }

  /** 标签页切换回调 */
  tabChangeCallback = (page: number) => {
    const { key } = TABS[page]
    const { _loaded } = this.list(key)

    if (!_loaded) this.fetchList(key, true)
  }

  /** 筛选输入框改变 */
  onFilterChange = (ipt: string) => {
    const _ipt = ipt.trim()
    if (!_ipt) {
      this.setState({
        ipt: _ipt,
        filter: ''
      })
      return
    }

    this.setState({
      ipt: _ipt
    })
  }

  /** 输入法键盘按钮提交 */
  onSubmitEditing = () => {
    const { ipt } = this.state
    if (ipt && ipt.length) {
      this.setState({
        filter: ipt
      })
      this.fetchList(this.type, true)
    }
  }
}
