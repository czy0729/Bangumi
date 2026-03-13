/*
 * @Author: czy0729
 * @Date: 2024-08-21 17:11:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-21 17:11:47
 */
import { computed } from 'mobx'
import { usersStore } from '@stores'
import State from './state'

export default class Computed extends State {
  /** 目录创建者 */
  @computed get userId() {
    return 'lilyurey'
  }

  /** 用户目录 */
  @computed get catalogs() {
    return usersStore.catalogs(this.userId, false)
  }
}
