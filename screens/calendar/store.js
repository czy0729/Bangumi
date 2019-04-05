/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-30 20:46:59
 */
import { observable, computed } from 'mobx'
import commonStore from '@stores/common'
import { subjectStore } from '@stores'

export default class Store extends commonStore {
  state = observable({
    // loading: true
  })

  // -------------------- get --------------------
  @computed get calendar() {
    return subjectStore.calendar
  }

  // -------------------- page --------------------
  mounted = async () => {
    await subjectStore.fetchCalendar()
    this.setState({
      loading: false
    })
  }

  // -------------------- action --------------------
}
