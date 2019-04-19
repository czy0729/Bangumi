/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-15 15:40:20
 */
import { observable, computed } from 'mobx'
import { subjectStore } from '@stores'
import { setStorage, getStorage } from '@utils'
import store from '@utils/store'

const screen = '@screen|calendar|state'

export default class Store extends store {
  state = observable({
    loading: true
  })

  // -------------------- get --------------------
  @computed get calendar() {
    return subjectStore.calendar
  }

  // -------------------- page --------------------
  initFetch = async () => {
    const state = await getStorage(screen)
    if (state) {
      this.setState(state)
    }

    await subjectStore.fetchCalendar()
    this.setState({
      loading: false
    })
    this.setStorage()
  }

  setStorage = () => {
    const { loading } = this.state
    const state = {
      loading
    }
    setStorage(screen, state)
  }

  // -------------------- action --------------------
}
