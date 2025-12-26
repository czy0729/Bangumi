/*
 * @Author: czy0729
 * @Date: 2024-09-06 00:32:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 03:00:08
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
