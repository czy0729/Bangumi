/*
 * 管理全局 Stores 和放置系统级别状态
 *
 * @Author: czy0729
 * @Date: 2019-03-02 06:14:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-29 04:25:40
 */
import AsyncStorage from '@components/@/react-native-async-storage'
import { confirm } from '@utils'
import { DEV } from '@constants'
import i18n from '@constants/i18n'
import calendarStore from './calendar'
import collectionStore from './collection'
import discoveryStore from './discovery'
import monoStore from './mono'
import otaStore from './ota'
import rakuenStore from './rakuen'
import searchStore from './search'
import smbStore from './smb'
import subjectStore from './subject'
import systemStore from './system'
import tagStore from './tag'
import themeStore from './theme'
import timelineStore from './timeline'
import tinygrailStore from './tinygrail'
import uiStore from './ui'
import userStore from './user'
import usersStore from './users'
import { NAMESPACE as NAMESPACE_RAKUEN } from './rakuen/init'
import { NAMESPACE as NAMESPACE_SYSTEM } from './system/init'
import { NAMESPACE as NAMESPACE_USER } from './user/init'
import { NAMESPACE as NAMESPACE_TINYGRAIL } from './tinygrail/init'
import { NAMESPACE as NAMESPACE_SUBJECT } from './subject/init'
import { NAMESPACE as NAMESPACE_CALENDAR } from './calendar/init'
import { NAMESPACE as NAMESPACE_SMB } from './smb/init'
import { Navigation } from '@types'

// @todo 查明init被调用2次的原因
let inited = false

class GlobalStores {
  /** 保证所有子 Store 初始化和加载缓存 */
  async init() {
    try {
      if (!DEV && inited) return false

      inited = true

      // systemStore.init 和 themeStore.init 维持旧逻辑
      await systemStore.init()
      await themeStore.init()

      // 其他 store 使用新的懒读取本地数据逻辑
      // userStore
      const userStoreKeys = [
        'accessToken',
        'formhash',
        'userInfo',
        'usersInfo',

        // userCookie 一定要在 userInfo 和 usersInfo 之后
        'userCookie',
        'collection',
        'userSetting'
      ] as const
      for (let i = 0; i < userStoreKeys.length; i += 1) {
        await userStore.init(userStoreKeys[i])
      }

      // usersStore
      const usersStoreKeys = ['users'] as const
      for (let i = 0; i < usersStoreKeys.length; i += 1) {
        await usersStore.init(usersStoreKeys[i])
      }

      return systemStore.setting
    } catch (error) {
      return false
    }
  }

  // -------------------- methods --------------------
  /** 添加页面 Store */
  add(key: string, store: any) {
    if (!this[key] || DEV) this[key] = store
  }

  /** 获取页面Store */
  get(key: string) {
    return this[key]
  }

  /** 清除缓存 */
  async clearStorage() {
    await AsyncStorage.clear()
    this.restore()
    return true
  }

  /** 以下为不需要清除的数据, 再次本地化 */
  restore = () => {
    /** 设置 */
    systemStore.setStorage('setting', undefined, NAMESPACE_SYSTEM) // 全局设置
    systemStore.setStorage('advance', undefined, NAMESPACE_SYSTEM) // 高级会员
    systemStore.setStorage('advanceDetail', undefined, NAMESPACE_SYSTEM) // 高级会员详情

    /** 超展开 */
    rakuenStore.setStorage('setting', undefined, NAMESPACE_RAKUEN) // 超展开设置
    rakuenStore.setStorage('favor', undefined, NAMESPACE_RAKUEN) // 超展开收藏相关

    /** 用户 */
    userStore.setStorage('accessToken', undefined, NAMESPACE_USER) // 用户授权信息
    userStore.setStorage('userInfo', undefined, NAMESPACE_USER) // 用户个人信息
    userStore.setStorage('userCookie', undefined, NAMESPACE_USER) // 用户网页 cookie

    /** 条目 */
    subjectStore.setStorage('origin', undefined, NAMESPACE_SUBJECT) // 自定义源头数据

    /** 放送 */
    calendarStore.setStorage('onAirUser', undefined, NAMESPACE_CALENDAR) // 用户自定义放送时间

    /** SMB */
    smbStore.setStorage('data', undefined, NAMESPACE_SMB) // SMB 数据

    /** 小圣杯 */
    tinygrailStore.setStorage('collected', undefined, NAMESPACE_TINYGRAIL) // 小圣杯人物收藏
  }

  /** 登出 */
  logout(navigation: Navigation) {
    confirm(
      `确定${i18n.logout()}?`,
      () => {
        userStore.logout()
        setTimeout(() => {
          navigation.popToTop()
        }, 0)
      },
      '提示'
    )
  }
}

const _ = themeStore

export {
  _,
  calendarStore,
  collectionStore,
  discoveryStore,
  monoStore,
  otaStore,
  rakuenStore,
  searchStore,
  smbStore,
  subjectStore,
  systemStore,
  tagStore,
  themeStore,
  timelineStore,
  tinygrailStore,
  uiStore,
  userStore,
  usersStore
}

export default new GlobalStores()
