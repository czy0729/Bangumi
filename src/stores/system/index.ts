/*
 * @Author: czy0729
 * @Date: 2019-05-17 21:53:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-23 19:16:36
 */
import { observable, computed } from 'mobx'
import { getTimestamp } from '@utils'
import { xhrCustom } from '@utils/fetch'
import store from '@utils/store'
import { info } from '@utils/ui'
import { put, read } from '@utils/db'
import {
  ADVANCE_CDN,
  DEV,
  GITHUB_ADVANCE,
  GITHUB_DATA,
  GITHUB_RELEASE_REPOS,
  IOS,
  MODEL_SETTING_CDN_ORIGIN,
  MODEL_SETTING_HOME_LAYOUT,
  MODEL_SETTING_HOME_SORTING,
  MODEL_SETTING_INITIAL_PAGE,
  MODEL_SETTING_QUALITY,
  MODEL_SETTING_TRANSITION,
  MODEL_SETTING_USER_GRID_NUM,
  VERSION_GITHUB_RELEASE
} from '@constants'
import UserStore from '../user'
import {
  NAMESPACE,
  INIT_SUBJECT_LAYOUT,
  INIT_SETTING,
  INIT_DEV_EVENT,
  INIT_RELEASE,
  INIT_IMAGE_VIEWER
} from './init'
import {
  AnyObject,
  SettingCDNOrigin,
  SettingHomeLayoutCn,
  SettingHomeSortingCn,
  SettingInitialPageCn,
  SettingQualityCn,
  SettingTransitionCn,
  SettingUserGridNumCn,
  StoreConstructor,
  UserId
} from '@types'

const state = {
  /** 云端配置数据 */
  ota: {},

  /** 高级会员 */
  advance: false,

  /** 高级会员详情 */
  advanceDetail: {
    _loaded: 0
  },

  /** 基本设置 */
  setting: INIT_SETTING,

  /** 发布版本 */
  release: INIT_RELEASE,

  /** 是否显示图片预览 */
  imageViewer: INIT_IMAGE_VIEWER,

  /** @deprecated 是否 wifi */
  wifi: false,

  /** 是否开发环境 */
  dev: false,

  /** 是否显示埋点统计 */
  devEvent: INIT_DEV_EVENT,

  /** @deprecated iOS 首次进入, 观看用户产生内容需有同意规则选项, 否则不能过审 */
  iosUGCAgree: false,

  /** 用于标记 APP 启动后是否进入静止期 */
  rendered: false,

  /** 用于在 bangumi-oss ota hash 更新后, 强制刷新 APP 内所有封面 */
  hashSubjectOTALoaded: 0
}

class SystemStore extends store implements StoreConstructor<typeof state> {
  state = observable(state)

  // -------------------- get --------------------
  /** 是否开发环境 */
  @computed get dev() {
    return this.state.dev
  }

  /** 基本设置 */
  @computed get setting() {
    return {
      ...this.state.setting,

      /** 版本迭代后的禁用设置覆盖 */
      imageTransition: false,
      cdnAvatar: false
    }
  }

  /** 发布版本 */
  @computed get release() {
    return this.state.release
  }

  /** @deprecated 是否 wifi */
  @computed get wifi() {
    return this.state.wifi
  }

  /** @deprecated iOS首次进入, 观看用户产生内容需有同意规则选项, 否则不能过审 */
  @computed get iosUGCAgree() {
    return this.state.iosUGCAgree
  }

  /** 是否显示埋点统计 */
  @computed get devEvent() {
    return this.state.devEvent
  }

  /** 高级会员 */
  @computed get advance() {
    return this.state.advance
  }

  /** 高级会员详情 */
  @computed get advanceDetail() {
    return this.state.advanceDetail
  }

  /** 是否显示图片预览 */
  @computed get imageViewer() {
    return this.state.imageViewer
  }

  /** 用于标记 APP 启动后是否进入静止期 */
  @computed get rendered() {
    return this.state.rendered
  }

  /** 云端配置数据 */
  @computed get ota(): AnyObject {
    return this.state.ota
  }

  /** 用于在 bangumi-oss ota hash 更新后, 强制刷新 APP 内所有封面 */
  @computed get hashSubjectOTALoaded() {
    return this.state.hashSubjectOTALoaded
  }

  // -------------------- computed --------------------
  /** @deprecated iOS 首次进入, 观看用户产生内容需有同意规则选项, 否则不能过审 */
  @computed get isUGCAgree() {
    return true
  }

  /** 是否高级用户 */
  isAdvance(userId: UserId, userName?: string) {
    return computed<boolean>(() => {
      let flag = false
      if (userId) flag = userId in this.advanceDetail
      if (!flag && userName) flag = userName in this.advanceDetail
      return flag
    }).get()
  }

