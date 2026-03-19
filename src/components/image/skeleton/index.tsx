/*
 * @Author: czy0729
 * @Date: 2023-04-12 09:06:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 15:15:00
 */
import React, { useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react'
import { _, systemStore } from '@stores'
import { WEB } from '@constants'
import { Skeleton as SkeletonComp } from '../../skeleton'

/** 永久缓存已加载的 uri，避免重复显示骨架屏 */
const loadedUriCache = new Map<string, boolean>()

function Skeleton({ style, uri, type, textOnly, placeholder, loaded }) {
  const [showSkeleton, setShowSkeleton] = useState(true)

  const layout = useMemo(() => {
    const flattened = _.flatten(style) || {}
    return {
      width: flattened.width,
      height: flattened.height
    }
  }, [style])
  const uriStr = String(uri)

  // 判断是否应该跳过骨架屏
  const shouldSkipSkeleton =
    loaded ||
    !showSkeleton ||
    loadedUriCache.has(uriStr) ||
    !systemStore.setting.imageSkeleton ||
    WEB ||
    textOnly ||
    !placeholder

  useEffect(() => {
    if (shouldSkipSkeleton) return

    const timer = setTimeout(() => {
      setShowSkeleton(false)
      loadedUriCache.set(uriStr, true)
    }, 6400)

    return () => clearTimeout(timer)
  }, [shouldSkipSkeleton, uriStr])

  if (shouldSkipSkeleton) return null

  return <SkeletonComp type={type} width={layout.width} height={layout.height} />
}

export default observer(Skeleton)
