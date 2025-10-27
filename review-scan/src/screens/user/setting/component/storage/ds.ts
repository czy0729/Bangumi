/*
 * @Author: czy0729
 * @Date: 2022-07-18 14:29:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 04:35:36
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Storage')

export const TEXTS = {
  clearStorage: {
    hd: '清除数据缓存',
    information: '推荐大于 10mb 或遇到数据不刷新等情况进行清除'
  },
  clearImages: {
    hd: '清除图片缓存'
  },
  clearAll: {
    hd: '清除全部缓存',
    information: '包括数据缓存和图片缓存'
  },
  iOSImageCache: {
    hd: 'iOS 使用系统默认图片缓存策略',
    information:
      '警告：此选项仅建议部分加载不到图片的 iOS 设备开启，若您的设备图片能正常加载请勿开启，开启后可能会导致图片每次都进行网络请求，切换后需要重新冷启动才能生效'
  }
} as const
