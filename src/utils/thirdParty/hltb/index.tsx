/*
 * @Author: czy0729
 * @Date: 2026-05-26 04:55:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-26 23:52:13
 */
import Constants from 'expo-constants'
import { logger } from '../../dev'
import { similar } from '../../utils'
import { HOST } from './ds'

import type { HltbGame, HltbResult, SearchToken } from './types'

let userAgent = ''
let searchToken: SearchToken
let searchTokenTS = 0

/** 通过游戏纯英文名查询游戏时长 */
export async function hltb(gameName: string): Promise<HltbResult | null> {
  if (!userAgent) userAgent = await Constants.getWebViewUserAgentAsync()

  try {
    const tokenData = await fetchSearchToken()
    if (!tokenData) return null

    const payload: Record<string, any> = {
      searchType: 'games',
      searchTerms: gameName.split(' '),
      searchPage: 1,
      size: 10,
      searchOptions: {
        games: {
          userId: 0,
          platform: '',
          sortCategory: 'popular',
          rangeCategory: 'main',
          rangeTime: { min: 0, max: 0 },
          gameplay: { perspective: '', flow: '', genre: '', difficulty: '' },
          rangeYear: { min: '', max: '' },
          modifier: ''
        },
        users: { sortCategory: 'postcount' },
        lists: { sortCategory: 'follows' },
        filter: '',
        sort: 0,
        randomizer: 0
      },
      useCache: true,
      [tokenData.hpKey]: tokenData.hpVal
    }

    logger.purple('@utils/thirdParty/hltb', 'hltb', { gameName })
    const resp = await fetch(`${HOST}/api/bleed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
        Origin: HOST,
        Referer: `${HOST}/`,
        'x-auth-token': tokenData.token,
        'x-hp-key': tokenData.hpKey,
        'x-hp-val': tokenData.hpVal
      },
      body: JSON.stringify(payload)
    })

    const data = await resp.json()
    if (!data?.data?.length) return null

    const gameStr = String(gameName).toLocaleLowerCase()
    let game = (data.data as HltbGame[]).find(
      g =>
        g.game_type === 'game' && similar(String(g.game_name).toLocaleLowerCase(), gameStr) >= 0.75
    )
    if (!game) {
      game = (data.data as HltbGame[]).find(
        g => g.game_type === 'game' && String(g.game_name).toLocaleLowerCase().startsWith(gameStr)
      )
    }
    if (!game) return null

    return {
      mainStory: formatDuration(game.comp_main),
      mainExtra: formatDuration(game.comp_plus),
      completionist: formatDuration(game.comp_100)
    }
  } catch {
    searchToken = null
    return null
  }
}

/** 获取搜索 token，60秒过期 */
async function fetchSearchToken(): Promise<SearchToken | null> {
  const now = Date.now()
  if (searchToken && now - searchTokenTS < 60_000) return searchToken

  const resp = await fetch(`${HOST}/api/bleed/init?t=${now}`, {
    headers: {
      'User-Agent': userAgent,
      Origin: HOST,
      Referer: `${HOST}/`
    }
  })

  const text = await resp.text()
  if (!text.startsWith('{')) return null

  const data = JSON.parse(text)
  searchToken = {
    token: data.token,
    hpKey: data.hpKey,
    hpVal: data.hpVal
  }
  searchTokenTS = now
  return searchToken
}

/** 将秒数转换为 "59.5h" 格式 */
function formatDuration(seconds: number): string {
  const hours = seconds / 3600
  const rounded = Math.round(hours * 10) / 10
  return `${rounded}h`
}
