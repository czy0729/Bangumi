/*
 * @Author: czy0729
 * @Date: 2023-04-12 09:06:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-06 19:20:34
 */
import { useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react'
import { _, systemStore } from '@stores'
import { ensureCacheLimit } from '@utils/cache'
import { WEB } from '@constants'
import { Skeleton as SkeletonComp } from '../../skeleton'

import type { Props } from './types'

const LOADED_URI_CACHE_MAX = 1000

/**
 * 缓存已加载的 uri，避免重复显示骨架屏
 * - 有界集合, 超出后最早的 uri 会重新显示一次骨架屏
 */
const loadedUriCache = new Map<string, boolean>()

function Skeleton({ style, uri, type, textOnly, placeholder, loaded }: Props) {
  const [showSkeleton, setShowSkeleton] = useState(true)

  const layout = useMemo(() => {
    const flattened = _.flatten(style)
    const w = flattened?.width
    const h = flattened?.height
    if (typeof w === 'number' && typeof h === 'number') return { width: w, height: h }

    return null
  }, [style])
  const uriStr = String(uri)

  // 判断是否应该跳过骨架屏
  const shouldSkipSkeleton =
    !layout ||
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
      ensureCacheLimit(loadedUriCache, LOADED_URI_CACHE_MAX)
    }, 12000)

    return () => clearTimeout(timer)
  }, [shouldSkipSkeleton, uriStr])

  if (shouldSkipSkeleton) return null

  return <SkeletonComp type={type} width={layout.width} height={layout.height} />
}

export default observer(Skeleton)
