/*
 * @Author: czy0729
 * @Date: 2024-07-20 10:28:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-20 11:27:52
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { NAMESPACE, STATE } from './ds'

export default class State extends Store<typeof STATE> {
  state = observable(STATE)

  save = () => {
    return this.setStorage(NAMESPACE)
  }
}
