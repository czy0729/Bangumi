/*
 * @Author: czy0729
 * @Date: 2024-11-30 17:30:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 17:33:08
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

export default class State extends Store<typeof STATE> {
  state = observable(STATE)

  /** 本地化数据 */
  save = () => {
    return this.saveStorage(NAMESPACE, EXCLUDE_STATE)
  }
}
