/*
 * @Author: czy0729
 * @Date: 2024-09-26 16:05:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-27 04:18:03
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { Params } from '../types'
import { STATE } from './ds'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)
}
