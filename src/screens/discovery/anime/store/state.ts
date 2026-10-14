/*
 * @Author: czy0729
 * @Date: 2024-07-25 06:09:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 找番剧可观察状态与持久化
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
