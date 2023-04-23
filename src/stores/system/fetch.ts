/*
 * @Author: czy0729
 * @Date: 2023-04-23 15:15:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-23 15:18:08
 */
import { getTimestamp, info } from '@utils'
import { xhrCustom } from '@utils/fetch'
import {
  GITHUB_ADVANCE,
  GITHUB_DATA,
  GITHUB_RELEASE_REPOS,
  IOS,
  VERSION_GITHUB_RELEASE
} from '@constants'
import UserStore from '../user'
import Computed from './compouted'

export default class Fetch extends Computed {
  /** 检查云端数据 */
  fetchOTA = async () => {
    let res: Promise<any>
    try {
      res = fetch(`${GITHUB_DATA}?t=${getTimestamp()}`).then(response =>
        response.json()
      )

      const ota = (await res) || {}
      this.setState({
        ota
      })
      this.save('ota')
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
        this.save('release')
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
        this.save(key)
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
      this.save(key)

      return data[myId] || data[myUserId]
    } catch (error) {
      return 0
    }
  }
}
