/*
 * @Author: czy0729
 * @Date: 2024-08-21 17:09:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-21 17:10:42
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { STATE } from './ds'

export default class State extends Store<typeof STATE> {
  state = observable(STATE)
}
