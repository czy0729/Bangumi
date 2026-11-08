/*
 * @Author: czy0729
 * @Date: 2025-02-19 07:51:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 11:40:00
 *
 * 数据请求: 错误上报事件与客户端信息
 */
import { usersStore } from '@stores'
import { getTimestamp, omit } from '@utils'
import { gets, update } from '@utils/kv'
import { axios } from '@utils/thirdParty'
import Computed from './computed'

import type { UserId } from '@types'

/** 错误上报事件 */
type RawEvent = {
  /** 事件类型 */
  __type?: string

  /** 会话 ID */
  sessionId?: string

  /** 系统 */
  os?: string

  /** 页面地址 */
  urlPath?: string

  /** 来源页面 */
  referrerDomain?: string

  /** 上报时间 */
  createdAt?: string
}

/** 客户端信息快照 */
type InfoValue = {
  /** 版本 */
  v?: string

  /** 是否管理员 */
  a?: boolean

  /** 数量 */
  n?: number

  /** 是否 IPA */
  ipa?: boolean

  /** 品牌 */
  b?: string

  /** 设备 */
  d?:
    | {
        /** 品牌 */
        brand?: string

        /** 型号 */
        name?: string
      }
    | string
}

export default class Fetch extends Computed {
  getData = async () => {
    const { url, authorization } = this.state
    if (!url || !authorization) return false

    const response = (await axios({
      url,
      headers: {
        Authorization: authorization
      }
    })) as {
      data?: {
        events?: RawEvent[]
        series?: Record<string, { y: number }[]>
      }
    }

    const data = response?.data?.events || []
    this.setState({
      data: {
        list: data
          .filter(item => item.__type === 'pageview')
          .map(item => ({
            i: item.sessionId || '',
            o: item.os || '',
            u: item.urlPath || '',
            r: item.referrerDomain || '',
            d: item.createdAt || ''
          }))
          .filter((item, index, self) => index === self.findIndex(t => t.u === item.u)),
        _loaded: getTimestamp()
      }
    })

    if (response?.data?.series) {
      const series = response.data.series
      const keys = Object.keys(series).sort((a, b) => a.localeCompare(b))
      if (keys.length) {
        this.setState({
          series: {
            a: series[keys[0]].map(item => item.y),
            // b: response.data[keys[1]],
            _loaded: getTimestamp()
          }
        })
        this.save()
      }
    }

    await this.getUsers()
    await this.getInfos()

    return true
  }

  private _hasGetUsers = {} as Record<string | number, true>

  getUsers = async () => {
    const { usersPrefixed, data, users } = this.state
    const prefix = usersPrefixed
    if (!prefix) return false

    const ids = [
      ...new Set(
        data.list
          .map(item => item.u.split('user/')?.[1])
          .filter(item => {
            if (!item || item === '0') return false
            if (users[item]?.n) return false
            if (this._hasGetUsers[item]) return false
            return true
          })
          .map(item => `${prefix}_${item}`)
      )
    ]
    if (!ids.length) return false

    const datas = await gets<{ avatar?: string; userName?: string }>(ids)
    if (datas) {
      const newUsers: typeof users = {}
      const now = getTimestamp()
      const nullIds: string[] = []
      Object.entries(datas).forEach(([key, value]) => {
        const id = key.replace(`${prefix}_`, '')
        if (value) {
          newUsers[id] = {
            a: value?.avatar,
            n: value?.userName,
            _loaded: now
          }
        } else {
          newUsers[id] = {
            _loaded: now
          }

          if (!this._hasGetUsers[id]) {
            nullIds.push(id)
            this._hasGetUsers[id] = true
          }
        }
      })

      this.setState({
        users: newUsers
      })
      this.save()

      if (nullIds.length) {
        for (let i = 0; i < nullIds.length; i += 1) {
          await this.fetchUsersThenPush(nullIds[i])
        }
      }
    }

    return true
  }

  fetchUsersThenPush = async (userId: UserId) => {
    await usersStore.fetchUsers(userId)
    const users = usersStore.users(userId)
    if (!users._loaded) return false

    const { usersPrefixed } = this.state
    const id = `${usersPrefixed}_${userId}`
    await update(
      id,
      {
        ...omit(users, ['recent', 'connectUrl', 'disconnectUrl', 'formhash', '_loaded'])
      },
      true,
      true
    )
    delete this._hasGetUsers[userId]

    return true
  }

  getInfos = async () => {
    const { infosPrefixed, data, infos } = this.state
    const prefix = infosPrefixed
    if (!prefix) return false

    const ids = [
      ...new Set(
        data.list
          .map(item => item.u.split('user/')?.[1])
          .filter(item => {
            if (!item || item === '0') return false
            if (item in infos) return false
            return true
          })
          .map(item => `${prefix}_${item}`)
      )
    ]
    if (!ids.length) return false

    const datas = await gets<InfoValue>(ids, ['v', 'a', 'n', 'ipa', 'b', 'd'])
    if (datas) {
      const newInfos: typeof infos = {}
      const now = getTimestamp()
      Object.entries(datas).forEach(([key, value]) => {
        const id = key.replace(`${prefix}_`, '')
        if (value) {
          let b = ''
          const device = value?.d
          if (typeof device === 'object' && device?.brand) {
            b = device.brand
            if (device.name) b += ` (${device.name})`
          } else if (value?.b) {
            b = value.b
            if (typeof device === 'string') b += ` (${device})`
          }

          newInfos[id] = {
            v: value?.v,
            a: value?.a,
            n: value?.n,
            i: value?.ipa,
            b,
            _loaded: now
          }
        } else {
          newInfos[id] = {
            _loaded: now
          }
        }
      })

      this.setState({
        infos: newInfos
      })
      this.save()
    }

    return true
  }

  getStats = async (u: string) => {
    const { url2, authorization, unitDay } = this.state
    if (!u || !url2 || !authorization) return false

    const now = new Date()
    const startAt = new Date(now)
    startAt.setDate(now.getDate() - Number(unitDay || 29))
    startAt.setHours(0, 0, 0, 0)

    const endAt = new Date(now)
    endAt.setHours(23, 59, 59, 999)

    const response = (await axios({
      url: `${url2}&url=${encodeURIComponent(
        u
      )}&unit=day&startAt=${startAt.getTime()}&endAt=${endAt.getTime()}`,
      headers: {
        Authorization: authorization
      }
    })) as { data?: Record<string, { y: number }[]> }
    if (response?.data) {
      const series = response.data
      const keys = Object.keys(series).sort((a, b) => a.localeCompare(b))
      if (keys.length) {
        this.setState({
          stats: {
            [u]: {
              a: series[keys[0]].map(item => item.y),
              // b: response.data[keys[1]],
              _loaded: getTimestamp()
            }
          }
        })
        this.save()
      }
    }
  }

  getStatsQueue = async () => {
    const { url2, authorization, data, stats, showTour, showDefault } = this.state
    if (!url2 || !authorization) return false

    const filterList = data.list.filter(item => {
      let flag = true
      if (!showTour || !showDefault) {
        const users = this.users(item.u)
        if (!showTour && !users?.n) flag = false
        if (!showDefault && !users?.a) flag = false
      }
      return flag
    })
    if (!filterList.length) return false

    for (let i = 0; i < filterList.length; i += 1) {
      const { u } = filterList[i]
      if (u in stats) continue

      const id = u.split('user/')?.[1] || ''
      if (!id || id === '0') continue

      await this.getStats(u)
    }

    return true
  }
}
