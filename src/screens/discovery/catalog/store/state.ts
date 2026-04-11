/*
 * @Author: czy0729
 * @Date: 2024-07-29 13:35:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-11 06:45:32
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
