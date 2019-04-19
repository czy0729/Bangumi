/*
 * @Author: czy0729
 * @Date: 2019-03-02 06:14:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-18 14:26:57
 */
import collectionStore from './collection'
import subjectStore from './subject'
import timelineStore from './timeline'
import userStore from './user'

class Stores {
  /**
   * 保证所有子Store初始化和加载缓存
   */
  async init() {
    const res = Promise.all([
      collectionStore.init(),
      subjectStore.init(),
      timelineStore.init(),
      userStore.init()
    ])
    await res
    // console.info(
    //   JSON.stringify({
    //     collectionStore: collectionStore.state,
    //     subjectStore: subjectStore.state,
    //     timelineStore: timelineStore.state,
    //     userStore: userStore.state
    //   })
    // )

    return res
  }

  // -------------------- page --------------------
  add(key, store) {
    if (!this[key]) {
      this[key] = store
    }
  }
  get(key) {
    return this[key]
  }
}

const Store = new Stores()
Store.init()

export default Store
export { collectionStore, subjectStore, timelineStore, userStore }
