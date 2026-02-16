/*
 * @Author: czy0729
 * @Date: 2024-11-08 04:53:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-08 05:53:30
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { Params, STATE } from './ds'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)
}
