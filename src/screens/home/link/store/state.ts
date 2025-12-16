/*
 * @Author: czy0729
 * @Date: 2025-12-10 22:43:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-16 21:57:43
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { STATE } from './ds'

import type { Params } from '../types'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)
}
