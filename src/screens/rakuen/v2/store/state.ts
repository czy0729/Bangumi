/*
 * @Author: czy0729
 * @Date: 2024-05-16 19:49:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-17 11:55:18
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
