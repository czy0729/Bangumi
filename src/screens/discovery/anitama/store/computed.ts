/*
 * @Author: czy0729
 * @Date: 2024-08-07 22:06:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-14 22:27:06
 */
import { computed } from 'mobx'
import { discoveryStore } from '@stores'
import { LIST_EMPTY, MODEL_NEWS, NEWS } from '@constants'
import State from './state'

import type { News } from '@stores/discovery/types'

export default class Computed extends State {
  /** 站点 */
  @computed get label() {
    return MODEL_NEWS.getLabel(this.state.type)
  }

  /** 资讯 */
  @computed get article() {
    const { page } = this.state

    switch (this.label) {
      case NEWS[0].label:
        return discoveryStore.gcTimeline(page)

      case NEWS[1].label:
        return discoveryStore.ymTimeline(page)

      case NEWS[2].label:
        return discoveryStore.gsTimeline(page)

      default:
        return LIST_EMPTY as News
    }
  }

  /** 地址 */
  @computed get url() {
    return MODEL_NEWS.getValue(this.label)
  }
}
