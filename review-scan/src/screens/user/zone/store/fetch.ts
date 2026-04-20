/*
 * @Author: czy0729
 * @Date: 2024-04-08 18:28:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-11 22:26:03
 */
import { rakuenStore, timelineStore, tinygrailStore, usersStore, userStore } from '@stores'
import { getTimestamp, omit, opitimize } from '@utils'
import { get, update } from '@utils/kv'
import { D7 } from '@constants'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 用户信息 (自己视角) */
  fetchUsersInfo = () => {
    return userStore.fetchUsersInfo(this.userId)
  }

  /** 装载云端数据 */
  fetchUsersFromOSS = async () => {
    if (this.users._loaded) return

    try {
      const data = await get(`zone_${this.userId}`)
      if (!data) {
        this.updateThirdParty()
        return
      }

      const { ts, ...users } = data
      const _loaded = getTimestamp()
      if (typeof users === 'object' && !Array.isArray(users)) {
        this.setState({
          users: {
            ...users,
            _loaded
          }
        })
      }

      if (_loaded - ts >= D7) this.updateThirdParty()
    } catch (error) {}
  }

  /** 用户信息 (他人视角) */
  fetchUsers = () => {
    return usersStore.fetchUsers({
      userId: this.userId
    })
  }

  /** 用户番剧信息 */
  fetchUserCollections = () => {
    return userStore.fetchUserCollections('anime', this.userId)
  }

  /** 用户时间胶囊 (60s) */
  fetchUsersTimeline = (refresh: boolean = false, force: boolean = false) => {
    if (!force && refresh && opitimize(this.usersTimeline, 60)) return this.usersTimeline

    return timelineStore.fetchUsersTimeline(
      {
        userId: this.userId,
        type: this.state.timelineType
      },
      refresh
    )
  }

  /** 用户历史帖子 */
  fetchUserTopicsFormCDN = () => {
    return rakuenStore.fetchUserTopicsFormCDN(this.usersInfo.username || this.usersInfo.id)
  }

  /** 小圣杯 / 用户资产 */
  fetchCharaAssets = () => {
    return tinygrailStore.fetchUserAssets(this.username)
  }

  /** 小圣杯 / 总圣殿数 */
  fetchTempleTotal = () => {
    return tinygrailStore.fetchTempleTotal(this.username)
  }

  /** 小圣杯 / 总人物数 */
  fetchCharaTotal = () => {
    return tinygrailStore.fetchCharaTotal(this.username)
  }

  /** 获取最近 */
  fetchRecent = async () => {
    const { username } = this.usersInfo
    if (!username) return

    const data: any = await get(`u_${username}`)
    this.setState({
      recent: {
        [username]: data?.ts ? getTimestamp() - Number(data.ts || 0) <= 60 * 60 * 30 : false
      }
    })
    this.save()
  }

  /** 上传预数据 */
  updateThirdParty = () => {
    setTimeout(() => {
      if (!this.userId || !this.users._loaded) return false

      update(`zone_${this.userId}`, {
        ...omit(this.users, ['recent', 'connectUrl', 'disconnectUrl', 'formhash', '_loaded'])
      })
    }, 10000)
  }
}
