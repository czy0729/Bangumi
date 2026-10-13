/*
 * @Author: czy0729
 * @Date: 2024-08-20 14:22:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 频道可观察状态
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { STATE } from './ds'

import type { Params } from '../types'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)
}
