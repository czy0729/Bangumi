/*
 * @Author: czy0729
 * @Date: 2025-04-20 16:21:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-06 14:54:31
 */
import { computed } from 'mobx'
import { tinygrailStore } from '@stores'
import State from './state'

import type { MonoId } from '@types'

export default class Computed extends State {
  @computed get balance() {
    return tinygrailStore.balance
  }

  icons(monoId: MonoId) {
    return computed(() => tinygrailStore.iconsCache(monoId)).get()
  }
}