  init = async () => {
    await this.readStorage(
      [
        'ota',
        'advance',
        'advanceDetail',
        'setting',
        'release',
        'dev',
        'devEvent',
        'iosUGCAgree'
      ],
      NAMESPACE
    )

    // 检查新版本
    this.fetchOTA()

    // 优先度: 高
    setTimeout(() => {
      this.resetCDN()
      if (!DEV) this.fetchRelease()
    }, 4000)

    // 优先度: 中
    setTimeout(() => {
      this.setState({
        rendered: true
      })

      const now = getTimestamp()
      if (this.advance && now - this.advanceDetail._loaded >= 60 * 60 * 24) {
        this.fetchAdvanceDetail()
      }
    }, 8000)

    return true
  }

  // -------------------- fetch --------------------
  /** 检查云端数据 */
  fetchOTA = async () => {
    let res
    try {
      res = fetch(`${GITHUB_DATA}?t=${getTimestamp()}`).then(response =>
        response.json()
      )

      const ota = (await res) || {}
      this.setState({
        ota
      })
      this.setStorage('ota', undefined, NAMESPACE)
    } catch (error) {}
    return res
  }

  /** 检查新版本 */
  fetchRelease = async () => {
    let res
    try {
      res = fetch(GITHUB_RELEASE_REPOS).then(response => response.json())
      const data = await res

      const { name: githubVersion, assets = [] } = data[0]
      const { browser_download_url: downloadUrl } = assets[0]
      const { name: currentVersion } = this.state.release
      if (githubVersion !== (currentVersion || VERSION_GITHUB_RELEASE)) {
        // iOS 不允许提示更新
        if (!IOS) {
          setTimeout(() => {
            info('有新版本, 可到设置里下载')
          }, 1600)
        }

        const release = {
          name: githubVersion,
          downloadUrl
        }
        this.setState({
          release
        })
        this.setStorage('release', undefined, NAMESPACE)
      }
    } catch (error) {}
    return res
  }

  /** 判断是否高级用户 */
  fetchAdvance = async () => {
    if (this.advance) return true

    const { myId, myUserId } = UserStore
    if (!myId || !myUserId) return false

    try {
      const { _response } = await xhrCustom({
        url: `${GITHUB_ADVANCE}?t=${getTimestamp()}`
      })
      const advanceUserMap = JSON.parse(_response)

      if (advanceUserMap[myId] || advanceUserMap[myUserId]) {
        const key = 'advance'
        this.setState({
          advance: true
        })
        this.setStorage(key, undefined, NAMESPACE)
      }
    } catch (error) {}

    return true
  }

  /** 请求自己的打赏信息 */
  fetchAdvanceDetail = async () => {
    const { myId, myUserId } = UserStore
    if (!myId || !myUserId) return false

    try {
      const { _response } = await xhrCustom({
        url: `${GITHUB_ADVANCE}?t=${getTimestamp()}`
      })
      const data = JSON.parse(_response)

      const key = 'advanceDetail'
      this.setState({
        [key]: {
          ...data,
          _loaded: getTimestamp()
        }
      })
      this.setStorage(key, undefined, NAMESPACE)

      return data[myId] || data[myUserId]
    } catch (error) {
      return 0
    }
  }

  // -------------------- page --------------------
  /** 还原 CDN */
  resetCDN = () => {
    try {
      if (this.advance) {
        const { myId, myUserId } = UserStore
        const value = this.advanceDetail[myId] || this.advanceDetail[myUserId]
        if (value == 1) return false

        const [, amount] = String(value).split('|')
        if (Number(amount || 0) >= ADVANCE_CDN) return false
      }

      const { cdn, cdnOrigin } = this.setting
      if (
        cdn &&
        cdnOrigin === MODEL_SETTING_CDN_ORIGIN.getValue<SettingCDNOrigin>('magma')
      ) {
        this.switchSetting('cdn')
        return true
      }

      return false
    } catch (error) {
      return false
    }
  }

  /** 设置 `图片质量` */
  setQuality = (label: SettingQualityCn) => {
    const quality = MODEL_SETTING_QUALITY.getValue(label)
    if (quality) {
      const key = 'setting'
      this.setState({
        [key]: {
          ...this.setting,
          quality
        }
      })
      this.setStorage(key, undefined, NAMESPACE)
    }
  }

  /** 设置 `切页动画` */
  setTransition = (label: SettingTransitionCn) => {
    const transition = MODEL_SETTING_TRANSITION.getValue(label)
    if (transition) {
      const key = 'setting'
      this.setState({
        [key]: {
          ...this.setting,
          transition
        }
      })
      this.setStorage(key, undefined, NAMESPACE)
    }
  }

