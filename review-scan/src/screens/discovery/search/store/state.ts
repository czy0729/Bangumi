/*
 * @Author: czy0729
 * @Date: 2024-06-03 11:39:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-03 11:46:45
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { Params } from '../types'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)

  /** 本地化数据 */
  save = () => {
    return this.saveStorage(NAMESPACE, EXCLUDE_STATE)
  }
}
