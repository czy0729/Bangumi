/*
 * @Author: czy0729
 * @Date: 2024-08-21 17:09:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-21 17:10:42
 *
 * 新番档期状态声明
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

export default class State extends Store<typeof STATE> {
  state = observable(STATE)

  /** 本地化目录编纂者选择 */
  save = () => {
    return this.saveStorage(NAMESPACE, EXCLUDE_STATE)
  }
}
