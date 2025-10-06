/*
 * @Author: czy0729
 * @Date: 2023-04-23 15:15:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-23 01:55:06
 */
import { getTimestamp, info } from '@utils'
import { D3, GITHUB_RELEASE_REPOS, IOS, VERSION_GITHUB_RELEASE } from '@constants'
import advanceJSON from '@assets/json/advance.json'
import { ResponseGHReleases } from '@types'
import userStore from '../user'
import Computed from './computed'
import { getData } from './utils'

export default class Fetch extends Computed {
  /** 检查新版本 */
  fetchRelease = async () => {
    const STATE_KEY = 'release'

    try {
      const data: ResponseGHReleases = await fetch(GITHUB_RELEASE_REPOS).then(response =>
        response.json()
      )
      const { name, assets = [] } = data
      const currentVersion = this.state.release.name || VERSION_GITHUB_RELEASE
      if (name !== currentVersion) {
        const lastLoaded = this.state.release._loaded || 0

        const now = getTimestamp()
        this.setState({
          [STATE_KEY]: {
            name,
            downloadUrl: assets?.[0]?.browser_download_url,
            _loaded: now
          }
        })
        this.save(STATE_KEY)

        // iOS 不允许提示更新
        if (!IOS && now - lastLoaded >= D3) {
          setTimeout(() => {
            info('有新版本, 可到设置里查看')
          }, 1600)
        }
      }
    } catch (error) {
      this.error('fetchRelease', error)
    }
  }

  /** 判断是否高级用户 */
  fetchAdvance = async () => {
    this.log('fetchAdvance')
    if (this.advance) return true

    const { myId, myUserId } = userStore
    if (!myId && !myUserId) return false

    try {
      let flag = false
      if (advanceJSON[myId] || advanceJSON[myUserId]) {
        flag = true
      } else {
        const data = await getData()
        if (data[myId] || data[myUserId]) flag = true
      }

      if (flag) {
        const key = 'advance'
        this.setState({
          [key]: true
        })
        this.save(key)

        return true
      }
    } catch (error) {
      this.error('fetchAdvance', error)
    }

    return false
  }

  /** 请求自己的打赏信息 */
  fetchAdvanceDetail = async () => {
    const { myId, myUserId } = userStore
    if (!myId && !myUserId) return false

    try {
      const data = await getData()
      console.log({
        data
      })

      const value = {
        ...advanceJSON,
        ...data,
        _loaded: getTimestamp()
      }

      const key = 'advanceDetail'
      this.setState({
        [key]: value
      })
      this.save(key)

      return value[myId] || value[myUserId]
    } catch (error) {
      this.error('fetchAdvanceDetail', error)
    }

    return 0
  }
}
