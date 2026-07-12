/*
 * @Author: czy0729
 * @Date: 2019-03-02 06:14:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-12 02:28:32
 */
import { StatusBar } from 'react-native'
import { confirm, queue } from '@utils'
import { clear } from '@utils/storage/utils'
import { DEV, WEB } from '@constants'
import i18n from '@constants/i18n'
import calendarStore from './calendar'
import collectionStore from './collection'
import rakuenStore from './rakuen'
import smbStore from './smb'
import subjectStore, { getInt } from './subject'
import systemStore from './system'
import themeStore from './theme'
import tinygrailStore from './tinygrail'
import userStore from './user'
import usersStore from './users'
import {
  CALENDAR_STORE_KEYS,
  COLLECTION_STORE_KEYS,
  RAKUEN_STORE_KEYS,
  SMB_STORE_KEYS,
  USER_STORE_KEYS,
  USERS_STORE_KEYS
} from './ds'

import type { Navigation, SubjectId } from '@types'

let inited = false

/** 管理全局 Stores 和放置系统级别状态 */
class GlobalStores {
  /** 保证所有子 Store 初始化和加载缓存,只有在第一次初始化后返回 systemStore.setting */
  async init() {
    try {
      if (inited) return true

      inited = true

      /** ========== systemStore, themeStore 核心数据，串行加载 ========== */
      await systemStore.init()
      await themeStore.init()

      /** ========== 状态栏 ========== */
      if (!WEB) StatusBar.setBarStyle(themeStore.select('dark-content', 'light-content'))

      /**
       * 其他 store 使用新的懒读取本地数据逻辑，以下数据在初始化前拿出来
       * 会显著提高冷启动速度，实际上不取出来也不会影响使用
       */
      /** ==================== usersStore ==================== */
      await queue(
        USERS_STORE_KEYS.map(key => () => usersStore.init(key)),
        4
      )

      /** ==================== userStore ==================== */
      await queue(
        USER_STORE_KEYS.map(key => () => userStore.init(key)),
        4
      ).then(() => {
        userStore.checkLogin()
      })

      /** ==================== calendarStore ==================== */
      await queue(
        CALENDAR_STORE_KEYS.map(key => () => calendarStore.init(key)),
        4
      )

      /** ==================== subjectStoreKeys ==================== */
      await queue(
        userStore.collection.list.map(
          item => () => subjectStore.init(`subject${getInt(item.subject_id as SubjectId)}`)
        ),
        4
      )

      /** ==================== collectionStore ==================== */
      await queue(
        COLLECTION_STORE_KEYS.map(key => () => collectionStore.init(key)),
        4
      )

      /** ==================== rakuenStore ==================== */
      await queue(
        RAKUEN_STORE_KEYS.map(key => () => rakuenStore.init(key)),
        4
      )

      /** ==================== smbStore ==================== */
      await queue(
        SMB_STORE_KEYS.map(key => () => smbStore.init(key)),
        4
      )

      return systemStore.setting
    } catch (error) {
      return false
    }
  }

  /** ==================== methods ==================== */
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
    await clear()
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
    rakuenStore.save('setting')

    await rakuenStore.init('favor')
    rakuenStore.save('favor')

    /** 用户 */
    await userStore.init('accessToken')
    userStore.save('accessToken')

    await userStore.init('userInfo')
    userStore.save('userInfo')

    await userStore.init('userCookie')
    userStore.save('userCookie')
    userStore.checkLogin()

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

export default new GlobalStores()
