/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:23:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-05 20:40:56
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { STATE } from './ds'

export default class State extends Store {
  state = observable(STATE)
}
