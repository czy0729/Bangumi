/*
 * @Author: czy0729
 * @Date: 2023-04-23 15:15:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-09 18:26:29
 */
import { getTimestamp, info } from '@utils'
import { get } from '@utils/kv'
import { GITHUB_RELEASE_REPOS, IOS, VERSION_GITHUB_RELEASE } from '@constants'
import advanceJSON from '@assets/json/advance.json'
import { ResponseGHReleases, ResponseKVAdvance } from '@types'
import userStore from '../user'
import Computed from './compouted'

export default class Fetch extends Computed {
  /** 检查新版本 */
  fetchRelease = async () => {
    try {
      const data: ResponseGHReleases = await fetch(GITHUB_RELEASE_REPOS).then(response =>
        response.json()
      )
      const { name, assets = [] } = data
      const currentVersion = this.state.release.name || VERSION_GITHUB_RELEASE
      if (name !== currentVersion) {
        this.setState({
          release: {
            name,
            downloadUrl: assets?.[0]?.browser_download_url
          }
        })
        this.save('release')

        // iOS 不允许提示更新
        if (!IOS) {
          setTimeout(() => {
            info('有新版本, 可到设置里查看')
          }, 1600)
        }
      }
    } catch (error) {
      err('fetchRelease')
    }
  }

  /** 判断是否高级用户 */
  fetchAdvance = async () => {
    if (this.advance) return true

    const { myId, myUserId } = userStore
    if (!myId && !myUserId) return false

    try {
      let flag = false
      if (advanceJSON[myId] || advanceJSON[myUserId]) {
        flag = true
      } else {
        const data: ResponseKVAdvance = (await get('advance')) || {}
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
      err('fetchAdvance')
    }

    return false
  }

  /** 请求自己的打赏信息 */
  fetchAdvanceDetail = async () => {
    const { myId, myUserId } = userStore
    if (!myId && !myUserId) return false

    try {
      const data: ResponseKVAdvance = (await get('advance')) || {}
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
      err('fetchAdvanceDetail')
    }

    return 0
  }
}

function err(name: string, desc: string = 'catch error') {
  console.info('[@stores/system/fetch.ts]', name, desc)
}
