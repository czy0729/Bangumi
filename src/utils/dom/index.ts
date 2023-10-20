/*
 * @Author: czy0729
 * @Date: 2023-04-14 17:37:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-20 17:46:37
 */
import { STORYBOOK } from '@constants/device'

export function isMobile() {
  const ua = navigator.userAgent.toLowerCase()
  const keywords = ['android', 'iphone', 'ipod', 'ipad', 'windows phone', 'mqqbrowser']
  return keywords.some(keyword => ua.indexOf(keyword) !== -1)
}

/** 开发环境下, 将各种常用方法注入 dom */
export function injectUtils() {
  /** @ts-ignore */
  if (!STORYBOOK && window?.CONFIG_TYPE !== 'DEVELOPMENT') return

  setTimeout(() => {
    /** @ts-ignore */
    window.app = {
      constants: {
        ...require('@constants')
      },
      utils: {
        ...require('@utils')
      },
      styles: {
        ...require('@styles')
      },
      stores: {
        ...require('@stores')
      }
    }
  }, 0)
}
