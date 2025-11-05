/*
 * @Author: czy0729
 * @Date: 2023-11-20 05:24:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-22 09:25:16
 */
import { URL_DDPLAY, URL_MPV, URL_POTPLAYRER, URL_VLC } from '../../form/ds'

export const ACTION_LINKING = '外部跳转'

export const ACTION_COPY_LINK = '复制外部跳转链接'

export const ACTION_COPY_PATH = '复制完整路径'

export const ACTION_OPEN_DIRECTORY = '打开文件夹'

export const ACTION_DDPLAY = '弹弹Play'

export const ACTION_POTPLAYER = 'PotPlayer'

export const ACTION_VLC = 'VLC'

export const ACTION_MPV = 'MPV'

export const URL_TEMPLATES = {
  [ACTION_DDPLAY]: URL_DDPLAY,
  [ACTION_POTPLAYER]: URL_POTPLAYRER,
  [ACTION_VLC]: URL_VLC,
  [ACTION_MPV]: URL_MPV
} as const

export const EP_ACTIONS = [
  ACTION_LINKING,
  ACTION_COPY_LINK,
  ACTION_COPY_PATH,
  // ACTION_OPEN_DIRECTORY,
  ACTION_DDPLAY,
  ACTION_VLC
] as const

export const EPS_TYPE_COUNT = {
  ep: 0,
  mov: 0,
  ova: 0,
  oad: 0,
  sp: 0,
  op: 0,
  ed: 0,
  other: 0
} as const
