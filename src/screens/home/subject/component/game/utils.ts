/*
 * @Author: czy0729
 * @Date: 2026-05-26 22:50:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-26 22:51:05
 */
import { otaStore } from '@stores'
import { formatPlaytime } from '@utils'
import { HOST_AC_SEARCH } from '@constants'

import type { SubjectId } from '@types'

export function getGameInfo(subjectId: SubjectId, isADV: boolean) {
  if (isADV) {
    const adv = otaStore.adv(subjectId)
    return {
      title: adv.title || '',
      tag: [] as string[],
      platform: [] as string[],
      time: adv.date || '',
      timeCn: '',
      dev: adv.dev || '',
      publish: '' as string | string[],
      playtime: adv.time ? formatPlaytime(adv.time) : '',
      zhCn: !!adv.cn
    }
  }

  const game = otaStore.game(subjectId)
  return {
    title: game.t || '',
    tag: game.ta || [],
    platform: game.pl || [],
    time: game.en || '',
    timeCn: game.cn || '',
    dev: game.d || '',
    publish: game.p || '',
    playtime: '',
    zhCn: false
  }
}

export function getDevelopers(dev: string | string[]) {
  return ([] as string[])
    .concat(dev || [])
    .map(s => String(s).trim())
    .filter(Boolean)
}

export function getPublishers(publish: string | string[]) {
  return ([] as string[])
    .concat(publish || [])
    .map(s => String(s).trim())
    .filter(Boolean)
}

export function getVideoSearchUrl(title: string, isADV: boolean) {
  return `${HOST_AC_SEARCH}/all?keyword=${encodeURIComponent(title)}%20${
    isADV ? 'OP' : 'PV'
  }&order=totalrank&duration=1&tids_1=4`
}
