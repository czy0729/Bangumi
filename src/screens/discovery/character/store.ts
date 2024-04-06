/*
 * @Author: czy0729
 * @Date: 2019-09-09 17:38:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-06 16:11:35
 */
import { computed, observable } from 'mobx'
import { usersStore, userStore } from '@stores'
import { t } from '@utils/fetch'
import store from '@utils/store'
import { HOST } from '@constants'
import { STATE, TABS, TABS_SELF } from './ds'
import { Params } from './types'

export default class ScreenCharacter extends store<typeof STATE> {
  params: Params

  state = observable(STATE)

  init = async () => {
    const { page } = this.state
    const { key } = this.tabs[page]
    if (!this.list(key)._loaded) return this.fetchList(key, true)

    return true
  }

  // -------------------- fetch --------------------
  fetchList = (key: string, refresh: boolean = false) => {
    if (key === 'recents') return usersStore.fetchRecents(refresh)

    if (key === 'persons') {
      return usersStore.fetchPersons(
        {
          userId: this.userId
        },
        refresh
      )
    }

    return usersStore.fetchCharacters(
      {
        userId: this.userId
      },
      refresh
    )
  }

  // -------------------- get --------------------
  @computed get userId() {
    const { userName: userId = userStore.myId } = this.params
    return userId
  }

  @computed get tabs() {
    return this.userId === userStore.myId ? TABS_SELF : TABS
  }

  list(key: string) {
    return computed(() => {
      if (key === 'persons') return usersStore.persons(this.userId)
      if (key === 'recents') return usersStore.recents
      return usersStore.characters(this.userId)
    }).get()
  }

  @computed get url() {
    return `${HOST}/user/${this.params?.userName}/mono`
  }

  // -------------------- page --------------------
  onChange = (page: number) => {
    if (page === this.state.page) return

    t('收藏的人物.标签页切换')

    this.setState({
      page
    })

    const { key } = this.tabs[page]
    if (!this.list(key)._loaded) this.fetchList(key, true)
  }
}
