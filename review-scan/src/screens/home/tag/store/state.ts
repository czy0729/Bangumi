/*
 * @Author: czy0729
 * @Date: 2024-06-03 07:38:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-03 07:40:09
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