  /** 设置 `启动页` */
  setInitialPage = (label: SettingInitialPageCn) => {
    const initialPage = MODEL_SETTING_INITIAL_PAGE.getValue(label)
    if (initialPage) {
      const key = 'setting'
      this.setState({
        [key]: {
          ...this.setting,
          initialPage
        }
      })
      this.setStorage(key, undefined, NAMESPACE)
    }
  }

  /** 设置 `首页布局` */
  setHomeLayout = (label: SettingHomeLayoutCn) => {
    const homeLayout = MODEL_SETTING_HOME_LAYOUT.getValue(label)
    if (homeLayout) {
      const key = 'setting'
      this.setState({
        [key]: {
          ...this.setting,
          homeLayout
        }
      })
      this.setStorage(key, undefined, NAMESPACE)
    }
  }

  /** 设置 `首页排序` */
  setHomeSorting = (label: SettingHomeSortingCn) => {
    const homeSorting = MODEL_SETTING_HOME_SORTING.getValue(label)
    if (homeSorting) {
      const key = 'setting'
      this.setState({
        [key]: {
          ...this.setting,
          homeSorting
        }
      })
      this.setStorage(key, undefined, NAMESPACE)
    }
  }

  /** 设置 `首页功能块` */
  setHomeRenderTabs = (
    label: 'Discovery' | 'Timeline' | 'Home' | 'Rakuen' | 'User'
  ) => {
    const { homeRenderTabs } = this.setting

    let data: string[]
    if (homeRenderTabs.includes(label)) {
      data = homeRenderTabs.filter(item => item !== label)
    } else {
      data = []
      if (label === 'Discovery' || homeRenderTabs.includes('Discovery'))
        data.push('Discovery')
      if (label === 'Timeline' || homeRenderTabs.includes('Timeline'))
        data.push('Timeline')
      data.push('Home')
      if (label === 'Rakuen' || homeRenderTabs.includes('Rakuen')) data.push('Rakuen')
      data.push('User')
    }

    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        homeRenderTabs: data
      }
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /** 设置 `方格数量` */
  setUserGridNum = (label: SettingUserGridNumCn) => {
    const userGridNum = MODEL_SETTING_USER_GRID_NUM.getValue(label)
    if (userGridNum) {
      const key = 'setting'
      this.setState({
        [key]: {
          ...this.setting,
          userGridNum
        }
      })
      this.setStorage(key, undefined, NAMESPACE)
    }
  }

  /** 切换 */
  switchSetting = (switchKey: keyof typeof INIT_SETTING) => {
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        [switchKey]: !this.setting[switchKey]
      }
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /** 对指定设置直接赋值 (暂用于永久隐藏条目页面板块) */
  setSetting = (switchKey: keyof typeof INIT_SETTING, value: unknown = true) => {
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        [switchKey]: value
      }
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /** 条目页面重置布局 */
  resetSubjectLayout = () => {
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        ...INIT_SUBJECT_LAYOUT
      }
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /** 恢复默认设置 */
  resetSetting = () => {
    const key = 'setting'
    this.setState({
      [key]: INIT_SETTING
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /** 上传当前设置到云端 */
  uploadSetting = () => {
    const { id } = UserStore.userInfo
    return put({
      path: `setting/${id}.json`,
      content: JSON.stringify(this.setting)
    })
  }

  /** 恢复到云端的设置 */
  downloadSetting = async () => {
    const { id } = UserStore.userInfo
    const { content } = await read({
      path: `setting/${id}.json`
    })

    if (!content) return false

    try {
      const setting = JSON.parse(content)
      const key = 'setting'
      this.setState({
        [key]: {
          ...this.setting,
          ...setting
        }
      })
      this.setStorage(key, undefined, NAMESPACE)
      return true
    } catch (error) {
      return false
    }
  }

  /** 显示 ImageViewer */
  showImageViewer = (
    imageUrls: unknown[] = [],
    index: number,
    mini: boolean = false
  ) => {
    this.setState({
      imageViewer: {
        visible: true,
        imageUrls,
        index,
        mini
      }
    })
  }

  /** 隐藏 ImageViewer */
  closeImageViewer = () => {
    this.setState({
      imageViewer: INIT_IMAGE_VIEWER
    })
  }

  /** 切换开发模式 */
  toggleDev = () => {
    const { dev } = this.state
    const key = 'dev'
    this.setState({
      [key]: !dev
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /** 切换显示埋点统计 */
  toggleDevEvent = (
    value: 'enabled' | 'grid' | 'text' | 'sum' | 'mini' = 'enabled'
  ) => {
    const { devEvent } = this.state
    const key = 'devEvent'
    this.setState({
      [key]: {
        ...devEvent,
        [value]: !devEvent[value]
      }
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /** 同意社区指导原则 */
  updateUGCAgree = (value: boolean = true) => {
    const key = 'iosUGCAgree'
    this.setState({
      [key]: value
    })
    this.setStorage(key, undefined, NAMESPACE)
  }
}

export default new SystemStore()
