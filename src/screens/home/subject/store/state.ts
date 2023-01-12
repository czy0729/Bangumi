/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:23:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-16 11:18:34
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { STATE } from './ds'
import { Params } from './types'

export default class State extends Store {
  params: Params

  state = observable(STATE)
}
