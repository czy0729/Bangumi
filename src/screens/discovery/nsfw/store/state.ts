/*
 * @Author: czy0729
 * @Date: 2024-07-20 10:28:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 找NSFW可观察状态与持久化
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
