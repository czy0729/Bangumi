/*
 * @Author: czy0729
 * @Date: 2024-09-11 16:45:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-11 16:46:12
 */
import Store from '@utils/store'
import { Params } from '../types'

export default class State extends Store<null> {
  params: Params
}
