/*
 * @Author: czy0729
 * @Date: 2024-09-16 14:02:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-16 14:15:09
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { StateData } from '../types'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

export default class State extends Store<typeof STATE> {
  state = observable(STATE)

  collections: StateData['list'] = []

  save = () => {
    return this.saveStorage(NAMESPACE, EXCLUDE_STATE)
  }
}
