/*
 * @Author: czy0729
 * @Date: 2025-07-17 13:11:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-17 23:59:00
 */
import { computed } from 'mobx'
import { userStore } from '@stores'
import { desc } from '@utils'
import { FROZEN_ARRAY } from '@constants'
import { UserId } from '@types'
import { getDay, getPercent, getTotal } from '../utils'
import State from './state'

export default class Computed extends State {
  @computed get userInfo() {
    return userStore.userInfo
  }

  @computed get userId() {
    return `tinygrail_lottery_${getDay(this.state.prev)}`
  }

  @computed get list() {
    return this.state.list[this.userId] || FROZEN_ARRAY
  }

  @computed get computedList() {
    const list = [...this.list]
    return list.sort((a, b) => {
      return this.state.sort === 'amount'
        ? desc(getTotal(this.detail(a)), getTotal(this.detail(b)))
        : desc(getPercent(this.detail(a)), getPercent(this.detail(b)))
    })
  }

  detail(id: string) {
    return computed(() => {
      return this.state.detail[id] || null
    }).get()
  }

  userStatus(userId: UserId) {
    return computed(() => {
      return this.state.userStatus[userId] || false
    }).get()
  }
}
