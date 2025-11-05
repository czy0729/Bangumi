/*
 * @Author: czy0729
 * @Date: 2025-01-14 06:30:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-14 07:01:59
 */
import { computed } from 'mobx'
import { tinygrailStore } from '@stores'
import { TABS } from '../ds'
import { TabsKey } from '../types'
import State from './state'

export default class Computed extends State {
  list(key: TabsKey = TABS[0]['key']) {
    return computed(() => tinygrailStore.list(key)).get()
  }
}
