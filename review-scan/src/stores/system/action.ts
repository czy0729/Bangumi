/*
 * @Author: czy0729
 * @Date: 2023-04-23 15:18:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-12 17:09:47
 */
import { confirm, info, titleCase } from '@utils'
import { read } from '@utils/db'
import { get, update } from '@utils/kv'
import {
  APP_ADVANCE_CDN,
  APP_ADVANCE_TRACK_COLLECTION,
  APP_FREE_TRACK_COLLECTION,
  MODEL_SETTING_CDN_ORIGIN,
  MODEL_SETTING_HOME_COUNT_VIEW,
  MODEL_SETTING_HOME_LAYOUT,
  MODEL_SETTING_HOME_SORTING,
  MODEL_SETTING_INITIAL_PAGE,
  MODEL_SETTING_TRANSITION,
  MODEL_SETTING_USER_GRID_NUM
} from '@constants'
import {
  EventKeys,
  SettingCDNOrigin,
  SettingHomeCountView,
  SettingHomeCountViewCn,
  SettingHomeLayout,
  SettingHomeLayoutCn,
  SettingHomeSorting,
  SettingHomeSortingCn,
  SettingInitialPage,
  SettingInitialPageCn,
  SettingTransition,
  SettingTransitionCn,
  SettingUserGridNum,
  SettingUserGridNumCn,
  SubjectType,
  UserId
} from '@types'
import UserStore from '../user'
import Fetch from './fetch'
import { INIT_DEV_EVENT, INIT_IMAGE_VIEWER, INIT_SETTING, INIT_SUBJECT_LAYOUT } from './init'
import { HomeRenderTabs, HomeTabsKeys, SettingKeys } from './types'

export default class Actions extends Fetch {
  /** 还原 CDN */
  resetCDN = () => {
    try {
      if (this.advance) {
        const { myId, myUserId } = UserStore
        const value = this.advanceDetail[myId] || this.advanceDetail[myUserId]
        if (value == 1) return false

        const [, amount] = String(value).split('|')
        if (Number(amount || 0) >= APP_ADVANCE_CDN) return false
      }

      const { cdn, cdnOrigin } = this.setting
      if (cdn && cdnOrigin === MODEL_SETTING_CDN_ORIGIN.getValue<SettingCDNOrigin>('magma')) {
        this.switchSetting('cdn')
        return true
      }

      return false
    } catch (error) {
      return false
    }
  }

  /** 设置 `切页动画` */
  setTransition = (label: SettingTransitionCn) => {
    const transition = MODEL_SETTING_TRANSITION.getValue<SettingTransition>(label)
    if (transition) {
      const key = 'setting'
      this.setState({
        [key]: {
          ...this.setting,
          transition
        }
      })
      this.save(key)
    }
  }

  /** 设置 `启动页` */
  setInitialPage = (label: SettingInitialPageCn) => {
    const initialPage = MODEL_SETTING_INITIAL_PAGE.getValue<SettingInitialPage>(label)
    if (initialPage) {
      const key = 'setting'
      this.setState({
        [key]: {
          ...this.setting,
          initialPage
        }
      })
      this.save(key)
    }
  }

  /** 设置 `首页布局` */
  setHomeLayout = (label: SettingHomeLayoutCn) => {
    const homeLayout = MODEL_SETTING_HOME_LAYOUT.getValue<SettingHomeLayout>(label)
    if (homeLayout) {
      const key = 'setting'
      this.setState({
        [key]: {
          ...this.setting,
          homeLayout
        }
      })
      this.save(key)
    }
  }

  /** 设置 `首页放送数字显示` */
  setHomeCountView = (label: SettingHomeCountViewCn) => {
    const homeCountView = MODEL_SETTING_HOME_COUNT_VIEW.getValue<SettingHomeCountView>(label)
    if (homeCountView) {
      const key = 'setting'
      this.setState({
        [key]: {
          ...this.setting,
          homeCountView
        }
      })
      this.save(key)
    }
  }

  /** 设置 `首页排序` */
  setHomeSorting = (label: SettingHomeSortingCn) => {
    const homeSorting = MODEL_SETTING_HOME_SORTING.getValue<SettingHomeSorting>(label)
    if (homeSorting) {
      const key = 'setting'
      this.setState({
        [key]: {
          ...this.setting,
          homeSorting
        }
      })
      this.save(key)
    }
  }

  /** 计算 `首页功能块` */
  calcHomeRenderTabs = (label: HomeTabsKeys) => {
    const { homeRenderTabs } = this.setting

    let data: HomeRenderTabs
    if (homeRenderTabs.includes(label)) {
      data = homeRenderTabs.filter(item => item !== label)
    } else {
      data = []
      if (label === 'Tinygrail' || homeRenderTabs.includes('Tinygrail')) data.push('Tinygrail')
      if (label === 'Discovery' || homeRenderTabs.includes('Discovery')) data.push('Discovery')
      if (label === 'Timeline' || homeRenderTabs.includes('Timeline')) data.push('Timeline')
      data.push('Home')
      if (label === 'Rakuen' || homeRenderTabs.includes('Rakuen')) data.push('Rakuen')
      data.push('User')
    }

    return data
  }

