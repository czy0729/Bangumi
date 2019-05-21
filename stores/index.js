/*
 * 系统Store
 * @Author: czy0729
 * @Date: 2019-03-02 06:14:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-21 04:09:24
 */
import { observable } from 'mobx'
import systemStore from './system'
import calendarStore from './calendar'
import collectionStore from './collection'
import rakuenStore from './rakuen'
import subjectStore from './subject'
import searchStore from './search'
import timelineStore from './timeline'
import userStore from './user'

// @todo查明init被调用2次的原因
let inited = false

class Stores {
  state = observable({
    wifi: false
  })

  /**
   * 保证所有子Store初始化和加载缓存
   */
  async init() {
    if (inited) {
      return false
    }
    inited = true

    // 以下是APP最重要Stores, 同步加载
    const res = Promise.all([
      systemStore.init(),
      collectionStore.init(),
      subjectStore.init(),
      userStore.init()
    ])
    await res

    // 非重要Stores, 异步加载
    Promise.all([
      calendarStore.init(),
      rakuenStore.init(),
      timelineStore.init(),
      searchStore.init()
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

export default Store
export {
  systemStore,
  calendarStore,
  collectionStore,
  rakuenStore,
  subjectStore,
  searchStore,
  timelineStore,
  userStore
}
