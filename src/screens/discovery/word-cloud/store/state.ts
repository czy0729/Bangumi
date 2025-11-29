/*
 * @Author: czy0729
 * @Date: 2024-09-26 16:05:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-29 17:57:11
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { STATE } from './ds'

import type { Params } from '../types'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)
}
