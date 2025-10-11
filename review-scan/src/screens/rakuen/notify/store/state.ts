/*
 * @Author: czy0729
 * @Date: 2024-10-08 16:45:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-08 16:45:59
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { Params } from '../types'
import { STATE } from './ds'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)
}
