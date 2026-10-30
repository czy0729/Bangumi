/*
 * @Author: czy0729
 * @Date: 2024-08-23 05:31:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 吐槽页状态与列表实例
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { STATE } from './ds'

import type { ListViewScrollMethods } from '@components'
import type { Params } from '../types'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)

  /** 对话列表实例 (仅暴露滚动手法) */
  scrollViewRef: ListViewScrollMethods | null = null
}
