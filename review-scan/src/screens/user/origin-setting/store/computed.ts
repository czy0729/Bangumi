/*
 * @Author: czy0729
 * @Date: 2024-09-13 03:27:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-13 03:27:49
 */
import { computed } from 'mobx'
import { userStore } from '@stores'
import { getOriginConfig } from '../utils'
import State from './state'

export default class Computed extends State {
  @computed get data() {
    return getOriginConfig(this.state.data)
  }

  @computed get isLogin() {
    return !!userStore.userInfo.id
  }
}
