/*
 * 管理全局 Stores 和放置系统级别状态
 *
 * @Author: czy0729
 * @Date: 2019-03-02 06:14:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-21 07:42:10
 */
import AsyncStorage from '@components/@/react-native-async-storage'
import { confirm } from '@utils'
import { DEV } from '@constants'
import i18n from '@constants/i18n'
import { Navigation } from '@types'
import calendarStore from './calendar'
import collectionStore from './collection'
import discoveryStore from './discovery'
import monoStore from './mono'
import otaStore from './ota'
import rakuenStore from './rakuen'
import searchStore from './search'
import smbStore from './smb'
import subjectStore, { getInt } from './subject'
import systemStore from './system'
import tagStore from './tag'
import themeStore from './theme'
import timelineStore from './timeline'
import tinygrailStore from './tinygrail'
import uiStore from './ui'
import userStore from './user'
import usersStore from './users'

let inited = false

class GlobalStores {
  /** 保证所有子 Store 初始化和加载缓存 */
  async init() {
    try {
      if (!DEV && inited) return true

      inited = true

      /** systemStore.init 和 themeStore.init 维持旧逻辑 */
      await systemStore.init()
      await themeStore.init()
      await smbStore.init('data')
      await rakuenStore.init('blockedUsersTrack')

      /**
       * 其他 store 使用新的懒读取本地数据逻辑，以下数据在初始化前拿出来
       * 会显著提高 APP 使用体验，实际上不取出来也不会影响使用
       */
      // usersStore
      const usersStoreKeys = ['users'] as const
      for (let i = 0; i < usersStoreKeys.length; i += 1) {
        await usersStore.init(usersStoreKeys[i])
      }

      // userStore
      const userStoreKeys = [
        'accessToken',
        'formhash',
        'userInfo',
        'usersInfo',
        'userCookie', // userCookie 一定要在读取 userInfo 和 usersInfo 之后
        'collection',
        'userSetting'
      ] as const
      for (let i = 0; i < userStoreKeys.length; i += 1) {
        await userStore.init(userStoreKeys[i])
      }

      // calendarStore, 把这些值提前取出来是为了防止首次首页列表多次计算渲染
      const calendarStoreKeys = ['onAir', 'onAirUser'] as const
      for (let i = 0; i < calendarStoreKeys.length; i += 1) {
        await calendarStore.init(calendarStoreKeys[i])
      }

      // subjectStoreKeys
      const subjectStoreKeys: `subject${number}`[] = []
      userStore.collection.list.forEach(item => {
        subjectStoreKeys.push(`subject${getInt(item.subject_id)}`)
      })
      for (let i = 0; i < subjectStoreKeys.length; i += 1) {
        await subjectStore.init(subjectStoreKeys[i])
      }

      // if (DEV) console.info('========== GlobalStores init ==========')

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

  /** 获取页面 Store */
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
  restore = async () => {
    /** 设置 */
    systemStore.save('setting')
    systemStore.save('advance')
    systemStore.save('advanceDetail')

    /** 主题 */
    themeStore.save('mode')
    themeStore.save('fontSizeAdjust')

    /** 超展开 */
    await rakuenStore.init('setting')
    await rakuenStore.init('favor')
    rakuenStore.save('setting')
    rakuenStore.save('favor')

    /** 用户 */
    await userStore.init('accessToken')
    await userStore.init('userInfo')
    await userStore.init('userCookie')
    userStore.save('accessToken')
    userStore.save('userInfo')
    userStore.save('userCookie')

    /** 条目 */
    await subjectStore.init('origin')
    subjectStore.save('origin')
    subjectStore.save('actions')

    /** 放送 */
    await calendarStore.init('onAirUser')
    calendarStore.save('onAirUser')

    /** SMB */
    await smbStore.init('data')
    smbStore.save('data')

    /** 小圣杯 */
    await tinygrailStore.init('collected')
    tinygrailStore.save('collected')
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
