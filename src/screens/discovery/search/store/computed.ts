/*
 * @Author: czy0729
 * @Date: 2024-06-03 11:42:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-30 22:30:11
 */
import { computed } from 'mobx'
import { searchStore, subjectStore, userStore } from '@stores'
import { x18 } from '@utils'
import { HTML_SEARCH, MODEL_SEARCH_CAT } from '@constants'
import { SearchCatCn, SubjectId } from '@types'
import State from './state'

export default class Computed extends State {
  /** 搜索结果 */
  @computed get search() {
    const { cat, value } = this.state
    const search = searchStore.search(value, cat)
    if (!userStore.isLimit) return search

    return {
      ...search,
      list: search.list.filter(item => !x18(item.id))
    }
  }

  /** 搜索具体网址 */
  @computed get url() {
    const { value = '', cat, legacy = '' } = this.state
    const _text = value.replace(/ /g, '+')
    return HTML_SEARCH(encodeURIComponent(_text), cat, 1, legacy)
  }

  /** 当前是否在搜索用户 */
  @computed get isUser() {
    return MODEL_SEARCH_CAT.getLabel<SearchCatCn>(this.state.cat) === '用户'
  }

  /** 是否显示推荐词 */
  @computed get showAdvance() {
    if (!this.state.focus || this.state.cat === 'user' || this.search.list.length) {
      return false
    }

    return true
  }

  /** 条目信息 */
  subject(subjectId: SubjectId) {
    return computed(() => subjectStore.subject(subjectId)).get()
  }

  @computed get hm() {
    return [this.url, 'Search'] as const
  }
}
