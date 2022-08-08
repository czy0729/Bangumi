/*
 * @Author: czy0729
 * @Date: 2022-08-06 12:07:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-06 12:08:13
 */
import { observable } from 'mobx'
import store from '@utils/store'

export default class ScreenHM extends store {
  state = observable({})

  init = async () => {}
}
