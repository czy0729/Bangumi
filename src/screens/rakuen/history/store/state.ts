/*
 * @Author: czy0729
 * @Date: 2024-06-04 15:28:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-04 15:28:52
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { STATE } from './ds'

export default class State extends Store<typeof STATE> {
  state = observable(STATE)
}
