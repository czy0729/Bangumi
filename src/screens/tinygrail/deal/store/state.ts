/*
 * @Author: czy0729
 * @Date: 2024-12-27 09:07:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-07 11:10:59
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
