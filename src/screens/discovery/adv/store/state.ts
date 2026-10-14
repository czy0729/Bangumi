/*
 * @Author: czy0729
 * @Date: 2024-07-14 15:09:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 找 Gal 可观察状态与持久化
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

export default class State extends Store<typeof STATE> {
  state = observable(STATE)

  save = () => {
    return this.saveStorage(NAMESPACE, EXCLUDE_STATE)
  }
}
