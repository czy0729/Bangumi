/*
 * @Author: czy0729
 * @Date: 2024-10-10 11:54:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-11 05:06:50
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { Params } from '../types'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)

  save = () => {
    return this.saveStorage(NAMESPACE, EXCLUDE_STATE)
  }
}
