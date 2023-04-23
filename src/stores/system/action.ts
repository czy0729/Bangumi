/*
 * @Author: czy0729
 * @Date: 2023-04-23 15:18:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-23 15:20:01
 */
import { confirm, info, titleCase } from '@utils'
import { put, read } from '@utils/db'
import {
  ADVANCE_CDN,
  MODEL_SETTING_CDN_ORIGIN,
  MODEL_SETTING_HOME_COUNT_VIEW,
  MODEL_SETTING_HOME_LAYOUT,
  MODEL_SETTING_HOME_SORTING,
  MODEL_SETTING_INITIAL_PAGE,
  MODEL_SETTING_QUALITY,
  MODEL_SETTING_TRANSITION,
  MODEL_SETTING_USER_GRID_NUM
} from '@constants'
import {
  SettingCDNOrigin,
  SettingHomeCountView,
  SettingHomeCountViewCn,
  SettingHomeLayout,
  SettingHomeLayoutCn,
  SettingHomeSorting,
  SettingHomeSortingCn,
  SettingInitialPage,
  SettingInitialPageCn,
  SettingQuality,
  SettingQualityCn,
  SettingTransition,
  SettingTransitionCn,
  SettingUserGridNum,
  SettingUserGridNumCn,
  SubjectType,
  UserId
} from '@types'
import UserStore from '../user'
import Fetch from './fetch'
import { INIT_IMAGE_VIEWER, INIT_SETTING, INIT_SUBJECT_LAYOUT } from './init'

export default class Actions extends Fetch {
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
    const quality = MODEL_SETTING_QUALITY.getValue<SettingQuality>(label)
    if (quality) {
      const key = 'setting'
      this.setState({
        [key]: {
          ...this.setting,
          quality
        }
      })
      this.save(key)
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
    const homeCountView =
      MODEL_SETTING_HOME_COUNT_VIEW.getValue<SettingHomeCountView>(label)
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
  switchSetting = (switchKey: keyof typeof INIT_SETTING) => {
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        [switchKey]: !this.setting[switchKey]
      }
    })
    this.save(key)
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
    this.save(key)
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

  /** 恢复默认设置 */
  resetSetting = () => {
    const key = 'setting'
    this.setState({
      [key]: INIT_SETTING
    })
    this.save(key)
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
    this.save(key)
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

    if (!this.advance && value.length > 1) {
      confirm('非高级会员同类别最大支持 1 人，是否用此用户替代先前的特别关注？', () => {
        this.setSetting(key, [userName])
        info('已关注')
        return true
      })
      return false
    }

    if (value.length > 5) {
      confirm(
        '高级会员同类别最大支持 5 人，当前已满 5 人，是否用此用户替代最早的特别关注？',
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
    this.setSetting(`comment${titleCase(type)}`, value)
    info('已取消')
    return true
  }
}
