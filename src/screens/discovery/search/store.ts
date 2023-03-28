/*
 * @Author: czy0729
 * @Date: 2019-05-15 02:20:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-28 17:26:27
 */
import { observable, computed } from 'mobx'
import { searchStore, userStore, collectionStore, subjectStore } from '@stores'
import { info, x18 } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { MODEL_SEARCH_CAT, MODEL_SEARCH_LEGACY, HTML_SEARCH } from '@constants'
import { Navigation, SearchCat, SearchCatCn, SearchLegacy, SubjectId } from '@types'
import { NAMESPACE, STATE, EXCLUDE_STATE } from './ds'
import { Params } from './types'

export default class ScreenSearch extends store {
  params: Params

  state = observable(STATE)

  init = async () => {
    const state = await this.getStorage(NAMESPACE)
    this.setState({
      ...state,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    this.initState()
    return true
  }

  /** 下拉刷新 */
  onHeaderRefresh = () => {
    return this.doSearch(true)
  }

  // -------------------- get --------------------
  /** 搜索结果 */
  search() {
    const { cat, legacy, value } = this.state
    return computed(() => {
      const search = searchStore.search(value, cat, legacy)
      if (!userStore.isLimit) return search

      return {
        ...search,
        list: search.list.filter(item => !x18(item.id))
      }
    }).get()
  }

  /** 搜索具体网址 */
  @computed get url() {
    const { value = '', cat, legacy = '' } = this.state
    const _text = value.replace(/ /g, '+')
    return HTML_SEARCH(encodeURIComponent(_text), cat, 1, legacy)
  }

  /** 当前是否在搜索用户 */
  @computed get isUser() {
    const { cat } = this.state
    const label = MODEL_SEARCH_CAT.getLabel<SearchCatCn>(cat)
    return label === '用户'
  }

  /** 是否显示推荐词 */
  @computed get showAdvance() {
    const { focus, cat } = this.state
    if (!focus || cat === 'mono_all' || cat === 'user' || this.search().list.length) {
      return false
    }

    return true
  }

  /** 条目信息 */
  subject(subjectId: SubjectId) {
    return computed(() => subjectStore.subject(subjectId)).get()
  }

  // -------------------- page --------------------
  /** 处理初始参数 */
  initState = () => {
    setTimeout(() => {
      const { _type, _value, type, value } = this.params
      if (type || _type) {
        this.setState({
          cat: MODEL_SEARCH_CAT.getValue<SearchCat>(type || _type)
        })
      }

      if (value || _value) {
        this.setState({
          value: String(value || _value)
        })
        this.setStorage(NAMESPACE)
        this.doSearch()
      }
    }, 40)
  }

  /** 切换类型 */
  onSelect = (label: string) => {
    const { cat } = this.state
    const nextCat = MODEL_SEARCH_CAT.getValue<SearchCat>(label)
    if (nextCat !== cat) {
      t('搜索.切换类型', {
        cat: nextCat
      })

      this.setState({
        cat: nextCat
      })
      this.setStorage(NAMESPACE)

      const { value } = this.state
      if (value) this.doSearch()
    }
  }

  /** 切换细分类型 */
  onLegacySelect = (label: string) => {
    const { legacy } = this.state
    const nextLegacy = MODEL_SEARCH_LEGACY.getValue<SearchLegacy>(label)
    if (nextLegacy !== legacy) {
      t('搜索.切换细分类型', {
        legacy: nextLegacy
      })

      this.setState({
        legacy: nextLegacy
      })
      this.setStorage(NAMESPACE)

      const { value } = this.state
      if (value) this.doSearch()
    }
  }

  /** 输入框改变 */
  onChangeText = (text: string) => {
    const state: {
      value: string
      focus?: boolean
    } = {
      value: text
    }
    if (text) state.focus = true
    this.setState(state)
  }

  /** 选择历史 */
  selectHistory = (value: string) => {
    t('搜索.选择历史', {
      value
    })

    this.setState({
      value
    })
  }

  /** 删除历史 */
  deleteHistory = (value: string) => {
    t('搜索.删除历史', {
      value
    })

    const { history } = this.state
    this.setState({
      history: history.filter(item => item !== value)
    })
    this.setStorage(NAMESPACE)
  }

  /** 删除全部历史 */
  deleteHistoryAll = () => {
    this.setState({
      history: []
    })
    this.setStorage(NAMESPACE)
  }

  /** 提交 */
  onSubmit = (navigation?: Navigation) => {
    if (this.isUser) {
      const { value } = this.state
      if (!value) return info('请输入完整的用户Id')

      return navigation.push('Zone', {
        userId: value
      })
    }

    return this.doSearch(true)
  }

  onAdvance = (text: string, navigation?: Navigation) => {
    this.setState({
      value: text,
      focus: false
    })
    this.onSubmit(navigation)
  }

  /** 获得焦点 */
  onFocus = () => {
    this.setState({
      focus: true
    })
  }

  /** 失去焦点 */
  onBlur = () => {
    this.setState({
      focus: true
    })
  }

  // -------------------- action --------------------
  /** 搜索 */
  doSearch = async (refresh?: boolean) => {
    const { history, cat, legacy, value } = this.state
    if (value === '') {
      info('请输入内容')
      return
    }

    t('搜索.搜索', {
      cat,
      value
    })

    const _history = [...history]
    if (!history.includes(value)) _history.unshift(value)

    if (refresh) {
      if (_history.length > 10) _history.pop()

      this.setState({
        history: _history,
        searching: true
      })
      this.setStorage(NAMESPACE)
    }

    try {
      const data = await searchStore.fetchSearch(
        {
          cat,
          legacy,
          text: value
        },
        refresh
      )

      // 延迟获取收藏中的条目的具体收藏状态
      setTimeout(() => {
        collectionStore.fetchCollectionStatusQueue(
          data.list
            .filter(item => item.collected)
            .map(item => String(item.id).replace('/subject/', ''))
        )
      }, 160)
    } catch (ex) {
      info('请稍候再查询')
    }

    this.setState({
      searching: false
    })
  }
}
