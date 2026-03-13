/*
 * @Author: czy0729
 * @Date: 2024-10-08 16:51:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-08 16:51:55
 */
import { computed } from 'mobx'
import { rakuenStore, userStore } from '@stores'
import { MergeNotifyItem } from '../types'
import State from './state'

export default class Computed extends State {
  /** 电波提醒 */
  @computed get notify() {
    return rakuenStore.notify
  }

  /** 电波提醒 (合并连续的相同项) */
  @computed get mergeNotify() {
    try {
      const mergeList: MergeNotifyItem[] = []
      const { list } = this.notify
      list.forEach((item, index) => {
        const prevItem = list[index - 1]
        if (
          prevItem &&
          prevItem.userId === item.userId &&
          prevItem.title === item.title &&
          prevItem.message === item.message &&
          prevItem.message2 === item.message2
        ) {
          mergeList[mergeList.length - 1].repeat += 1
        } else {
          mergeList.push({
            ...item,
            repeat: 0
          })
        }
      })

      return {
        ...this.notify,
        list: mergeList
      }
    } catch (error) {
      return this.notify
    }
  }

  /** 短信收信 */
  @computed get pmIn() {
    return userStore.pmIn
  }

  /** 短信发信 */
  @computed get pmOut() {
    return userStore.pmOut
  }
}
