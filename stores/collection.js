/*
 * 收藏
 * @Author: czy0729
 * @Date: 2019-02-21 20:40:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-15 15:17:42
 */
import { observable, computed } from 'mobx'
import { API_COLLECTION, API_COLLECTION_ACTION } from '@constants/api'
import store from '@utils/store'
import fetch from '@utils/fetch'

class Collection extends store {
  state = observable({
    collection: {}
  })

  async init() {
    const res = Promise.all([this.getStorage('collection')])
    const state = await res
    this.setState({
      collection: state[0]
    })

    return res
  }

  // -------------------- get --------------------
  /**
   * 条目收藏信息
   * @param {*} subjectId
   */
  getCollection(subjectId) {
    return computed(() => this.state.collection[subjectId] || {}).get()
  }

  // -------------------- fetch --------------------
  /**
   * 获取指定条目收藏信息
   * @param {*} subjectId
   */
  fetchCollection(subjectId) {
    return this.fetch(
      {
        url: API_COLLECTION(subjectId),
        info: '条目收藏信息'
      },
      ['collection', subjectId],
      {
        storage: true
      }
    )
  }

  // -------------------- action --------------------
  /**
   * 管理收藏
   */
  doUpdateCollection({ subjectId, status, tags, comment, rating, privacy }) {
    return fetch({
      url: API_COLLECTION_ACTION(subjectId),
      method: 'POST',
      data: {
        status,
        tags,
        comment,
        rating,
        privacy
      }
    })
  }
}

export default new Collection()
