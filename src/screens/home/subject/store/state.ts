/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:23:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-19 23:41:55
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { DEV, TEXT_BADGES } from '@constants'
import { Params } from '../types'
import { STATE } from './ds'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)

  log = (...arg: any) => {
    if (!DEV) return

    console.info(TEXT_BADGES.primary, ...arg)
  }
}
