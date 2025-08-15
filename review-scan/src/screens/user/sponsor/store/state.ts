/*
 * @Author: czy0729
 * @Date: 2024-09-09 21:46:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-09 21:52:27
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { NAMESPACE, STATE } from './ds'

export default class State extends Store<typeof STATE> {
  state = observable(STATE)

  /** 本地化 */
  save = () => {
    return this.saveStorage(NAMESPACE)
  }
}
