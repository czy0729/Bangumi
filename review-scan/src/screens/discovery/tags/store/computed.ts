/*
 * @Author: czy0729
 * @Date: 2024-08-18 05:52:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-18 05:55:11
 */
import { computed } from 'mobx'
import { discoveryStore, userStore } from '@stores'
import { x18s } from '@utils'
import { HTML_TAGS, LIST_EMPTY } from '@constants'
import { SubjectType } from '@types'
import { TABS } from '../ds'
import State from './state'

export default class Computed extends State {
  @computed get type() {
    return TABS[this.state.page].key
  }

  @computed get url() {
    return HTML_TAGS(this.type, this.state.page, this.state.filter)
  }

  @computed get thirdPartyKey() {
    const query = [this.type, this.state.filter].join('_')
    return `tags_${query}`
  }

  /** 云快照 */
  @computed get ota() {
    return this.state.ota[this.thirdPartyKey]
  }

  /** 标签 */
  list(type: SubjectType) {
    return computed(() => {
      const tags = discoveryStore.tags(type, this.state.filter)
      if (!tags._loaded) {
        return this.ota
          ? {
              ...this.ota,
              pagination: {
                page: 1,
                pageTotal: 10
              }
            }
          : LIST_EMPTY
      }

      if (userStore.isLimit) {
        return {
          ...tags,
          list: tags.list.filter(item => !x18s(item.name))
        }
      }

      return tags
    }).get()
  }

  @computed get hm() {
    return [this.url, 'Tags']
  }
}
