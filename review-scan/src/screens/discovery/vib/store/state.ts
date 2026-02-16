/*
 * @Author: czy0729
 * @Date: 2024-12-02 10:05:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-02 10:09:23
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { STATE } from './ds'

export default class State extends Store<typeof STATE> {
  state = observable(STATE)
}
