/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:23:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-21 18:41:19
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { Params } from '../types'
import { STATE } from './ds'

export default class State extends Store {
  params: Params

  state = observable(STATE)
}
