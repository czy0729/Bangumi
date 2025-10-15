/*
 * @Author: czy0729
 * @Date: 2023-03-31 01:53:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-15 23:20:47
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { STATE } from './ds'

import type { Params } from '../types'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)
}
