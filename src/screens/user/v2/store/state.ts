/*
 * @Author: czy0729
 * @Date: 2023-04-04 06:19:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-22 22:56:05
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { STATE } from './ds'

import type { Params } from '../types'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)
}
