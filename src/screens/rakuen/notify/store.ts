/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-18 06:52:39
 */
import { computed, observable } from 'mobx'
import { rakuenStore, userStore } from '@stores'
import { updateVisibleBottom } from '@utils'
import { queue, t } from '@utils/fetch'
import store from '@utils/store'
import { InferArray, Override } from '@types'
import { STATE, TYPE_PAGE } from './ds'
import { Params, PMKeys } from './types'

export default class ScreenNotify extends store<typeof STATE> {
  params: Params

  state = observable(STATE)

  init = () => {
    const { type } = this.params
    this.setState({
      page: TYPE_PAGE[type] || 0,
      _loaded: true
    })

    return queue([
      () => this.fetchNotify(),
      () => this.fetchPM(true, 'pmIn'),
      () => this.fetchPM(true, 'pmOut')
    ])
  }

  /**  电波提醒 */
  fetchNotify = () => {
    return rakuenStore.fetchNotify(true)
  }

  /** 短信 */
  fetchPM = (refresh: boolean = false, key?: PMKeys) => {
    return userStore.fetchPM(refresh, key)
  }

  // -------------------- get --------------------
  /** 电波提醒 */
  @computed get notify() {
    return rakuenStore.notify
  }

  /** 电波提醒 (合并连续的相同项) */
  @computed get mergeNotify() {
    try {
      const { list } = this.notify
      const mergeList: Override<
        InferArray<typeof list>,
        {
          repeat: number
        }
      >[] = []

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

  // -------------------- page --------------------
  /** 标签页切换 */
  onTabsChange = (page: number) => {
    this.setState({
      page
    })
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)

  // -------------------- action --------------------
  /** 清除电波提醒所有未读 */
  doClearNotify = () => {
    t('电波提醒.清除')

    rakuenStore.doClearNotify()
  }
}
