/*
 * 管理全局Stores和放置系统级别状态
 * @Author: czy0729
 * @Date: 2019-03-02 06:14:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-07 08:08:12
 */
import AsyncStorage from '@components/@/react-native-async-storage'
import { runAfter } from '@utils'
import { confirm } from '@utils/ui'
import { DEV } from '@constants'
import i18n from '@constants/i18n'
import calendarStore from './calendar'
import collectionStore from './collection'
import discoveryStore from './discovery'
import monoStore from './mono'
import rakuenStore from './rakuen'
import searchStore from './search'
import subjectStore from './subject'
import systemStore from './system'
import tagStore from './tag'
import themeStore from './theme'
import timelineStore from './timeline'
import tinygrailStore from './tinygrail'
import userStore from './user'
import usersStore from './users'
import smbStore from './smb'

// @todo 查明init被调用2次的原因
let inited = false

class Stores {
  /**
   * 保证所有子Store初始化和加载缓存
   */
  async init() {
    try {
      if (!DEV && inited) return false

      if (DEV) await userStore.init()
      inited = true

      // [同步加载]APP最重要Stores
      await systemStore.init()
      await themeStore.init()
      await userStore.init()
      const res = Promise.all([
        collectionStore.init(),
        subjectStore.init(),
        tinygrailStore.init()
      ])
      await res

      // [异步加载]非重要Stores
      runAfter(() => {
        smbStore.init()
        calendarStore.init()
        discoveryStore.init()
        monoStore.init()
        rakuenStore.init()
        searchStore.init()
        timelineStore.init()
        tagStore.init()
        usersStore.init()
      })

      return res
    } catch (error) {
      warn('stores', 'init', error)
      return false
    }
  }

  // -------------------- page --------------------
  /**
   * 添加页面Store
   * @param {*} key
   * @param {*} store
   */
  add(key, store) {
    if (!this[key] || DEV) {
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

  /**
   * 清除缓存
   */
  async clearStorage() {
    await AsyncStorage.clear()

    // 以下为不需要清除的数据, 再次本地化
    systemStore.setStorage('setting', undefined, 'System') // 设置
    rakuenStore.setStorage('setting', undefined, 'Rakuen') // 超展开设置
    rakuenStore.setStorage('favor', undefined, 'Rakuen') // 超展开收藏帖子
    userStore.setStorage('accessToken', undefined, 'User') // 用户授权信息
    userStore.setStorage('userInfo', undefined, 'User') // 用户个人信息
    userStore.setStorage('userCookie', undefined, 'User') // 用户网页cookie
    tinygrailStore.setStorage('collected', undefined, 'Tinygrail') // 小圣杯人物收藏

    return true
  }

  /**
   * 登出
   */
  logout(navigation) {
    confirm(
      `确定${i18n.logout()}?`,
      async () => {
        await userStore.logout()
        navigation.popToTop()
      },
      '提示'
    )
  }
}

const GloablStores = new Stores()
const _ = themeStore

export {
  _,
  calendarStore,
  collectionStore,
  discoveryStore,
  monoStore,
  rakuenStore,
  searchStore,
  smbStore,
  subjectStore,
  systemStore,
  tagStore,
  themeStore,
  timelineStore,
  tinygrailStore,
  userStore,
  usersStore
}

export default GloablStores
