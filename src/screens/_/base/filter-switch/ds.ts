/*
 * @Author: czy0729
 * @Date: 2022-06-14 18:19:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 03:10:27
 */
import { rc } from '@utils/dev'
import { TEXT_TOTAL } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'FilterSwitch')

export const FLITER_SWITCH_LAST_PATH_KEY = '@screens|base|FilterSwitch'

export const FILTER_SWITCH_DS = ['番剧', '游戏', '漫画', '文库', 'ADV', 'Hentai'] as const

export const PATH_MAP = {
  番剧: 'Anime',
  游戏: 'Game',
  ADV: 'ADV',
  漫画: 'Manga',
  文库: 'Wenku',
  Hentai: 'Hentai'
} as const

export const TOTAL = TEXT_TOTAL
