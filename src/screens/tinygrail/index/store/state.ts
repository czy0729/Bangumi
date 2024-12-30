/*
 * @Author: czy0729
 * @Date: 2024-12-29 11:10:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-29 11:11:41
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
