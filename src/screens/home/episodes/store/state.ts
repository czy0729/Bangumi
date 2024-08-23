/*
 * @Author: czy0729
 * @Date: 2024-08-24 07:06:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-24 07:07:40
 */
import Store from '@utils/store'
import { Params } from '../types'

export default class State extends Store<null> {
  params: Params
}
