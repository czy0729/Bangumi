/*
 * @Author: czy0729
 * @Date: 2022-07-18 14:29:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-02 00:53:02
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Storage')

export const TEXTS = {
  clearStorage: {
    hd: '清除数据缓存',
    information:
      '推荐大于 10mb 或遇到不刷新等情况进行清除\n大于 20mb 可能会显著增加启动时间，并且可能会导致频繁大量写入储存'
  },
  clearImages: {
    hd: '清除图片缓存'
  },
  clearAll: {
    hd: '清除全部缓存',
    information: '包括数据缓存和图片缓存'
  }
} as const
