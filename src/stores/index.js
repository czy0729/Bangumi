/*
 * 管理全局Stores和放置系统级别状态
 * @Author: czy0729
 * @Date: 2019-03-02 06:14:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-10 23:59:46
 */
import { AsyncStorage, Alert } from 'react-native'
import { CacheManager } from 'react-native-expo-image-cache'
import { info } from '@utils/ui'
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

// @todo 查明init被调用2次的原因
let inited = false

class Stores {
  /**
   * 保证所有子Store初始化和加载缓存
   */
  async init() {
    try {
      if (inited) {
        return false
      }
      inited = true

      // [同步加载]APP最重要Stores
      await themeStore.init()
      await userStore.init()
      const res = Promise.all([
        collectionStore.init(),
        subjectStore.init(),
        systemStore.init(),
        tinygrailStore.init()
      ])
      await res

      // [异步加载]非重要Stores
      Promise.all([
        calendarStore.init(),
        discoveryStore.init(),
        monoStore.init(),
        rakuenStore.init(),
        searchStore.init(),
        timelineStore.init(),
        tagStore.init(),
        usersStore.init()
      ])

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
    Alert.alert(
      '提示',
      '清除包括页面接口的数据缓存，但不会清除登陆等信息 (若需清除图片缓存，请到系统里面清除应用数据)',
      [
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
            systemStore.setStorage('setting', undefined, 'System') // 设置
            rakuenStore.setStorage('setting', undefined, 'Rakuen') // 超展开设置
            rakuenStore.setStorage('favor', undefined, 'Rakuen') // 超展开收藏帖子
            userStore.setStorage('accessToken', undefined, 'User') // 用户授权信息
            userStore.setStorage('userInfo', undefined, 'User') // 用户个人信息
            userStore.setStorage('userCookie', undefined, 'User') // 用户网页cookie
            tinygrailStore.setStorage('advanceList', undefined, 'Tinygrail') // 2小时限制
            tinygrailStore.setStorage('advanceBidList', undefined, 'Tinygrail')
            tinygrailStore.setStorage(
              'advanceAuctionList',
              undefined,
              'Tinygrail'
            )
            tinygrailStore.setStorage('collected', undefined, 'Tinygrail') // 小圣杯人物收藏

            info('已清除')
          }
        }
      ]
    )
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
const _ = themeStore

export {
  _,
  calendarStore,
  collectionStore,
  discoveryStore,
  monoStore,
  rakuenStore,
  searchStore,
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
