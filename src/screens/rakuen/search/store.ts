/*
 * @Author: czy0729
 * @Date: 2019-05-15 02:20:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-16 07:28:29
 */
import { observable, computed } from 'mobx'
import { searchStore, systemStore } from '@stores'
import { info } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'

const NAMESPACE = 'ScreenRakuenSearch'
const EXCLUDE_STATE = {
  value: '',
  searching: false,
  cache: {}
} as const

export default class ScreenRakuenSearch extends store {
  state = observable({
    history: [],
    ...EXCLUDE_STATE,
    _loaded: false
  })

  init = async () => {
    const state = await this.getStorage(NAMESPACE)
    this.setState({
      ...state,
      ...EXCLUDE_STATE,
      _loaded: true
    })
    return state
  }

  // -------------------- get --------------------
  @computed get search() {
    const { advance } = systemStore
    const { value } = this.state
    const search = searchStore.rakuenSearch(value, true)
    if (advance) return search

    const filterCount = 8
    const list = search.list.filter((item, index) => index <= filterCount)
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
    this.setStorage(undefined, undefined, NAMESPACE)
  }

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
      searching: true
    })
    this.setStorage(NAMESPACE)

    try {
      await searchStore.fetchRakuenSearch(value, true)
    } catch (ex) {
      info('请稍候再查询')
    }

    this.setState({
      searching: false
    })
  }

  // cacheTopics = () => {
  //   const { cache } = this.state
  //   const fetchs = []
  //   this.search.list.forEach(item => {
  //     if (!cache[item.topicId]) {
  //       fetchs.push(async () => {
  //         try {
  //           const { _response } = await xhrCustom({
  //             url: CDN_RAKUEN(item.topicId.replace('group/', ''))
  //           })

  //           const { title, avatar, userName, time, group } = JSON.parse(_response)
  //           cache[item.topicId] = {
  //             title,
  //             avatar,
  //             userName,
  //             time,
  //             group
  //           }
  //           this.setState({
  //             cache
  //           })
  //           return true
  //         } catch (error) {
  //           return true
  //         }
  //       })

  //       queue(fetchs)
  //     }
  //   })
  // }
}
