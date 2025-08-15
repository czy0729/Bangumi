/*
 * @Author: czy0729
 * @Date: 2024-08-24 07:06:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-05 15:17:45
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { Params } from '../types'
import { STATE } from './ds'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)
}
