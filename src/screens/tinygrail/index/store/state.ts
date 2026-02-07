/*
 * @Author: czy0729
 * @Date: 2024-12-29 11:10:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-07 07:57:09
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
