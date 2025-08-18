/*
 * @Author: czy0729
 * @Date: 2025-07-08 15:41:06
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-07-08 15:41:06
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
