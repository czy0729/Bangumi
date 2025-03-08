/*
 * @Author: czy0729
 * @Date: 2025-03-05 04:44:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-05 04:44:53
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { NAMESPACE, STATE } from './ds'

export default class State extends Store<typeof STATE> {
  state = observable(STATE)

  save = () => {
    return this.saveStorage(NAMESPACE)
  }
}
