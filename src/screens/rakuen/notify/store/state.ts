/*
 * @Author: czy0729
 * @Date: 2024-10-08 16:45:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-08 16:45:59
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { STATE } from './ds'

import type { Params } from '../types'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)
}
