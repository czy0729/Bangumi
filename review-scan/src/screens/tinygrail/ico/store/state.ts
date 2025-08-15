/*
 * @Author: czy0729
 * @Date: 2025-01-14 06:30:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-14 06:30:32
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
