/*
 * @Author: czy0729
 * @Date: 2025-06-09 14:23:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-10 06:29:32
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { Params } from '../types'
import { STATE } from './ds'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)
}
