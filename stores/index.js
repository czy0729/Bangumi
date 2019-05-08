/*
 * @Author: czy0729
 * @Date: 2019-03-02 06:14:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-08 22:35:04
 */
import calendarStore from './calendar'
import collectionStore from './collection'
import rakuenStore from './rakuen'
import subjectStore from './subject'
import timelineStore from './timeline'
import userStore from './user'

// @todo查明init被调用2次的原因
let inited = false

class Stores {
  /**
   * 保证所有子Store初始化和加载缓存
   */
  async init() {
    if (inited) {
      return false
    }
    inited = true

    const res = Promise.all([
      calendarStore.init(),
      collectionStore.init(),
      rakuenStore.init(),
      subjectStore.init(),
      timelineStore.init(),
      userStore.init()
    ])
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
export {
  calendarStore,
  collectionStore,
  rakuenStore,
  subjectStore,
  timelineStore,
  userStore
}
