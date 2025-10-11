/*
 * @Author: czy0729
 * @Date: 2023-02-27 20:26:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-25 20:57:06
 */
import * as Device from 'expo-device'
import { _, systemStore, userStore } from '@stores'
import { date, feedback, getTimestamp, info, pick, postTask, sortObject } from '@utils'
import { t } from '@utils/fetch'
import { update } from '@utils/kv'
import { get } from '@utils/protobuf'
import {
  D,
  DEVICE_MODEL_NAME,
  MODEL_SETTING_INITIAL_PAGE,
  VERSION_GITHUB_RELEASE
} from '@constants'
import { IOS_IPA } from '@src/config'
import { Navigation } from '@types'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

/** 是否初始化 */
let inited: boolean

/** 是否授权中 */
let reOauthing: boolean

export default class ScreenHomeV2 extends Action {
  /** 初始化 */
  init = async () => {
    if (inited) return

    if (this.isLogin) {
      this.initUser()
      inited = true

      postTask(() => {
        this.initFetch()
      }, 4000)
    }

    await this.initStore()
    // this.fetchBangumiData()

    return true
  }

  /** 初始化状态 */
  initStore = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      renderedTabsIndex: [storageData?.page || 0],
      loadedBangumiData: !!get('bangumi-data')?.length,
      _loaded: getTimestamp()
    })
  }

  /** 初始化请求 */
  initFetch = async (refresh: boolean = false) => {
    if (this.state.progress.fetching) {
      info('正在刷新条目信息')
      return
    }

    let flag = refresh
    let { _loaded } = this.collection
    if (typeof _loaded !== 'number') _loaded = 0

    // 6 天强制刷新一次
    if (getTimestamp() - _loaded > D * 6 || !this.collection.list.length) {
      flag = true
    }

    // 需要全刷新数据
    if (flag) {
      if (await this.initQueue()) return true

      // 可能是 access_token 过期了, 需要重新刷新 access_token
      if (userStore.isWebLogin) {
        if (!reOauthing) {
          reOauthing = true

          // oauth 成功后重新刷新数据
          if (await userStore.reOauth()) {
            reOauthing = false

            info('重新授权成功')
            t('其他.重新授权')
            return this.initQueue()
          }
          reOauthing = false
        }
      }
    } else {
      // 不需要全刷新也至少刷新首屏
      return this.initQueue(6)
    }

    return true
  }

  /** 初始化进度和条目等数据 */
  initQueue = async (count?: number) => {
    const data = await Promise.all([userStore.fetchCollection()])
    if (data?.[0]?.list?.length) return this.fetchSubjectsQueue(data[0].list, count)

    return false
  }

  /** 注册设备名 */
  initUser = () => {
    if (inited) return

    setTimeout(() => {
      if (!this.userId || !DEVICE_MODEL_NAME) return false

      const boot = this.state.boot + 1
      this.setState({
        boot
      })
      this.save()

      update(`u_${this.userId}`, {
        v: VERSION_GITHUB_RELEASE,
        a: systemStore.advance,
        n: boot,
        t: date('Y-m-d H:i:s', getTimestamp()),
        ipa: IOS_IPA,
        l: {
          statusBar: _.statusBarHeight,
          header: _.headerHeight,
          tarBar: _.tabBarHeight,
          isDark: _.isDark,
          deepDark: _.deepDark,
          ..._.window
        },
        d: {
          brand: Device.brand,
          year: Device.deviceYearClass,
          id: Device.modelId,
          name: Device.modelName,
          os: Device.osVersion,
          mem: `${Math.floor(Device.totalMemory / 1000 / 1000 / 1000)}G`
        },
        s: pick(systemStore.setting, [
          'androidBlur',
          'avatarRound',
          'cdn',
          'cdnAvatarV2',
          'cnFirst',
          'customFontFamily',
          'heatMap',
          'homeLayout',
          'homeListCompact',
          'homeRenderTabs',
          'homeSorting',
          'homeTabs',
          'homeTopLeftCustom',
          'homeTopRightCustom',
          'initialPage',
          'katakana',
          'live2D',
          'onlineStatus',
          's2t',
          'showGame',
          'squircle',
          'tinygrail',
          'vibration',
          'webhook'
        ]),
        e: sortObject(systemStore.t)
      })
    }, 8000)
  }

  /** 下拉刷新 */
  onHeaderRefresh = () => {
    if (this.tabsLabel === '游戏') return this.fetchDoingGames(true)
    return this.initFetch(true)
  }

  /** 下一页 */
  onFooterRefresh = () => {
    return this.fetchDoingGames()
  }

  /** 刷新并返回到顶部 */
  onRefreshThenScrollTop = () => {
    try {
      const { page } = this.state
      if (typeof this.scrollToIndex[page] === 'function') {
        t('其他.刷新到顶', {
          screen: 'Home'
        })

        this.scrollToIndex[page]({
          animated: true,
          index: 0,
          viewOffset: 8000
        })
        setTimeout(() => {
          feedback()
        }, 400)

        this.onHeaderRefresh()
      }
    } catch (error) {
      console.error('Home', 'onRefreshThenScrollTop', error)
    }
  }

  /** 设置应用初始页面 */
  updateInitialPage = (navigation: Navigation) => {
    const { initialPage, homeRenderTabs } = systemStore.setting
    if (initialPage === MODEL_SETTING_INITIAL_PAGE.getValue('进度')) {
      this.init()
      return
    }

    if (initialPage === MODEL_SETTING_INITIAL_PAGE.getValue('小圣杯')) {
      if (!homeRenderTabs.includes('Tinygrail')) navigation.push('Tinygrail')
      return
    }
  }
}
