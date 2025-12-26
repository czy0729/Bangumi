/*
 * @Author: czy0729
 * @Date: 2024-06-03 11:39:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 01:22:46
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

import type { Params } from '../types'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)

  /** 本地化数据 */
  save = () => {
    return this.saveStorage(NAMESPACE, EXCLUDE_STATE)
  }
}
