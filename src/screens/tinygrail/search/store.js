/* eslint-disable no-await-in-loop, no-restricted-syntax */
/*
 * @Author: czy0729
 * @Date: 2019-09-03 21:52:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-05 16:29:25
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import store from '@utils/store'
import { info } from '@utils/ui'
import { t } from '@utils/fetch'

const namespace = 'ScreenTinygrailSearch'
const excludeState = {
  value: '',
  list: [],
  searching: false
}

export default class ScreenTinygrailSearch extends store {
  state = observable({
    history: [],
    ...excludeState,
    _loaded: false
  })

  init = async () => {
    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      ...excludeState,
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
    const state = {
      value: text
    }
    if (text === '') {
      state.list = []
    }
    this.setState(state)
  }

  addHistory = value => {
    const id = String(value)
    const { history } = this.state
    let _history = [...history]
    if (!history.includes(id)) {
      _history.unshift(id)
    } else {
      _history = [id, ..._history.filter(item => item !== id)]
    }
    if (_history.length > 10) {
      _history.pop()
    }

    this.setState({
      history: _history
    })
    this.setStorage(undefined, undefined, namespace)
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
    const { value } = this.state
    const checkValue = (lastValue || value).trim()
    if (checkValue === '') {
      info('请输入关键字')
      return false
    }

    this.setState({
      searching: true
    })

    if (/^\d+$/.test(checkValue)) {
      await this.doSearchNumber(navigation, checkValue)
    } else {
      await this.doSearchQuery(navigation, checkValue)
    }

    this.setState({
      searching: false
    })
    return true
  }

  doSearchQuery = async (navigation, keyword) => {
    const { data } = await tinygrailStore.doSearch({
      keyword
    })

    if (data.State !== 0) {
      info('查询失败, 请重试')
      return false
    }

    const ids = data.Value.filter(item => !item.ICO).map(item => item.Id)
    for (const id of ids) {
      await tinygrailStore.fetchCharacters([id])
    }

    const list = data.Value.map(item => ({
      ...tinygrailStore.characters(item.Id),
      id: item.Id,
      ico: item.ICO,
      level: item.Level,
      name: item.Name
    }))
    this.setState({
      list
    })
    return true
  }

  doSearchNumber = async (navigation, checkValue) => {
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

    this.addHistory(checkValue)
    callback()
  }
}
