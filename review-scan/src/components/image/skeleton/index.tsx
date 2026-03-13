/*
 * @Author: czy0729
 * @Date: 2023-04-12 09:06:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 05:03:31
 */
import React, { useEffect, useRef, useState } from 'react'
import { useObserver } from 'mobx-react'
import { _, systemStore } from '@stores'
import { WEB } from '@constants'
import { TimerRef } from '@types'
import { Skeleton as SkeletonComp } from '../../skeleton'

/** 永久缓存已加载的 uri，避免重复显示骨架屏 */
const loadedUriCache = new Map<string, boolean>()

function Skeleton({ style, uri, type, textOnly, placeholder, loaded }) {
  const [showSkeleton, setShowSkeleton] = useState(true)
  const timeoutRef = useRef<TimerRef>(null)

  // 判断是否应该跳过骨架屏
  const shouldSkipSkeleton =
    !systemStore.setting.imageSkeleton ||
    WEB ||
    textOnly ||
    !placeholder ||
    loaded ||
    loadedUriCache.has(String(uri))

  useEffect(() => {
    if (shouldSkipSkeleton) return

    timeoutRef.current = setTimeout(() => {
      setShowSkeleton(false)
      loadedUriCache.set(String(uri), true)
    }, 6400)

    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current)
    }
  }, [shouldSkipSkeleton, uri])

  return useObserver(() => {
    if (shouldSkipSkeleton || !showSkeleton) return null

    const { width, height } = _.flatten(style)
    return <SkeletonComp type={type} width={width} height={height} />
  })
}

export default Skeleton
