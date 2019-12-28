/*
 * @Author: czy0729
 * @Date: 2019-05-15 02:20:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-28 14:09:31
 */
import { observable, computed } from 'mobx'
import { searchStore } from '@stores'
import store from '@utils/store'
import { info } from '@utils/ui'
import { t } from '@utils/fetch'
import { MODEL_SEARCH_CAT, MODEL_SEARCH_LEGACY } from '@constants/model'

const namespace = 'ScreenSearch'
const initCat = MODEL_SEARCH_CAT.getValue('条目')
const initLegacy = MODEL_SEARCH_LEGACY.getValue('模糊')

export default class ScreenSearch extends store {
  state = observable({
    history: [],
    cat: initCat,
    legacy: initLegacy, // 是否精准查询
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
    const { cat, legacy, value } = this.state
    return computed(() => searchStore.search(value, cat, legacy)).get()
  }

  // -------------------- page --------------------
  onSelect = label => {
    const { cat } = this.state
    const nextCat = MODEL_SEARCH_CAT.getValue(label)
    if (nextCat !== cat) {
      t('搜索.切换类型', {
        cat: nextCat
      })

      this.setState({
        cat: nextCat
      })
      this.setStorage(undefined, undefined, namespace)
    }
  }

  onLegacySelect = label => {
    const { legacy } = this.state
    const nextLegacy = MODEL_SEARCH_LEGACY.getValue(label)
    if (nextLegacy !== legacy) {
      t('搜索.切换细分类型', {
        legacy: nextLegacy
      })

      this.setState({
        legacy: nextLegacy
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
    t('搜索.选择历史', {
      value
    })

    this.setState({
      value
    })
  }

  deleteHistory = value => {
    t('搜索.删除历史', {
      value
    })

    const { history } = this.state
    this.setState({
      history: history.filter(item => item !== value)
    })
    this.setStorage(undefined, undefined, namespace)
  }

  // -------------------- action --------------------
  doSearch = async refresh => {
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
          legacy,
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
