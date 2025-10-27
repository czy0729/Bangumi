/*
 * @Author: czy0729
 * @Date: 2024-09-16 20:07:26
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-09-16 20:07:26
 */
import Store from '@utils/store'
import { Params } from '../types'

export default class State extends Store<null> {
  params: Params
}
