/*
 * @Author: czy0729
 * @Date: 2024-09-18 14:32:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-18 14:33:32
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { Params } from '../types'
import { STATE } from './ds'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)
}
