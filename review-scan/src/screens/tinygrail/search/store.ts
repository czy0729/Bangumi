/*
 * @Author: czy0729
 * @Date: 2019-09-03 21:52:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 04:58:20
 */
import { computed, observable } from 'mobx'
import { tinygrailStore } from '@stores'
import { info } from '@utils'
import { t } from '@utils/fetch'
import store from '@utils/store'
import { MonoId, Navigation } from '@types'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

export default class ScreenTinygrailSearch extends store<typeof STATE> {
  state = observable(STATE)

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
  /** 全局人物数据 */
  chara(monoId: MonoId) {
    return computed(() => tinygrailStore.characters(monoId)).get()
  }

  // -------------------- page --------------------
  onChange = ({ nativeEvent }) => {
    const { text } = nativeEvent
    const state: {
      value: string
      list?: []
    } = {
      value: text
    }
    if (text === '') state.list = []
    this.setState(state)
  }

  /** 新增历史 */
  addHistory = (value: any) => {
    const id = String(value)
    const { history } = this.state
    let _history = [...history]
    if (!history.includes(id)) {
      _history.unshift(id)
    } else {
      _history = [id, ..._history.filter(item => item !== id)]
    }
    if (_history.length > 10) _history.pop()

    this.setState({
      history: _history
    })
    this.saveStorage(NAMESPACE)
  }

  /** 删除历史 */
  deleteHistory = (value: any) => {
    t('人物直达.删除历史', {
      value
    })

    const { history } = this.state
    this.setState({
      history: history.filter(item => item !== value)
    })
    this.saveStorage(NAMESPACE)
  }

  // -------------------- action --------------------
  doSearch = async (navigation: Navigation, lastValue?: any) => {
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
      await this.doSearchQuery(checkValue)
    }

    this.setState({
      searching: false
    })
    return true
  }

  doSearchQuery = async (keyword: string) => {
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

  doSearchNumber = async (navigation: Navigation, checkValue: MonoId) => {
    let callback: () => any
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
