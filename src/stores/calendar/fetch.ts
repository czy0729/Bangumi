/*
 * @Author: czy0729
 * @Date: 2023-04-24 14:05:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-21 00:07:37
 */
import { getTimestamp, HTMLTrim } from '@utils'
import { fetchHTML, xhrCustom } from '@utils/fetch'
import { API_CALENDAR, CDN_DISCOVERY_HOME, CDN_ONAIR, HOST } from '@constants'
import { cheerioFeaturedItems, cheerioRaw, cheerioToday } from './common'
import Computed from './computed'
import { INIT_HOME, NAMESPACE } from './init'
import { fixedOnAir } from './utils'

import type { Home, OnAir } from './types'

export default class Fetch extends Computed {
  /** 发现页信息聚合 */
  fetchHome = async () => {
    const data: Home = {
      anime: [],
      game: [],
      book: [],
      music: [],
      real: [],
      today: '今日上映 - 部。共 - 人收看今日番组。',
      _loaded: getTimestamp()
    }

    try {
      const html = HTMLTrim(
        await fetchHTML({
          url: `!${HOST}`
        })
      )

      const itemsHTML = html.match(/<ul id="featuredItems" class="featuredItems">(.+?)<\/ul>/)
      if (itemsHTML) {
        try {
          Object.assign(data, cheerioFeaturedItems(itemsHTML[1]))
        } catch {}
      }

      const todayHTML = html.match('<li class="tip">(.+?)</li>')
      if (todayHTML) data.today = cheerioToday(`<li>${todayHTML[1]}</li>`)
    } catch {}

    if (data.anime?.length) {
      const STATE_KEY = 'home'
      this.setState({
        [STATE_KEY]: data
      })
      this.save(STATE_KEY)
    }

    return data
  }

  /** @deprecated 发现页信息聚合 (CDN) */
  fetchHomeFromCDN = async () => {
    try {
      const { _response } = await xhrCustom({
        url: CDN_DISCOVERY_HOME()
      })

      const data = {
        ...INIT_HOME,
        ...JSON.parse(_response)
      }
      const key = 'homeFromCDN'
      this.setState({
        [key]: {
          ...data,
          _loaded: getTimestamp()
        }
      })

      return data
    } catch (error) {
      return INIT_HOME
    }
  }

  /** 每日放送 */
  fetchCalendar = () => {
    return this.fetch(
      {
        url: API_CALENDAR(),
        info: '每日放送'
      },
      'calendar',
      {
        list: true,
        storage: true,
        namespace: NAMESPACE
      }
    )
  }

  private _fetchOnAir = false

  /** onAir 数据, 数据不会经常变化, 所以一个启动周期只请求一次 */
  fetchOnAir = async (refresh: boolean = false) => {
    if (!refresh && this._fetchOnAir) return

    try {
      let onAir = []

      try {
        const { _response } = await xhrCustom({
          url: CDN_ONAIR()
        })
        onAir = JSON.parse(_response)
      } catch {}

      const data = {
        _loaded: getTimestamp()
      } as OnAir

      onAir.forEach(item => {
        data[item.id] = {
          timeCN: item.timeCN,
          timeJP: item.timeJP,
          weekDayCN: item.weekDayCN,
          weekDayJP: item.weekDayJP,
          air: 0
        }

        // 计算当前放送到多少集
        const airEps = item.eps.filter(
          (item: { status: string }) => item.status === 'Air' || item.status === 'Today'
        )
        if (airEps.length) data[item.id].air = airEps[airEps.length - 1].sort
      })

      const key = 'onAir'
      this.clearState(key, fixedOnAir(data))
      this.save(key)
      this._fetchOnAir = true
    } catch {}
  }

  fetchRaw = async () => {
    const { _response } = await xhrCustom({
      url: 'https://yuc.wiki/202604'
    })
    const data = cheerioRaw(_response)
    this.log('fetchRaw', data)
  }
}
