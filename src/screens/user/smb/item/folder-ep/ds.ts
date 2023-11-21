/*
 * @Author: czy0729
 * @Date: 2023-11-20 05:24:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-20 06:27:53
 */
export const ACTION_LINKING = '外部跳转'

export const ACTION_COPY_LINK = '复制跳转链接'

export const ACTION_OPEN_DIRECTORY = '打开目录'

export const ACTION_DDPLAY = '弹弹play'

export const ACTION_VLC = 'VLC'

export const EP_ACTIONS = [
  ACTION_LINKING,
  ACTION_COPY_LINK,
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
