/*
 * @Author: czy0729
 * @Date: 2024-08-24 11:18:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-07 05:28:32
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { STATE } from './ds'

import type { Params } from '../types'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)
}
