/*
 * @Author: czy0729
 * @Date: 2019-09-09 17:38:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-09 12:32:04
 */
import { observable, computed } from 'mobx'
import { userStore, usersStore } from '@stores'
import { open } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { HOST } from '@constants'

const namespace = 'ScreenCharacter'

export default class ScreenCharacter extends store {
  state = observable({
    page: 0,
    _loaded: true
  })

  setParams = navigation => {
    navigation.setParams({
      heatmap: '收藏的人物.右上角菜单',
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          t('收藏的人物.右上角菜单', {
            key
          })

          switch (key) {
            case '浏览器查看':
              open(`${HOST}/user/${this?.params?.userName}/mono`)
              break

            default:
              break
          }
        }
      }
    })
  }

  init = async () => {
    const { page } = this.state
    const { key } = this.tabs[page]
    const { _loaded } = this.list(key)
    if (!_loaded) {
      return this.fetchList(key, true)
    }
    return true
  }

  // -------------------- fetch --------------------
  fetchList = (key, refresh) => {
    switch (key) {
      case 'recents':
        return usersStore.fetchRecents(refresh)
      case 'persons':
        return usersStore.fetchPersons(
          {
            userId: this.userId
          },
          refresh
        )
      default:
        return usersStore.fetchCharacters(
          {
            userId: this.userId
          },
          refresh
        )
    }
  }

  // -------------------- get --------------------
  @computed get userId() {
    const { userName: userId = userStore.myId } = this.params
    return userId
  }

  @computed get tabs() {
    if (this.userId === userStore.myId) {
      return [
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
    }

    return [
      {
        title: '虚拟角色',
        key: 'characters'
      },
      {
        title: '现实人物',
        key: 'persons'
      }
    ]
  }

  list(key) {
    switch (key) {
      case 'persons':
        return computed(() => usersStore.persons(this.userId)).get()
      case 'recents':
        return computed(() => usersStore.recents).get()
      default:
        return computed(() => usersStore.characters(this.userId)).get()
    }
  }

  // -------------------- page --------------------
  onChange = page => {
    if (page === this.state.page) {
      return
    }

    t('收藏的人物.标签页切换')
    this.setState({
      page
    })
    this.setStorage(undefined, undefined, namespace)
    this.tabChangeCallback(page)
  }

  tabChangeCallback = page => {
    const { key } = this.tabs[page]
    const { _loaded } = this.list(key)
    if (!_loaded) {
      this.fetchList(key, true)
    }
  }
}
