/*
 * @Author: czy0729
 * @Date: 2024-07-25 19:55:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 16:34:20
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { Params } from '../types'
import { NAMESPACE, STATE } from './ds'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)

  save = () => {
    return this.saveStorage(NAMESPACE)
  }
}
