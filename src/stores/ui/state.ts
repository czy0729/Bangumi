/*
 * @Author: czy0729
 * @Date: 2023-04-25 14:40:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-25 14:40:36
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { STATE } from './init'

export default class State extends Store {
  state = observable(STATE)
}
