/*
 * @Author: czy0729
 * @Date: 2023-04-04 06:19:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-04 06:19:48
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { Params } from '../types'
import { STATE } from './ds'

export default class State extends Store {
  params: Params

  state = observable(STATE)
}
