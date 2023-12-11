/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:23:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-11 17:45:50
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { STATE } from './ds'
import { Params } from './types'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)
}
