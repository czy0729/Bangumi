/*
 * @Author: czy0729
 * @Date: 2024-08-18 05:35:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-17 12:51:44
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

import type { Params } from '../types'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)

  save = () => {
    return this.saveStorage(NAMESPACE, EXCLUDE_STATE)
  }
}
