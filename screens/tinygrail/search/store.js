/*
 * @Author: czy0729
 * @Date: 2019-09-03 21:52:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-02-16 06:27:01
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import store from '@utils/store'
import { info } from '@utils/ui'
import { t } from '@utils/fetch'

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
    t('人物直达.删除历史', {
      value
    })

    const { history } = this.state
    this.setState({
      history: history.filter(item => item !== value)
    })
    this.setStorage(undefined, undefined, namespace)
  }

  // -------------------- action --------------------
  doSearch = async (navigation, lastValue) => {
    const { history, value } = this.state
    const checkValue = lastValue || value
    if (checkValue === '') {
      info('请输入人物id')
      return
    }

    let callback
    try {
      const characters = await tinygrailStore.fetchCharacters([checkValue])
      if (characters[checkValue].users) {
        callback = () =>
          navigation.push('TinygrailICODeal', {
            monoId: checkValue
          })
      } else {
        callback = () =>
          navigation.push('TinygrailDeal', {
            monoId: checkValue,
            type: 'asks'
          })
      }
    } catch (error) {
      info('未有找到该id人物信息')
      return
    }

    t('人物直达.搜索', {
      value: checkValue
    })

    let _history = [...history]
    if (!history.includes(checkValue)) {
      _history.unshift(checkValue)
    } else {
      _history = [checkValue, ..._history.filter(item => item !== checkValue)]
    }
    if (_history.length > 10) {
      _history.pop()
    }

    this.setState({
      value: '',
      history: _history
    })
    this.setStorage(undefined, undefined, namespace)

    callback()
  }
}
