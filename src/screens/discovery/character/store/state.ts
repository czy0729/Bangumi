/*
 * @Author: czy0729
 * @Date: 2024-12-03 15:29:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-18 18:45:56
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { STATE } from './ds'

import type { Params } from '../types'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)
}
