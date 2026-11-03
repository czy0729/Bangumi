/*
 * @Author: czy0729
 * @Date: 2024-09-11 20:24:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-03 06:39:21
 *
 * 页面状态与路由参数
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { STATE } from './ds'

import type { ScrollView } from 'react-native'
import type { Params } from '../types'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)

  /** 消息滚动区实例 (由 Scroll 组件挂载时注册) */
  scrollViewRef: ScrollView = null
}
