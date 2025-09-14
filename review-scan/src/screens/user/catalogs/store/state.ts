/*
 * @Author: czy0729
 * @Date: 2024-09-13 05:32:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-13 05:34:39
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
