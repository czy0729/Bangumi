/*
 * @Author: czy0729
 * @Date: 2025-02-19 07:51:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-20 05:59:24
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
          })),
        _loaded: getTimestamp()
      }
    })

    await this.getUsers()
    await this.getInfos()

    return true
  }

  private _hasGetUsers = {} as Record<any, true>

  getUsers = async () => {
    const { usersPrefixed, data, users } = this.state
    const prefix = usersPrefixed
    if (!prefix) return false

    const datas = await gets(
      [
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
      ],
      ['avatar', 'userName']
    )

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

    const datas = await gets(
      [
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
      ],
      ['v', 'a', 'n', 'ipa', 'b', 'd']
    )

    if (datas) {
      const newInfos: typeof infos = {}
      const now = getTimestamp()
      Object.entries(datas).forEach(([key, value]) => {
        const id = key.replace(`${prefix}_`, '')
        if (value) {
          newInfos[id] = {
            v: value?.v,
            a: value?.a,
            n: value?.n,
            i: value?.ipa,
            b: value?.d?.brand || value?.b || value?.d || '',
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
}
