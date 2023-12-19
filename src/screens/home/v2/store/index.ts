/*
 * @Author: czy0729
 * @Date: 2023-02-27 20:26:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-20 05:25:03
 */
import * as Device from 'expo-device'
import { _, systemStore, userStore } from '@stores'
import { date, feedback, getTimestamp, info, sortObject } from '@utils'
import { t } from '@utils/fetch'
import { update } from '@utils/kv'
import {
  DEV,
  DEVICE_MODEL_NAME,
  MODEL_SETTING_INITIAL_PAGE,
  VERSION_GITHUB_RELEASE
} from '@constants'
import { Navigation, SettingInitialPage } from '@types'
import { IOS_IPA } from '@/config'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

/** 是否初始化 */
let inited: boolean

/** 是否授权中 */
let reOauthing: boolean

class ScreenHomeV2 extends Action {
  /** 初始化 */
  init = async () => {
    if (inited && !DEV) return

    if (this.isLogin) {
      this.initUser()
      inited = true

      setTimeout(() => {
        this.initFetch()
      }, 4000)
    }

    await this.initStore()
    this.fetchBangumiData()

    return true
  }

  /** 初始化状态 */
  initStore = async () => {
    const state = await this.getStorage(NAMESPACE)
    this.setState({
      ...state,
      ...EXCLUDE_STATE,
      renderedTabsIndex: [state?.page || 0],
      _loaded: getTimestamp()
    })
  }

  /** 初始化请求 */
  initFetch = async (refresh: boolean = false) => {
    const { fetching } = this.state.progress
    if (fetching) {
      info('正在刷新条目信息')
      return
    }

    let flag = refresh
    let { _loaded } = this.collection
    if (typeof _loaded !== 'number') _loaded = 0

    // 6 天强制刷新一次
    if (getTimestamp() - _loaded > 60 * 60 * 24 * 6 || !this.collection.list.length) {
      flag = true
    }

    // 需要刷新数据
    if (flag) {
      if (await this.initQueue()) {
        return true
      }

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
    }

    return true
  }

  /** 初始化进度和条目等数据 */
  initQueue = async () => {
    const data = await Promise.all([userStore.fetchCollection()])
    if (data?.[0]?.list?.length) return this.fetchSubjectsQueue(data[0].list)
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

      const {
        avatarRound,
        cdn,
        cdnAvatarV2,
        customFontFamily,
        focusAction,
        focusOrigin,
        homeLayout,
        homeListCompact,
        homeSorting,
        homeTopLeftCustom,
        homeTopRightCustom,
        katakana,
        live2D,
        onlineStatus,
        vibration,
        webhook
      } = systemStore.setting
      update(`u_${this.userId}`, {
        b: Device.brand,
        y: Device.deviceYearClass,
        i: Device.modelId,
        d: Device.modelName,
        o: Device.osVersion,
        m: `${Math.floor(Device.totalMemory / 1000 / 1000 / 1000)}G`,
        v: VERSION_GITHUB_RELEASE,
        a: systemStore.advance,
        n: boot,
        l: {
          statusBar: _.statusBarHeight,
          header: _.headerHeight,
          tarBar: _.tabBarHeight,
          isDark: _.isDark,
          deepDark: _.deepDark
        },
        s: {
          avatarRound,
          cdn,
          cdnAvatarV2,
          customFontFamily,
          focusAction,
          focusOrigin,
          homeLayout,
          homeListCompact,
          homeSorting,
          homeTopLeftCustom,
          homeTopRightCustom,
          katakana,
          live2D,
          onlineStatus,
          vibration,
          webhook
        },
        e: sortObject(systemStore.t),
        t: date('Y-m-d H:i:s', getTimestamp()),
        ipa: IOS_IPA
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
    const { initialPage } = systemStore.setting
    if (
      initialPage === MODEL_SETTING_INITIAL_PAGE.getValue<SettingInitialPage>('进度')
    ) {
      return this.init()
    }

    if (
      initialPage === MODEL_SETTING_INITIAL_PAGE.getValue<SettingInitialPage>('小圣杯')
    ) {
      return navigation.push('Tinygrail')
    }
  }
}

export default ScreenHomeV2
