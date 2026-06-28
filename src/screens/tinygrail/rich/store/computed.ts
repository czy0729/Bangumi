/*
 * @Author: czy0729
 * @Date: 2025-07-08 15:49:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-08 15:49:52
 */
import { computedFn } from 'mobx-utils'
import { tinygrailStore } from '@stores'
import { TABS } from '../ds'
import State from './state'

import type { UserId } from '@types'

export default class Computed extends State {
  key = computedFn((page: number) => {
    return TABS[page].key
  })

  title = computedFn((page: number) => {
    return TABS[page].title
  })

  /** 番市首富 */
  rich = computedFn((key: string) => {
    return tinygrailStore.rich(key)
  })

  /** 用户现金 */
  balance = computedFn((userId: UserId) => {
    return this.state.balance[userId] || 0
  })
}