  /** 设置 `首页功能块` */
  setHomeRenderTabs = (label: HomeTabsKeys) => {
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        homeRenderTabs: this.calcHomeRenderTabs(label)
      }
    })
    this.save(key)
  }

  /** 设置 `方格数量` */
  setUserGridNum = (label: SettingUserGridNumCn) => {
    const userGridNum = MODEL_SETTING_USER_GRID_NUM.getValue<SettingUserGridNum>(label)
    if (userGridNum) {
      const key = 'setting'
      this.setState({
        [key]: {
          ...this.setting,
          userGridNum
        }
      })
      this.save(key)
    }
  }

  /** 切换 */
  switchSetting = (switchKey: SettingKeys) => {
    const key = 'setting'
    const value = !this.setting[switchKey]
    this.setState({
      [key]: {
        ...this.setting,
        [switchKey]: value
      }
    })
    this.save(key)
    this.log('switchSetting', switchKey, value)
  }

  /** 对指定设置直接赋值 (暂用于永久隐藏条目页面板块) */
  setSetting = (switchKey: SettingKeys, value: unknown = true) => {
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        [switchKey]: value
      }
    })
    this.save(key)
    this.log('setSetting', switchKey, value)
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
    this.save(key)
  }

  /** 更新用户备注 */
  updateUserRemark = (userId: UserId, text: string) => {
    this.setSetting('userRemark', {
      ...this.setting.userRemark,
      [userId]: String(text || '').trim()
    })
  }

  /** 恢复默认设置 */
  resetSetting = () => {
    const key = 'setting'
    this.setState({
      [key]: {
        ...INIT_SETTING,
        userRemark: this.setting.userRemark
      }
    })
    this.save(key)
  }

  /** 上传当前设置到云端 */
  uploadSetting = () => {
    const { id } = UserStore.userInfo
    return update(`setting_${id}`, this.setting)
  }

  /** 恢复到云端的设置 */
  downloadSetting = async () => {
    const { id } = UserStore.userInfo
    let setting: typeof this.setting

    try {
      const data = await get(`setting_${id}`)
      if (data) {
        setting = data
      } else {
        const data = await read({
          path: `setting/${id}.json`
        })
        if (!data?.content) return false

        setting = JSON.parse(data.content)
      }
    } catch (error) {
      return false
    }
    if (!setting || typeof setting !== 'object') return false

    try {
      const key = 'setting'
      this.setState({
        [key]: {
          ...this.setting,
          ...setting
        }
      })
      this.save(key)
      return true
    } catch (error) {
      return false
    }
  }

  /** 显示 ImageViewer */
  showImageViewer = (
    imageUrls: unknown[] = [],
    index: number,
    mini: boolean = false,
    useRN: boolean = false
  ) => {
    this.setState({
      imageViewer: {
        visible: true,
        imageUrls,
        index,
        mini,
        useRN
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
    this.save(key)
  }

  /** 切换显示埋点统计 */
  toggleDevEvent = (value: keyof typeof INIT_DEV_EVENT = 'enabled') => {
    const { devEvent } = this.state
    const key = 'devEvent'
    this.setState({
      [key]: {
        ...devEvent,
        [value]: !devEvent[value]
      }
    })
    this.save(key)
  }

  /** 同意社区指导原则 */
  updateUGCAgree = (value: boolean = true) => {
    const key = 'iosUGCAgree'
    this.setState({
      [key]: value
    })
    this.save(key)
  }

  /** 追踪特定用户收藏相关信息 */
  trackUsersCollection = (userName: UserId, type: SubjectType = 'anime') => {
    const key = `comment${titleCase(type)}` as const
    const value = [...(this.setting[key] || [])]
    if (!value.includes(userName)) value.unshift(userName)

    if (!this.advance && value.length > APP_FREE_TRACK_COLLECTION) {
      confirm(
        `普通会员同类别最大支持 ${APP_FREE_TRACK_COLLECTION} 人，是否用此用户替代先前的特别关注？`,
        () => {
          this.setSetting(key, [userName])
          info('已关注')
          return true
        }
      )
      return false
    }

    if (value.length > APP_ADVANCE_TRACK_COLLECTION) {
      confirm(
        `高级会员当前已满最大支持 ${APP_ADVANCE_TRACK_COLLECTION} 人，是否用此用户替代最早的特别关注？`,
        () => {
          value.pop()
          this.setSetting(key, value)
          info('已关注')
          return true
        }
      )
      return false
    }

    this.setSetting(key, value)
    info('已关注')
    return true
  }

  /** 取消追踪特定用户收藏相关信息 */
  cancelTrackUsersCollection = (userName: UserId, type: SubjectType = 'anime') => {
    const key = `comment${titleCase(type)}` as const
    const value = (this.setting[key] || []).filter(item => item !== userName)
    this.setSetting(key, value)
    info('已取消')
    return true
  }

  private _track = 0

  /** 内部统计 */
  track = (eventId: EventKeys) => {
    const key = 't'
    const value = this.state[key][eventId]
    this.setState({
      [key]: {
        [eventId]: (value || 0) + 1
      }
    })

    this._track += 1
    if (this._track % 10 === 0) this.save(key)
  }
}
