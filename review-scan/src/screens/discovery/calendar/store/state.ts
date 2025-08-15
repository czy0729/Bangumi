/*
 * @Author: czy0729
 * @Date: 2024-06-20 17:24:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-20 17:27:53
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

export default class State extends Store<typeof STATE> {
  state = observable(STATE)

  /** 本地化 */
  save = () => {
    return this.saveStorage(NAMESPACE, EXCLUDE_STATE)
  }
}
