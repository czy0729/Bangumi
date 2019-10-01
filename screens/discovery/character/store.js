/*
 * @Author: czy0729
 * @Date: 2019-09-09 17:38:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-10-01 22:33:19
 */
import { observable, computed } from 'mobx'
import { usersStore } from '@stores'
import store from '@utils/store'

export const tabs = [
  {
    title: '人物近况',
    key: 'recents'
  },
  {
    title: '虚拟角色',
    key: 'characters'
  },
  {
    title: '现实人物',
    key: 'persons'
  }
]
const namespace = 'ScreenCharacter'

export default class ScreenCharacter extends store {
  state = observable({
    page: 0,
    _loaded: false
  })

  init = async () => {
    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      _loaded: true
    })

    const { page } = this.state
    const { key } = tabs[page]
    const { _loaded } = this.list(key)
    if (!_loaded) {
      return this.fetchList(key, true)
    }
    return true
  }

  // -------------------- fetch --------------------
  fetchList = (key, refresh) => {
    const { userName: userId } = this.params
    switch (key) {
      case 'persons':
        return usersStore.fetchPersons({ userId }, refresh)
      case 'recents':
        return usersStore.fetchRecents(refresh)
      default:
        return usersStore.fetchCharacters({ userId }, refresh)
    }
  }

  // -------------------- get --------------------
  list(key) {
    const { userName: userId } = this.params
    switch (key) {
      case 'persons':
        return computed(() => usersStore.persons(userId)).get()
      case 'recents':
        return computed(() => usersStore.recents).get()
      default:
        return computed(() => usersStore.characters(userId)).get()
    }
  }

  // -------------------- page --------------------
  onChange = (item, page) => {
    if (page === this.state.page) {
      return
    }

    this.setState({
      page
    })
    this.setStorage(undefined, undefined, namespace)
    this.tabChangeCallback(page)
  }

  tabChangeCallback = page => {
    const { key } = tabs[page]
    const { _loaded } = this.list(key)
    if (!_loaded) {
      this.fetchList(key, true)
    }
  }
}
