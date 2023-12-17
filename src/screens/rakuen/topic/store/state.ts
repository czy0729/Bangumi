/*
 * @Author: czy0729
 * @Date: 2023-03-31 01:53:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 10:56:45
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { Params } from '../types'
import { STATE } from './ds'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)
}
