/*
 * @Author: czy0729
 * @Date: 2019-11-28 17:18:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-29 01:17:49
 */
import { observable, computed } from 'mobx'
import { rakuenStore } from '@stores'
import store from '@utils/store'
import { info } from '@utils/ui'

const namespace = 'ScreenRakuenHistory'

export default class ScreenRakuenHistory extends store {
  state = observable({
    favor: false
  })

  init = async () => {
    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state
    })

    return res
  }

  // -------------------- get --------------------
  @computed get sections() {
    const { favor } = this.state
    const data = rakuenStore.state.topic
    const sections = []
    const map = {}
    Object.keys(data)
      .filter(item => {
        if (!item.includes('group/')) {
          return false
        }
        if (favor) {
          return this.isFavor(item)
        }
        return true
      })
      .sort((a, b) => b.localeCompare(a))
      .forEach(item => {
        const target = rakuenStore.state.topic[item]
        const title = (target.time || '').split(' ')[0]
        if (!(title in map)) {
          map[title] = sections.length
          sections.push({
            title,
            data: []
          })
        }
        sections[map[title]].data.push({
          topicId: item,
          ...target
        })
      })
    return sections
  }

  /**
   * 是否收藏
   * @param {*} topicId
   */
  isFavor(topicId) {
    return computed(() => rakuenStore.favor(topicId)).get()
  }

  // -------------------- page --------------------
  /**
   * 切换是否只显示收藏
   */
  setFavor = () => {
    const { favor } = this.state
    this.setState({
      favor: !favor
    })
    info(!favor ? '只看收藏' : '看全部')
    this.setStorage(undefined, undefined, this.namespace)
  }
}
