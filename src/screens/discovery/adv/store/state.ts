/*
 * @Author: czy0729
 * @Date: 2024-07-14 15:09:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-06 00:33:04
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
