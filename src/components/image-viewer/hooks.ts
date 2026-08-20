/*
 * @Author: czy0729
 * @Date: 2026-08-14 19:27:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-20 04:47:29
 */
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { toJS } from 'mobx'
import { open, showActionSheet } from '@utils'
import { logger } from '@utils/dev'
import { HOST_DOGE, IOS } from '@constants'
import { getCurrentUrl, getProxyImageUrls } from './utils'
import { ACTION_SHEET_DS, COMPONENT } from './ds'

import type { ImageUrl } from './types'

/** 图片地址先剥离 observable 再统一套代理, 并按数组引用缓存 (防止父组件每次渲染传入新数组导致图片重置) */
export function useImageUrlProxy(imageUrls: ImageUrl[]): ImageUrl[] {
  return useMemo(() => getProxyImageUrls(toJS(imageUrls)), [imageUrls])
}

/** 首次打开时输出调试日志 */
export function useImageVisibleLog(visible: boolean, proxyImageUrls: ImageUrl[]) {
  const prevVisible = useRef(false)
  useEffect(() => {
    if (visible && !prevVisible.current) {
      logger.success(COMPONENT, { urls: proxyImageUrls })
    }
    prevVisible.current = visible
  }, [visible, proxyImageUrls])
}

/** 长按菜单: 浏览器打开图片 (安卓先关闭 Viewer 避免 ActionSheet 被遮住) */
export function useImageMenus(proxyImageUrls: ImageUrl[], index: number, onCancel: () => void) {
  const handleRenderMenus = useCallback((url: string, cancel: () => void): null => {
    if (typeof url === 'string' && url.includes(HOST_DOGE)) return null

    if (IOS) {
      // 不想涉及到权限问题, 暂时用浏览器打开图片来处理
      showActionSheet(ACTION_SHEET_DS, i => {
        if (i === 0) open(url)
      })
    } else {
      // @issue 安卓的 ActionSheet 在这个 Viewer 的下面
      cancel?.()
      showActionSheet(ACTION_SHEET_DS, i => {
        if (i === 0) open(url)
      })
    }
    return null
  }, [])

  const handleMenus = useCallback(() => {
    const currentUrl = getCurrentUrl(proxyImageUrls, index)
    return handleRenderMenus(currentUrl, onCancel)
  }, [proxyImageUrls, index, handleRenderMenus, onCancel])

  return handleMenus
}
