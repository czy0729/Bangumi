/*
 * @Author: czy0729
 * @Date: 2024-11-11 09:45:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-14 09:49:38
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { STATE } from './ds'

import type { Params } from '../types'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)
}
