/*
 * @Author: czy0729
 * @Date: 2026-05-26 06:29:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-26 16:22:21
 */
export type SearchToken = {
  token: string
  hpKey: string
  hpVal: string
}

export type HltbGame = {
  game_id: number
  game_name: string
  game_type: string
  comp_main: number
  comp_plus: number
  comp_100: number
}

export type HltbResult = {
  mainStory: string
  mainExtra: string
  completionist: string
}
