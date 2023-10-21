/*
 * @Author: czy0729
 * @Date: 2023-04-14 17:37:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-21 05:06:06
 */
import { useRef } from 'react'
import { STORYBOOK } from '@constants/device'
import { Fn } from '@types'

/** 是否手机环境 */
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

/** 尝试把页面中唯一的列表滚动到顶 */
export function scrollToTop() {
  setTimeout(() => {
    try {
      document.querySelector('main.component-page div.component-scrollview').scrollTo({
        // @ts-ignore
        x: 0,
        y: 0,
        animated: true
      })
    } catch (error) {}
  }, 0)
}

/** 双击钩子 */
export function useDoubleTap(callback: Fn = () => {}, delay: number = 300) {
  const tapRef = useRef(false)
  const timerRef = useRef(null)

  function handleTouchStart() {
    if (!tapRef.current) {
      // 如果是第一次触摸，则设置 tapRef.current = true 并开启定时器
      tapRef.current = true
      timerRef.current = setTimeout(() => {
        // 定时器结束时，重置 tapRef.current 和计时器
        tapRef.current = false
        clearTimeout(timerRef.current)
        timerRef.current = null
      }, delay)
    } else {
      // 如果正在计时中，说明是双击事件，清空定时器并执行回调函数
      clearTimeout(timerRef.current)
      timerRef.current = null
      callback()
      // 双击后也需要重置 tapRef.current
      tapRef.current = false
    }
  }

  return handleTouchStart
}
