/*
 * @Author: czy0729
 * @Date: 2025-02-19 07:51:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-23 04:36:08
 */
import { usersStore } from '@stores'
import { getTimestamp, omit } from '@utils'
import { gets, update } from '@utils/kv'
import axios from '@utils/thirdParty/axios'
import { UserId } from '@types'
import Computed from './computed'

export default class Fetch extends Computed {
  getData = async () => {
    const { url, authorization } = this.state
    if (!url || !authorization) return false

    // @ts-expect-error
    const response = await axios({
      url,
      headers: {
        Authorization: authorization
      }
    })

    const data = response?.data?.events || []
    this.setState({
      data: {
        list: data
          .filter((item: any) => item.__type === 'pageview')
          .map((item: any) => ({
            i: item.sessionId,
            o: item.os,
            u: item.urlPath,
            r: item.referrerDomain,
            d: item.createdAt
          }))
          .filter(
            (item: { u: any }, index: any, self: any[]) =>
              index === self.findIndex(t => t.u === item.u)
          ),
        _loaded: getTimestamp()
      }
    })

    if (response?.data?.series) {
      const keys = Object.keys(response.data.series).sort((a, b) => a.localeCompare(b))
      this.setState({
        series: {
          a: response.data.series[keys[0]].map(item => item.y),
          // b: response.data[keys[1]],
          _loaded: getTimestamp()
        }
      })
      this.save()
    }

    await this.getUsers()
    await this.getInfos()

    return true
  }

  private _hasGetUsers = {} as Record<any, true>

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

    const datas = await gets(ids)
    if (datas) {
      const newUsers: typeof users = {}
      const now = getTimestamp()
      const nullIds = []
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
    await usersStore.fetchUsers({
      userId
    })
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

    const datas = await gets(ids, ['v', 'a', 'n', 'ipa', 'b', 'd'])
    if (datas) {
      const newInfos: typeof infos = {}
      const now = getTimestamp()
      Object.entries(datas).forEach(([key, value]) => {
        const id = key.replace(`${prefix}_`, '')
        if (value) {
          let b = ''
          if (value?.d?.brand) {
            b = value.d.brand
            if (value.d.name) b += ` (${value.d.name})`
          } else if (value?.b) {
            b = value.b
            if (value.d) b += ` (${value.d})`
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

    // @ts-expect-error
    const response = await axios({
      url: `${url2}&url=${encodeURIComponent(
        u
      )}&unit=day&startAt=${startAt.getTime()}&endAt=${endAt.getTime()}`,
      headers: {
        Authorization: authorization
      }
    })
    if (response?.data) {
      const keys = Object.keys(response.data).sort((a, b) => a.localeCompare(b))
      this.setState({
        stats: {
          [u]: {
            a: response.data[keys[0]].map(item => item.y),
            // b: response.data[keys[1]],
            _loaded: getTimestamp()
          }
        }
      })
      this.save()
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
