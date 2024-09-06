/*
 * @Author: czy0729
 * @Date: 2024-09-06 00:36:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-06 01:05:48
 */
import { computed } from 'mobx'
import { subjectStore } from '@stores'
import { HTML_MONO_WORKS, LIST_EMPTY } from '@constants'
import { SubjectId } from '@types'
import State from './state'

export default class Computed extends State {
  /** 人物 Id */
  @computed get monoId() {
    return this.params.monoId
  }

  /** 人物作品 */
  @computed get monoWorks() {
    return subjectStore.monoWorks(this.monoId)
  }

  /** 过滤数据 */
  @computed get list() {
    if (!this.monoWorks._loaded) {
      if (!this.ota) return LIST_EMPTY

      return {
        ...this.ota,
        pagination: {
          page: 1,
          pageTotal: 10
        }
      }
    }

    if (this.state.collected) return this.monoWorks

    return {
      ...this.monoWorks,
      list: this.monoWorks.list.filter(item => !item.collected)
    }
  }

  /** 网页地址 */
  @computed get url() {
    return HTML_MONO_WORKS(this.monoId, this.state.position, this.state.order)
  }

  /** 条目信息 */
  subject(subjectId: SubjectId) {
    return computed(() => subjectStore.subject(subjectId)).get()
  }

  /** 云快照 */
  @computed get ota() {
    return this.state.ota[this.thirdPartyKey]
  }

  @computed get thirdPartyKey() {
    const query = [this.monoId, this.state.order, this.state.position].join('_')
    return `works_${query}`.replace('/', '_')
  }
}
