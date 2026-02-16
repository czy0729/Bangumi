/*
 * @Author: czy0729
 * @Date: 2025-01-14 16:24:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-14 16:48:49
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { Params } from '../types'
import { STATE } from './ds'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)
}
