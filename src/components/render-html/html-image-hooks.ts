/*
 * @Author: czy0729
 * @Date: 2026-11-24 10:40:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-24 13:10:00
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { Image, StyleSheet } from 'react-native'

import type { ImageStyle, StyleProp } from 'react-native'
import type { HTMLImageProps } from './html-image'

const DEFAULT_IMAGES_INITIAL_DIMENSIONS = {
  width: 100,
  height: 100
}

/** 取 style / 宽高 props 中已有的尺寸 */
function getDimensionsFromStyle(
  style: StyleProp<ImageStyle>,
  height?: number | string,
  width?: number | string
): { styleWidth?: number | string; styleHeight?: number | string } {
  let styleWidth: number | string
  let styleHeight: number | string

  if (height) styleHeight = height
  if (width) styleWidth = width

  const flattened: ImageStyle = StyleSheet.flatten(style)
  if (!width && flattened?.width) styleWidth = flattened.width
  if (!height && flattened?.height) styleHeight = flattened.height

  return { styleWidth, styleHeight }
}

/** 百分比的尺寸保持字符串, 其余转为数值, 无法解析时保留原值 */
function parseDimension(value: number | string) {
  if (typeof value === 'string' && value.search('%') !== -1) return value

  const parsed = parseInt(String(value), 10)
  return Number.isNaN(parsed) ? value : parsed
}

/** 图片显示尺寸与加载失败状态 */
export function useImageSize({
  source,
  style,
  height,
  width,
  imagesMaxWidth,
  imagesInitialDimensions = DEFAULT_IMAGES_INITIAL_DIMENSIONS
}: HTMLImageProps) {
  const [size, setSize] = useState<{ width: number | string; height: number | string }>({
    width: imagesInitialDimensions.width,
    height: imagesInitialDimensions.height
  })
  const [error, setError] = useState(false)

  /** 卸载后丢弃回调, 不取消在途请求 */
  const unmountedRef = useRef(false)
  /** 在途请求的 uri, 同一 uri 不重复请求 */
  const inFlightRef = useRef<string | null>(null)
  /** 已落地的请求 key (uri + 最大宽度), 相同 key 不再请求 */
  const resolvedRef = useRef<string | null>(null)

  useEffect(() => {
    unmountedRef.current = false
    // 重挂载时清掉上一次的在途标记, 否则本次不会再发请求
    inFlightRef.current = null

    return () => {
      unmountedRef.current = true
    }
  }, [])

  /** 尺寸未变时不触发重渲染 */
  const applySize = useCallback((nextWidth: number | string, nextHeight: number | string) => {
    setSize(prev =>
      prev.width === nextWidth && prev.height === nextHeight
        ? prev
        : { width: nextWidth, height: nextHeight }
    )
  }, [])

  const uri = source.uri

  // 与原 componentWillReceiveProps 一致: 父级每次渲染都重新取尺寸
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const { styleWidth, styleHeight } = getDimensionsFromStyle(style, height, width)
    if (styleWidth && styleHeight) {
      applySize(parseDimension(styleWidth), parseDimension(styleHeight))
      return
    }

    if (!uri) {
      setError(true)
      return
    }

    // 同一 uri 与最大宽度已落地过, 不再重复请求; 处于错误态时仍重新请求
    const key = `${uri}\n${imagesMaxWidth ?? ''}`
    if (resolvedRef.current === key && !error) return
    if (inFlightRef.current === uri) return

    // 缺少尺寸时才请求原图尺寸
    inFlightRef.current = uri
    Image.getSize(
      uri,
      (originalWidth, originalHeight) => {
        if (inFlightRef.current === uri) inFlightRef.current = null
        if (unmountedRef.current || !originalWidth || !originalHeight) return

        resolvedRef.current = key
        if (!imagesMaxWidth) {
          applySize(originalWidth, originalHeight)
          return
        }

        const optimalWidth = imagesMaxWidth <= originalWidth ? imagesMaxWidth : originalWidth
        applySize(optimalWidth, (optimalWidth * originalHeight) / originalWidth)
        setError(false)
      },
      () => {
        if (inFlightRef.current === uri) inFlightRef.current = null
        // 失败后同地址再回到该实例位置时需要重新请求
        if (resolvedRef.current === key) resolvedRef.current = null
        if (!unmountedRef.current) setError(true)
      }
    )
  })

  return {
    ...size,
    error
  }
}
