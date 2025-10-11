/*
 * @Author: czy0729
 * @Date: 2024-09-08 13:33:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-08 13:41:48
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
