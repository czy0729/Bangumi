/*
 * @Author: czy0729
 * @Date: 2019-05-15 02:20:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-28 20:26:40
 */
import { observable, computed } from 'mobx'
import { searchStore } from '@stores'
import store from '@utils/store'
import { info } from '@utils/ui'
import { MODEL_SEARCH_CAT } from '@constants/model'

const namespace = 'ScreenSearch'
const initCat = MODEL_SEARCH_CAT.getValue('条目')

export default class ScreenSearch extends store {
  state = observable({
    history: [],
    cat: initCat,
    value: '',
    searching: false,
    _loaded: false
  })

  init = async () => {
    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      value: '',
      searching: false,
      _loaded: true
    })
    return res
  }

  // -------------------- get --------------------
  search() {
    const { cat, value } = this.state
    return computed(() => searchStore.search(value, cat)).get()
  }

  // -------------------- page --------------------
  onSelect = label => {
    const { cat } = this.state
    const nextCat = MODEL_SEARCH_CAT.getValue(label)
    if (nextCat !== cat) {
      this.setState({
        cat: nextCat
      })
      this.setStorage(undefined, undefined, namespace)
    }
  }

  onChange = ({ nativeEvent }) => {
    const { text } = nativeEvent
    this.setState({
      value: text
    })
  }

  selectHistory = value => {
    this.setState({
      value
    })
  }

  deleteHistory = value => {
    const { history } = this.state
    this.setState({
      history: history.filter(item => item !== value)
    })
    this.setStorage(undefined, undefined, namespace)
  }

  // -------------------- action --------------------
  doSearch = async refresh => {
    const { history, cat, value } = this.state
    if (value === '') {
      info('请输入内容')
      return
    }

    const _history = [...history]
    if (!history.includes(value)) {
      _history.unshift(value)
    }
    if (refresh) {
      if (_history.length > 10) {
        _history.pop()
      }
      this.setState({
        history: _history,
        searching: true
      })
      this.setStorage(undefined, undefined, namespace)
    }

    try {
      await searchStore.fetchSearch(
        {
          cat,
          text: value
        },
        refresh
      )
    } catch (ex) {
      info('请稍候再查询')
    }

    if (refresh) {
      this.setState({
        searching: false
      })
    }
  }
}
