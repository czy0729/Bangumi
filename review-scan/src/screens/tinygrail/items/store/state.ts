/*
 * @Author: czy0729
 * @Date: 2024-12-26 01:04:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-26 02:42:00
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
