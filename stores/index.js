/*
 * 管理全局Stores和放置系统级别状态
 * @Author: czy0729
 * @Date: 2019-03-02 06:14:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-11 04:18:45
 */
import { AsyncStorage, Alert } from 'react-native'
import CacheManager from '@components/@/react-native-expo-image-cache/src/CacheManager'
import { info } from '@utils/ui'
import calendarStore from './calendar'
import collectionStore from './collection'
import discoveryStore from './discovery'
import rakuenStore from './rakuen'
import searchStore from './search'
import subjectStore from './subject'
import systemStore from './system'
import tagStore from './tag'
import timelineStore from './timeline'
import userStore from './user'
import usersStore from './users'

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
      discoveryStore.init(),
      rakuenStore.init(),
      searchStore.init(),
      timelineStore.init(),
      tagStore.init(),
      usersStore.init()
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

  /**
   * 清除缓存
   */
  clearStorage() {
    Alert.alert('提示', '确定清除缓存? 包括图片缓存和页面接口的数据缓存', [
      {
        text: '取消',
        style: 'cancel'
      },
      {
        text: '确定',
        onPress: async () => {
          await AsyncStorage.clear()
          await CacheManager.clearCache()

          // 以下为不需要清除的数据, 再次本地化
          systemStore.setStorage('setting', undefined, 'System')
          rakuenStore.setStorage('setting', undefined, 'Rakuen')
          userStore.setStorage('accessToken', undefined, 'User')
          userStore.setStorage('userInfo', undefined, 'User')
          userStore.setStorage('userCookie', undefined, 'User')

          info('已清除')
        }
      }
    ])
  }

  /**
   * 登出
   */
  logout(navigation) {
    Alert.alert('提示', '确定退出登陆?', [
      {
        text: '取消',
        style: 'cancel'
      },
      {
        text: '确定',
        onPress: async () => {
          await userStore.logout()
          navigation.popToTop()
        }
      }
    ])
  }
}

const GloablStores = new Stores()

export {
  calendarStore,
  collectionStore,
  discoveryStore,
  rakuenStore,
  searchStore,
  subjectStore,
  systemStore,
  tagStore,
  timelineStore,
  userStore,
  usersStore
}
export default GloablStores
