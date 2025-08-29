/*
 * @Author: czy0729
 * @Date: 2024-12-16 19:58:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-16 20:21:03
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
