/*
 * @Author: czy0729
 * @Date: 2024-09-14 07:41:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-28 20:22:45
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { STATE } from './ds'

import type { Params } from '../types'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)
}
