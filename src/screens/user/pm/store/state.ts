/*
 * @Author: czy0729
 * @Date: 2024-09-11 20:24:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-06 02:12:31
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { STATE } from './ds'

import type { ScrollView } from 'react-native'
import type { Params } from '../types'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)

  scrollViewRef: ScrollView = null
}
