/*
 * @Author: czy0729
 * @Date: 2019-05-15 02:20:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-12 05:23:04
 */
import { computed, observable } from 'mobx'
import { searchStore, systemStore } from '@stores'
import { feedback, info, updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import store from '@utils/store'
import { EXCLUDE_STATE, NAMESPACE, RESET_STATE, STATE } from './ds'

export default class ScreenRakuenSearch extends store<typeof STATE> {
  state = observable(STATE)

  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded: true
    })
  }

  save = () => {
    return this.saveStorage(NAMESPACE, EXCLUDE_STATE)
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }

  // -------------------- get --------------------
  @computed get search() {
    const { advance } = systemStore
    const { value } = this.state
    const search = searchStore.rakuenSearch(value, true)
    if (advance) return search

    const filterCount = 8
    const list = search.list.filter((_item, index) => index <= filterCount)
    return {
      ...search,
      list,
      pagination: {
        page: 1,
        pageTotal: 1
      },
      _pageTotal: search.pagination.pageTotal,
      _filter: search.list.length - filterCount
    }
  }

  // -------------------- page --------------------
  onChange = ({ nativeEvent }) => {
    const { text } = nativeEvent
    this.setState({
      value: text
    })
  }

  selectHistory = (value: string) => {
    t('帖子搜索.选择历史', {
      value
    })

    this.setState({
      value
    })
    this.doSearch()
  }

  deleteHistory = (value: string) => {
    t('帖子搜索.删除历史', {
      value
    })

    const { history } = this.state
    this.setState({
      history: history.filter(item => item !== value)
    })
    this.save()
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)

  // -------------------- action --------------------
  doSearch = async () => {
    const { history, value } = this.state
    if (value === '') {
      info('请输入内容')
      return
    }

    t('帖子搜索.搜索', {
      value
    })

    const _history = [...history]
    if (!history.includes(value)) _history.unshift(value)

    if (_history.length > 10) _history.pop()
    this.setState({
      history: _history,
      searching: true,
      visibleBottom: EXCLUDE_STATE.visibleBottom
    })
    this.save()

    try {
      const data = await searchStore.fetchRakuenSearch(value, true)
      feedback(true)

      if (!data || !data?.length) info('没有查询到结果, 也有可能是搜索服务失效了')
    } catch (ex) {
      info('请稍候再查询')
    }

    this.setState({
      searching: false
    })
  }
}
