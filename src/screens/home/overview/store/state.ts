/*
 * @Author: czy0729
 * @Date: 2024-09-18 14:32:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-02 23:43:02
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { STATE } from './ds'

import type { Params } from '../types'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)
}
