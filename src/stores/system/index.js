/*
 * @Author: czy0729
 * @Date: 2019-05-17 21:53:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-20 16:53:45
 */
import { observable, computed } from 'mobx'
import { getTimestamp } from '@utils'
import { xhrCustom } from '@utils/fetch'
import store from '@utils/store'
import { info } from '@utils/ui'
import { put, read } from '@utils/db'
import {
  DEV,
  IOS,
  GITHUB_DATA,
  GITHUB_RELEASE_REPOS,
  GITHUB_ADVANCE,
  VERSION_GITHUB_RELEASE
} from '@constants'
import {
  MODEL_SETTING_QUALITY,
  MODEL_SETTING_TRANSITION,
  MODEL_SETTING_INITIAL_PAGE,
  MODEL_SETTING_HOME_LAYOUT,
  MODEL_SETTING_HOME_SORTING
} from '@constants/model'
import UserStore from '../user'
import {
  NAMESPACE,
  INIT_SUBJECT_LAYOUT,
  INIT_SETTING,
  INIT_DEV_EVENT,
  INIT_RELEASE,
  INIT_IMAGE_VIEWER
} from './init'

class System extends store {
  state = observable({
    /**
     * 云端配置数据
     */
    ota: {},

    /**
     * 高级会员
     */
    advance: false,

    /**
     * 基本设置
     */
    setting: INIT_SETTING,

    /**
     * 发布版本
     */
    release: INIT_RELEASE,

    /**
     * 是否显示图片预览
     */
    imageViewer: INIT_IMAGE_VIEWER,

    /**
     * 是否wifi
     */
    wifi: false,

    /**
     * 是否开发环境
     */
    dev: false,

    /**
     * 是否显示埋点统计
     */
    devEvent: INIT_DEV_EVENT,

    /**
     * iOS首次进入, 观看用户产生内容需有同意规则选项, 否则不能过审
     */
    iosUGCAgree: false,

    /**
     * 用于标记APP启动后是否进入静止期
     */
    rendered: false,

    /**
     * 用于在bangumi-oss ota hash更新后, 强制刷新APP内所有封面
     */
    hashSubjectOTALoaded: 0
  })

  init = async () => {
    await this.readStorage(
      ['ota', 'advance', 'setting', 'release', 'dev', 'devEvent', 'iosUGCAgree'],
      NAMESPACE
    )

    // 检查新版本
    this.fetchOTA()
    if (!DEV) {
      setTimeout(() => {
        this.fetchRelease()
      }, 4000)
    }

    setTimeout(() => {
      this.setState({
        rendered: true
      })
    }, 10000)

    return true
  }

  // -------------------- get --------------------
  @computed get isUGCAgree() {
    return true
  }

  // -------------------- fetch --------------------
  /*
   * 检查云端数据
   */
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
    } catch (error) {
      // do nothing
    }
    return res
  }

  /*
   * 检查新版本
   */
  fetchRelease = async () => {
    let res
    try {
      res = fetch(GITHUB_RELEASE_REPOS).then(response => response.json())
      const data = await res

      const { name: githubVersion, assets = [] } = data[0]
      const { browser_download_url: downloadUrl } = assets[0]
      const { name: currentVersion } = this.state.release
      if (githubVersion !== (currentVersion || VERSION_GITHUB_RELEASE)) {
        // iOS不允许提示更新
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
    } catch (error) {
      // do nothing
    }
    return res
  }

  /**
   * 判断是否高级用户
   */
  fetchAdvance = async () => {
    // 永久性质
    if (this.advance) {
      return true
    }

    if (!UserStore.myId) {
      return false
    }

    try {
      const { _response } = await xhrCustom({
        url: `${GITHUB_ADVANCE}?t=${getTimestamp()}`
      })
      const advanceUserMap = JSON.parse(_response)

      if (advanceUserMap[UserStore.myId]) {
        const key = 'advance'
        this.setState({
          advance: true
        })
        this.setStorage(key, undefined, NAMESPACE)
      }
    } catch (error) {
      warn(NAMESPACE, 'fetchAdvance', error)
    }
    return true
  }

  // -------------------- page --------------------
  /**
   * 设置`图片质量`
   */
  setQuality = label => {
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

  /**
   * 设置`切页动画`
   */
  setTransition = label => {
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

  /**
   * 设置`启动页`
   */
  setInitialPage = label => {
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

  /**
   * 设置`首页布局`
   */
  setHomeLayout = label => {
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

  /**
   * 设置`首页排序`
   */
  setHomeSorting = label => {
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

  /**
   * 切换
   */
  switchSetting = switchKey => {
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        [switchKey]: !this.setting[switchKey]
      }
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /**
   * 对指定设置直接赋值 (暂用于永久隐藏条目页面板块)
   */
  setSetting = (switchKey, value = true) => {
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        [switchKey]: value
      }
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /**
   * 条目页面重置布局
   */
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

  /**
   * 恢复默认设置
   */
  resetSetting = () => {
    const key = 'setting'
    this.setState({
      [key]: INIT_SETTING
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /**
   * 上传当前设置到云端
   */
  uploadSetting = () => {
    const { id } = UserStore.userInfo
    return put({
      path: `setting/${id}.json`,
      content: JSON.stringify(this.setting)
    })
  }

  /**
   * 恢复到云端的设置
   */
  downloadSetting = async () => {
    const { id } = UserStore.userInfo
    const { content } = await read({
      path: `setting/${id}.json`
    })

    if (!content) {
      return false
    }

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

  /**
   * 显示ImageViewer
   * @param {*} imageUrls Image Source
   */
  showImageViewer = (imageUrls = [], index) => {
    this.setState({
      imageViewer: {
        visible: true,
        imageUrls,
        index
      }
    })
  }

  /**
   * 隐藏ImageViewer
   */
  closeImageViewer = () => {
    this.setState({
      imageViewer: INIT_IMAGE_VIEWER
    })
  }

  /**
   * 切换开发模式
   */
  toggleDev = () => {
    const { dev } = this.state
    const key = 'dev'
    this.setState({
      [key]: !dev
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /**
   * 切换显示埋点统计
   */
  toggleDevEvent = (value = 'enabled') => {
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

  /**
   * 同意社区指导原则
   */
  updateUGCAgree = value => {
    const key = 'iosUGCAgree'
    this.setState({
      [key]: value
    })
    this.setStorage(key, undefined, NAMESPACE)
  }
}

const Store = new System()
Store.setup()

export default Store
