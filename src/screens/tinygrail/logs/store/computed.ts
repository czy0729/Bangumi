/*
 * @Author: czy0729
 * @Date: 2025-04-20 16:21:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-20 16:25:05
 */
import { computed } from 'mobx'
import { tinygrailStore } from '@stores'
import { MonoId } from '@types'
import State from './state'

export default class Computed extends State {
  @computed get balance() {
    return tinygrailStore.balance
  }

  icons(monoId: MonoId) {
    return computed(() => tinygrailStore.iconsCache(monoId)).get()
  }
}
