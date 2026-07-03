/*
 * @Author: czy0729
 * @Date: 2025-03-05 04:45:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-07 17:58:04
 */
import { computed } from 'mobx'
import { computedFn } from '@utils/computed-fn'
import State from './state'

export default class Computed extends State {
  @computed get list() {
    return this.state.data.list
  }

  detail = computedFn((id: string) => {
    return this.state.detail[id] || null
  })

  likes = computedFn((id: string) => {
    return this.state.likes[`likes_${id}`] || null
  })
}
