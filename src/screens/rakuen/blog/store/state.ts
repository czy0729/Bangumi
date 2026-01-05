/*
 * @Author: czy0729
 * @Date: 2024-06-21 05:03:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-04 20:20:42
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { STATE } from './ds'

import type { Params } from '../types'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)
}
