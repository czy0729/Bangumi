/*
 * @Author: czy0729
 * @Date: 2019-09-03 21:52:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-03 22:11:30
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import store from '@utils/store'
import { info } from '@utils/ui'

const namespace = 'ScreenTinygrailSearch'

export default class ScreenTinygrailSearch extends store {
  state = observable({
    history: [],
    value: '',
    _loaded: false
  })

  init = async () => {
    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      value: '',
      _loaded: true
    })
    return res
  }

  // -------------------- get --------------------
  chara(monoId) {
    return computed(() => tinygrailStore.characters(monoId)).get()
  }

  // -------------------- page --------------------
  onChange = ({ nativeEvent }) => {
    const { text } = nativeEvent
    this.setState({
      value: text
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
  doSearch = async navigation => {
    const { history, value } = this.state
    if (value === '') {
      info('请输入人物id')
      return
    }

    const _history = [...history]
    if (!history.includes(value)) {
      _history.unshift(value)
    }
    if (_history.length > 10) {
      _history.pop()
    }
    this.setState({
      value: '',
      history: _history
    })
    this.setStorage(undefined, undefined, namespace)

    navigation.push('TinygrailTrade', {
      monoId: value
    })
  }
}
