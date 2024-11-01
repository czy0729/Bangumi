/*
 * @Author: czy0729
 * @Date: 2024-06-04 15:28:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-01 10:26:27
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
