/*
 * @Author: czy0729
 * @Date: 2024-08-23 05:31:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 10:40:51
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { Params } from '../types'
import { STATE } from './ds'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)
}
