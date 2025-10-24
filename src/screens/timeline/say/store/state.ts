/*
 * @Author: czy0729
 * @Date: 2024-08-23 05:31:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-24 12:31:55
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { STATE } from './ds'

import type { Params } from '../types'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)
}
