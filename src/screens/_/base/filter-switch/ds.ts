/*
 * @Author: czy0729
 * @Date: 2022-06-14 18:19:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-20 16:45:13
 */
export const FLITER_SWITCH_LAST_PATH_KEY = '@screens|base|FilterSwitch'

export const FILTER_SWITCH_DS = ['番剧', '游戏', '漫画', '文库', 'Hentai'] as const

export const PATH_MAP = {
  番剧: 'Anime',
  漫画: 'Manga',
  游戏: 'Game',
  文库: 'Wenku',
  Hentai: 'Hentai'
} as const

export const TOTAL = {
  番剧: 3268,
  游戏: 2721,
  文库: 2740
} as const
