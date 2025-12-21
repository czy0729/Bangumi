/*
 * @Author: czy0729
 * @Date: 2024-09-11 20:24:01
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-09-11 20:24:01
 */
import { ScrollView } from 'react-native'
import { observable } from 'mobx'
import Store from '@utils/store'
import { Params } from '../types'
import { STATE } from './ds'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)

  scrollViewRef: ScrollView = null
}
