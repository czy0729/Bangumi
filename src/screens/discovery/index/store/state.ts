/*
 * @Author: czy0729
 * @Date: 2024-07-17 03:20:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 05:19:21
 *
 * 发现页状态声明: observable(STATE) 与本地持久化 save()
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
