/*
 * @Author: czy0729
 * @Date: 2023-02-27 20:26:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 00:43:23
 *
 * 首页 store 入口: 定义 init() 与初始化编排 (状态恢复 / 请求调度 / 设备上报)
 */
import * as Device from 'expo-device'
import { _, systemStore } from '@stores'
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

export default class ScreenHomeV2 extends Action {
  /** 初始化 */
  init = async () => {
    if (inited) return

    if (this.isLogin) {
      this.initUser()
      inited = true

      postTask(() => {
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
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      renderedTabsIndex: [storageData?.page || 0],
      loadedBangumiData: !!get('bangumi-data')?.length,
      _loaded: getTimestamp()
    })
  }

  /** 注册设备名，构建监测报错信息的环境变量 */
  initUser = () => {
    if (inited) return

    setTimeout(() => {
      if (!this.userId || !DEVICE_MODEL_NAME) return false

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
