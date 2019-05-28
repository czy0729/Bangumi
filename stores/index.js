/*
 * 管理全局Stores和放置系统级别状态
 * @Author: czy0729
 * @Date: 2019-03-02 06:14:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-27 03:22:47
 */
import calendarStore from './calendar'
import collectionStore from './collection'
import rakuenStore from './rakuen'
import searchStore from './search'
import subjectStore from './subject'
import systemStore from './system'
import timelineStore from './timeline'
import userStore from './user'

// @todo 查明init被调用2次的原因
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

    // [同步加载]APP最重要Stores
    const res = Promise.all([
      collectionStore.init(),
      subjectStore.init(),
      systemStore.init(),
      userStore.init()
    ])
    await res

    // [异步加载]非重要Stores
    Promise.all([
      calendarStore.init(),
      rakuenStore.init(),
      searchStore.init(),
      timelineStore.init()
    ])

    return res
  }

  // -------------------- page --------------------
  /**
   * 添加页面Store
   * @param {*} key
   * @param {*} store
   */
  add(key, store) {
    if (!this[key]) {
      this[key] = store
    }
  }

  /**
   * 获取页面Store
   * @param {*} key
   */
  get(key) {
    return this[key]
  }
}

const GloablStores = new Stores()

export {
  calendarStore,
  collectionStore,
  rakuenStore,
  searchStore,
  subjectStore,
  systemStore,
  timelineStore,
  userStore
}
export default GloablStores
