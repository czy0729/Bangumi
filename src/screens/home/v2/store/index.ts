/*
 * @Author: czy0729
 * @Date: 2023-02-27 20:26:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 00:43:23
 *
 * 首页 store 入口: 定义 init() 与初始化编排 (状态恢复 / 请求调度 / 设备上报)
 */
import * as Device from 'expo-device'
import { _, systemStore, userStore } from '@stores'
import { date, getTimestamp, pick, postTask, sortObject } from '@utils'
import { logger } from '@utils/dev'
import { update } from '@utils/kv'
import { getProxyStrategy } from '@utils/proxy'
import { get } from '@utils/thirdParty/protobuf'
import { DEVICE_MODEL_NAME, MODEL_SETTING_INITIAL_PAGE, VERSION_GITHUB_RELEASE } from '@constants'
import { IOS_IPA } from '@src/config'
import { HEADER_HEIGHT, STATUS_BAR_HEIGHT } from '@styles'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

import type { Navigation } from '@types'
import type { STATE } from './ds'

/** 是否初始化 */
let inited: boolean

/** 上次初始化时的登录态 */
let initedLogin: boolean

/** 是否已注册过设备信息 (每次进程只上报一次) */
let initedUser: boolean

export default class ScreenHomeV2 extends Action {
  /** 初始化 */
  init = async () => {
    const loggedIn = this.isLogin

    // 登录态变化 (未登录 -> 登录 / 退出后重新登录) 需要按新账号重建状态与请求
    if (inited && initedLogin === loggedIn) {
      // 回 Tab 时静默全量刷新收视进度, 应对上游进度已变化的情况 (内部 1 小时节流, 失败已记录日志)
      this.fetchUserProgressAll()
      return
    }

    // 作废旧队列并丢弃上一批收藏的列表快照, 避免其进度写入与快照清理影响新一轮刷新
    this.resetQueue()
    this.clearListSnapshots()

    inited = false
    initedLogin = loggedIn

    if (loggedIn) {
      // 设备信息每次进程只上报一次, 重新登录不重复 boot+1
      if (!initedUser) this.initUser()
      inited = true

      // 4 秒内登录态再次变化时 (resetQueue 已自增代号), 旧回调不再执行
      const generation = this.queueGeneration
      postTask(() => {
        if (generation !== this.queueGeneration) return

        this.initFetch().catch(error => {
          logger.error(NAMESPACE, 'initFetch', error)
        })
      }, 4000)
    }

    await this.initStore()

    return true
  }

  /** 初始化状态 */
  initStore = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)

    // 标签页配置可能在登录后随设置同步变化, 页码收敛到可用范围, 已渲染过的页合并保留
    const page = Math.min(
      Math.max(0, Number(storageData?.page ?? this.state.page) || 0),
      Math.max(0, this.tabs.length - 1)
    )

    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      page,
      renderedTabsIndex: Array.from(new Set([...this.state.renderedTabsIndex, page])),
      loadedBangumiData: !!get('bangumi-data')?.length,
      _loaded: getTimestamp()
    })
  }

  /** 注册设备名，构建监测报错信息的环境变量 */
  initUser = () => {
    if (initedUser) return

    setTimeout(() => {
      // 未就绪时保持未上报状态, 下次登录态变化还能补报
      if (!this.userId || !DEVICE_MODEL_NAME) return false
      initedUser = true

      const boot = this.state.boot + 1
      this.setState({
        boot
      })
      this.save()

      const { setting } = systemStore
      update(`u_${this.userId}`, {
        v: VERSION_GITHUB_RELEASE,
        a: systemStore.advance,
        n: boot,
        t: date('Y-m-d H:i:s', getTimestamp()),
        ipa: IOS_IPA,
        nsfw: userStore.userSetting.show_nsfw_subject ? 1 : 0,
        p: {
          disabled: setting.workerProxyDisabled,
          proxy: setting.workerProxy.length,
          api: setting.workerApiProxy.length,
          lain: setting.workerLainProxy.length,
          direct: setting.workerProxyDirect,
          secret: setting.workerSecret.length,
          lainSecret: setting.workerLainSecret.length,
          ech: setting.echProxyEnabled,
          supporter: getProxyStrategy().supporter
        },
        l: {
          statusBar: STATUS_BAR_HEIGHT,
          header: HEADER_HEIGHT,
          tarBar: _.tabBarHeight,
          isDark: _.isDark,
          deepDark: _.deepDark,
          ..._.window
        },
        d: {
          brand: Device.brand,
          year: Device.deviceYearClass,
          id: String(Device.modelId),
          name: Device.modelName,
          os: Device.osVersion,
          mem: `${Math.floor(Device.totalMemory / 1000 / 1000 / 1000)}G`
        },
        s: pick(setting, [
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
          'homeTopExtraCustom',
          'initialPage',
          'katakana',
          'live2DV2',
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
