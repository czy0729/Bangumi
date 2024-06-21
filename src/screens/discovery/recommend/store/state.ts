/*
 * @Author: czy0729
 * @Date: 2024-06-22 05:11:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-22 05:12:48
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { STATE } from './ds'

export default class State extends Store<typeof STATE> {
  state = observable(STATE)
}
