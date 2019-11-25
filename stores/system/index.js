/*
 * @Author: czy0729
 * @Date: 2019-05-17 21:53:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-25 18:35:04
 */
import { NetInfo } from 'react-native'
import { observable, computed } from 'mobx'
import store from '@utils/store'
import { info } from '@utils/ui'
import { log } from '@utils/dev'
import {
  IOS,
  GITHUB_RELEASE_REPOS_URL,
  GITHUB_RELEASE_VERSION
} from '@constants'
import { MODEL_SETTING_QUALITY } from '@constants/model'
import {
  NAMESPACE,
  INIT_SETTING,
  INIT_RELEASE,
  INIT_IMAGE_VIEWER
} from './init'

class System extends store {
  state = observable({
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
     * iOS首次进入, 观看用户产生内容需有同意规则选项, 否则不能过审
     */
    iosUGCAgree: false
  })

  init = async () => {
    await this.readStorageThenSetState(
      {
        setting: INIT_SETTING,
        release: INIT_RELEASE,
        iosUGCAgree: false
      },
      NAMESPACE
    )

    const res = NetInfo.getConnectionInfo()
    const { type } = await res
    if (type === 'wifi') {
      this.setState({
        wifi: true
      })
    }

    // 检查新版本
    setTimeout(() => {
      this.fetchRelease()
    }, 4000)

    return res
  }

  // -------------------- get --------------------
  @computed get setting() {
    return this.state.setting
  }

  @computed get release() {
    return this.state.release
  }

  @computed get isWifi() {
    return this.state.wifi
  }

  @computed get imageViewer() {
    return this.state.imageViewer
  }

  @computed get isUGCAgree() {
    if (!IOS) {
      return true
    }
    return this.state.iosUGCAgree
  }

  // -------------------- fetch --------------------
  /*
   * 检查新版本
   */
  fetchRelease = async () => {
    let res
    try {
      res = fetch(GITHUB_RELEASE_REPOS_URL).then(response => response.json())
      const data = await res

      const { name: githubVersion, assets = [] } = data[0]
      const { browser_download_url: downloadUrl } = assets[0]
      const { name: currentVersion } = this.state.release
      if (githubVersion !== (currentVersion || GITHUB_RELEASE_VERSION)) {
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
   * 切换`中文优先`
   */
  switchCnFirst = () => {
    const { cnFirst } = this.setting
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        cnFirst: !cnFirst
      }
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /**
   * 切换`切换页面自动请求`
   */
  switchAutoFetch = () => {
    const { autoFetch } = this.setting
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        autoFetch: !autoFetch
      }
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /**
   * 切换`小圣杯`
   */
  switchTinygrail = () => {
    const { tinygrail } = this.setting
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        tinygrail: !tinygrail
      }
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /**
   * 切换`圆形头像`
   */
  switchAvatarRound = () => {
    const { avatarRound } = this.setting
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        avatarRound: !avatarRound
      }
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /**
   * 切换`Bangumi娘话语`
   */
  switchSpeech = () => {
    const { speech } = this.setting
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        speech: !speech
      }
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /**
   * 切换`章节热力图`
   */
  switchHeatMap = () => {
    const { heatMap } = this.setting
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        heatMap: !heatMap
      }
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /**
   * 显示ImageViewer
   * @param {*} imageUrls Image Source
   */
  showImageViewer = (imageUrls = []) => {
    this.setState({
      imageViewer: {
        visible: true,
        imageUrls
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
    this.setState({
      dev: !dev
    })
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

export default new System()
