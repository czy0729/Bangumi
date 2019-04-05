/*
 * @Author: czy0729
 * @Date: 2019-02-21 20:40:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-05 09:17:53
 */
import { observable, computed } from 'mobx'
import { API_COLLECTION, API_COLLECTION_ACTION } from '@constants/api'
import fetch from '@utils/fetch'
import common from './common'

class Collection extends common {
  state = observable({
    collection: {}
  })

  async init() {
    this.setState({
      collection: await this.getStorage('collection')
    })
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

const Store = new Collection()
Store.init()

export default Store
