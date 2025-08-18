/*
 * @Author: czy0729
 * @Date: 2024-08-19 06:26:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-19 06:27:52
 */
import { computed } from 'mobx'
import { rakuenStore } from '@stores'
import { desc } from '@utils'
import State from './state'

export default class Computed extends State {
  /** 我的小组 */
  @computed get mine() {
    return {
      ...rakuenStore.mine,
      list: rakuenStore.mine.list.slice().sort((a, b) => desc(a, b, item => item.num))
    }
  }
}
