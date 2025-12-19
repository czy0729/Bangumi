/*
 * @Author: czy0729
 * @Date: 2024-08-27 03:24:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-19 16:56:50
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { STATE } from './ds'

import type { Params } from '../types'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)
}
