/*
 * @Author: czy0729
 * @Date: 2024-11-09 06:30:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-09 06:31:06
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { Params } from '../types'
import { STATE } from './ds'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)
}
