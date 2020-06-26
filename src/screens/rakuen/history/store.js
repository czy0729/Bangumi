/*
 * @Author: czy0729
 * @Date: 2019-11-28 17:18:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-26 17:31:44
 */
import { observable, computed } from 'mobx'
import { rakuenStore } from '@stores'
import store from '@utils/store'
import { info } from '@utils/ui'
import { t } from '@utils/fetch'

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
  @computed get keys() {
    const { favor } = this.state
    const data = rakuenStore.state.topic
    return Object.keys(data)
      .filter(item => {
        // 不知道哪里有问题, 有时会出现undefined的key值, 过滤掉
        if (!item.includes('group/') || item.includes('undefined')) {
          return false
        }
        if (favor) {
          return this.isFavor(item)
        }
        return true
      })
      .sort((a, b) => b.localeCompare(a))
  }

  @computed get sections() {
    const sections = []
    const map = {}
    this.keys.forEach(item => {
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
   * 切换收藏
   */
  toggleFavor = () => {
    const { favor } = this.state
    const nextFavor = !favor
    t('本地帖子.切换收藏', {
      favor: nextFavor
    })

    this.setState({
      favor: nextFavor
    })
    info(nextFavor ? '只看收藏' : '看全部')
    this.setStorage(undefined, undefined, this.namespace)
  }
}
