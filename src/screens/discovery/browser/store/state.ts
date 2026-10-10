/*
 * @Author: czy0729
 * @Date: 2024-05-25 03:55:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 10:20:00
 *
 * 索引可观察状态与持久化
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

export default class State extends Store<typeof STATE> {
  state = observable(STATE)

  save = () => {
    return this.saveStorage(NAMESPACE, EXCLUDE_STATE)
  }
}
