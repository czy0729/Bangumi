/*
 * @Author: czy0729
 * @Date: 2019-05-17 21:53:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-18 20:04:59
 */
import { NetInfo } from 'react-native'
import { observable, computed } from 'mobx'
import store from '@utils/store'
import { info } from '@utils/ui'
import { log } from '@utils/dev'
import { GITHUB_RELEASE_REPOS_URL, GITHUB_RELEASE_VERSION } from '@constants'
import { MODEL_SETTING_QUALITY } from '@constants/model'

const namespace = 'System'
const initSetting = {
  quality: MODEL_SETTING_QUALITY.getValue('默认'), // 图片质量
  cnFirst: true, // 是否中文优先
  autoFetch: true, // 切换页面自动请求
  quote: true, // 帖子展开引用
  speech: true // Bangumi娘话语
}
const initRelease = {
  name: GITHUB_RELEASE_VERSION,
  downloadUrl: ''
}
const initImageViewer = {
  visible: false,
  imageUrls: []
}

class System extends store {
  state = observable({
    setting: initSetting,
    release: initRelease,
    wifi: false,
    imageViewer: initImageViewer,
    dev: false
  })

  async init() {
    let res
    res = Promise.all([
      this.getStorage('setting', namespace),
      this.getStorage('release', namespace)
    ])
    const state = await res
    this.setState({
      setting: state[0] || initSetting,
      release: state[1] || initRelease
    })

    res = NetInfo.getConnectionInfo()
    const { type } = await res
    if (type === 'wifi') {
      this.setState({
        wifi: true
      })
    }

    // 检查新版本
    this.fetchRelease()

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

  // -------------------- fetch --------------------
  /*
   * 检查新版本
   */
  fetchRelease = async () => {
    let res
    try {
      log('检查新版本', GITHUB_RELEASE_REPOS_URL)
      res = fetch(GITHUB_RELEASE_REPOS_URL).then(response => response.json())
      const data = await res

      const { name: githubVersion, assets = [] } = data[0]
      const { browser_download_url: downloadUrl } = assets[0]
      const { name: currentVersion } = this.state.release
      if (githubVersion !== (currentVersion || GITHUB_RELEASE_VERSION)) {
        setTimeout(() => {
          // Alert.alert('发现新版本', '是否下载', [
          //   {
          //     text: '取消',
          //     style: 'cancel'
          //   },
          //   {
          //     text: '确定',
          //     onPress: () => appNavigate(GITHUB_RELEASE_URL)
          //   }
          // ])
          info('有新版本, 可到设置里下载')
        }, 1600)

        const release = {
          name: githubVersion,
          downloadUrl
        }
        this.setState({
          release
        })
        this.setStorage('release', undefined, namespace)
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
      this.setStorage(key, undefined, namespace)
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
    this.setStorage(key, undefined, namespace)
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
    this.setStorage(key, undefined, namespace)
  }

  /**
   * 切换`帖子展开引用`
   */
  switchQuote = () => {
    const { quote } = this.setting
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        quote: !quote
      }
    })
    this.setStorage(key, undefined, namespace)
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
    this.setStorage(key, undefined, namespace)
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
      imageViewer: initImageViewer
    })
  }

  toggleDev = () => {
    const { dev } = this.state
    this.setState({
      dev: !dev
    })
  }
}

export default new System()
