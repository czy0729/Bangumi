/*
 * @Author: czy0729
 * @Date: 2026-08-19 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-20 04:08:43
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { I18nManager, Image } from 'react-native'
import {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { _ } from '@stores'
import { scheduleOnUI } from '@utils'
import { createImageSizeList, getFlipDirection, getPositionX, updateImageSize } from './utils'
import { FADE_DURATION, FLIP_THRESHOLD, PAGE_ANIMATE_TIME, RESET_DURATION } from './ds'
import { createPagerStyles } from './styles'

import type { LayoutChangeEvent } from 'react-native'
import type { ImageInfo, ImageSize, UseZoomPagerOptions, UseZoomPagerResult } from './types'
import type { ClickEvent } from './zoom-image/types'

/** 图片缩放翻页核心状态机: 布局 / 图片尺寸加载 / 淡入 / 横滑翻页 / 长按菜单 */
export const useZoomPager = ({
  imageUrls = [],
  index = 0,
  flipThreshold = FLIP_THRESHOLD,
  pageAnimateTime = PAGE_ANIMATE_TIME,
  backgroundColor = 'transparent',
  enablePreload = false,
  saveToLocalByLongPress = true,
  onCancel,
  onSwipeDown,
  onChange,
  onLongPress,
  onClick,
  onDoubleClick
}: UseZoomPagerOptions): UseZoomPagerResult => {
  const isRTL = I18nManager.isRTL

  const [viewport, setViewport] = useState({ width: _.window.width, height: _.window.height })
  const [currentShowIndex, setCurrentShowIndex] = useState(index)
  const [imageSizes, setImageSizes] = useState<ImageSize[]>([])
  const [isShowMenu, setIsShowMenu] = useState(false)

  const fadeOpacity = useSharedValue(0)
  const positionX = useSharedValue(0)

  // 已加载图片的 index, 防止重复请求
  const loadedIndexRef = useRef(new Set<number>())

  // 已处理的图片列表 (引用变化时重置加载记录并重建尺寸列表)
  const processedImageUrlsRef = useRef<ImageInfo[]>([])

  // 当前基准位置与实时位移 (content 坐标, 供手势回调读取)
  const standardPositionXRef = useRef(0)
  const positionXNumberRef = useRef(0)

  const loadImage = useCallback(
    (pageIndex: number) => {
      const image = imageUrls[pageIndex]
      if (!image) return
      if (loadedIndexRef.current.has(pageIndex)) return
      loadedIndexRef.current.add(pageIndex)

      const saveImageSize = (patch: Partial<ImageSize>) => {
        setImageSizes(prev => updateImageSize(prev, pageIndex, patch))
      }

      if (image.width && image.height) {
        if (enablePreload && image.url && !image.url.startsWith('file:')) {
          try {
            Image.prefetch(image.url)
          } catch {}
        }
        saveImageSize({ width: image.width, height: image.height, status: 'success' })
        return
      }

      const successCallback = (width: number, height: number) => {
        saveImageSize({ width, height, status: 'success' })
      }

      const failCallback = () => {
        try {
          const data = Image.resolveAssetSource(image.props?.source)
          saveImageSize({ width: data.width, height: data.height, status: 'success' })
        } catch {
          saveImageSize({ status: 'fail' })
        }
      }

      if (typeof Image.getSizeWithHeaders === 'function') {
        try {
          Image.getSizeWithHeaders(image.url, image.headers, successCallback, failCallback)
        } catch {}
      } else {
        try {
          Image.getSize(image.url, successCallback, failCallback)
        } catch {}
      }
    },
    [imageUrls, enablePreload]
  )

  useEffect(() => {
    if (imageUrls.length === 0) {
      // 隐藏或空列表时整体重置
      fadeOpacity.value = 0
      positionX.value = 0
      standardPositionXRef.current = 0
      positionXNumberRef.current = 0
      loadedIndexRef.current.clear()
      processedImageUrlsRef.current = imageUrls
      setImageSizes([])
      setIsShowMenu(false)
      return
    }

    if (processedImageUrlsRef.current !== imageUrls) {
      // 换了新列表, 重建尺寸列表并重置加载记录
      processedImageUrlsRef.current = imageUrls
      loadedIndexRef.current.clear()
      setImageSizes(createImageSizeList(imageUrls))
    }

    const currentIndex = index || 0
    setCurrentShowIndex(currentIndex)
    loadImage(currentIndex)

    // 淡入显示
    cancelAnimation(fadeOpacity)
    fadeOpacity.value = withTiming(1, { duration: FADE_DURATION })

    // 布局完成后跳到当前页
    if (viewport.width > 0) {
      const px = getPositionX(currentIndex, viewport.width, isRTL)
      positionX.value = px
      standardPositionXRef.current = px
      positionXNumberRef.current = px
    }
  }, [imageUrls, index, viewport.width, fadeOpacity, positionX, loadImage, isRTL])

  const pagerStyles = useMemo(
    () => createPagerStyles(viewport.width, viewport.height, backgroundColor),
    [viewport.width, viewport.height, backgroundColor]
  )

  const fadeStyle = useAnimatedStyle(() => ({ opacity: fadeOpacity.value }))

  const moveStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: positionX.value }]
  }))

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout
      // 只对比宽度, 规避安卓不断触发 onLayout 的 bug
      if (width !== viewport.width) setViewport({ width, height })
    },
    [viewport.width]
  )

  const resetPosition = useCallback(() => {
    positionXNumberRef.current = standardPositionXRef.current
    cancelAnimation(positionX)
    positionX.value = withTiming(standardPositionXRef.current, { duration: RESET_DURATION })
  }, [positionX])

  const goBack = useCallback(() => {
    if (currentShowIndex === 0) {
      resetPosition()
      return
    }

    positionXNumberRef.current = isRTL
      ? standardPositionXRef.current - viewport.width
      : standardPositionXRef.current + viewport.width
    standardPositionXRef.current = positionXNumberRef.current
    cancelAnimation(positionX)
    positionX.value = withTiming(positionXNumberRef.current, { duration: pageAnimateTime })

    const nextIndex = currentShowIndex - 1
    setCurrentShowIndex(nextIndex)
    onChange?.(nextIndex)
  }, [currentShowIndex, isRTL, viewport.width, pageAnimateTime, positionX, resetPosition, onChange])

  const goNext = useCallback(() => {
    if (currentShowIndex === imageUrls.length - 1) {
      resetPosition()
      return
    }

    positionXNumberRef.current = isRTL
      ? standardPositionXRef.current + viewport.width
      : standardPositionXRef.current - viewport.width
    standardPositionXRef.current = positionXNumberRef.current
    cancelAnimation(positionX)
    positionX.value = withTiming(positionXNumberRef.current, { duration: pageAnimateTime })

    const nextIndex = currentShowIndex + 1
    setCurrentShowIndex(nextIndex)
    onChange?.(nextIndex)
  }, [
    currentShowIndex,
    imageUrls.length,
    isRTL,
    viewport.width,
    pageAnimateTime,
    positionX,
    resetPosition,
    onChange
  ])

  const handleHorizontalOuterRangeOffset = useCallback(
    (offsetX: number = 0) => {
      positionXNumberRef.current = standardPositionXRef.current + offsetX
      // 翻页动画由 UI 线程驱动, 需在同一线程取消并写入跟随值, 否则 JS 写入会被动画帧覆盖 (切页后立即滑动失效/抖动)
      scheduleOnUI((x: number) => {
        'worklet'
        cancelAnimation(positionX)
        positionX.value = x
      }, positionXNumberRef.current)

      const offsetXRTL = !isRTL ? offsetX : -offsetX
      if (offsetXRTL < 0) {
        if (currentShowIndex > 0 || imageUrls.length - 1 > 0) {
          loadImage(currentShowIndex + 1)
        }
      } else if (offsetXRTL > 0) {
        if (currentShowIndex > 0) {
          loadImage(currentShowIndex - 1)
        }
      }
    },
    [isRTL, positionX, currentShowIndex, imageUrls.length, loadImage]
  )

  const handleResponderRelease = useCallback(
    (vx: number = 0, scale: number = 1) => {
      const direction = getFlipDirection({
        positionXNumber: positionXNumberRef.current,
        standardPositionX: standardPositionXRef.current,
        // 缩放状态下禁用甩动翻页, 只允许顶到边缘的位移翻页, 避免放大后误切
        vx: scale > 1 ? 0 : vx,
        isRTL,
        flipThreshold
      })

      if (direction === 'back') {
        goBack()
        if (currentShowIndex > 0) loadImage(currentShowIndex - 1)
      } else if (direction === 'next') {
        goNext()
        if (currentShowIndex > 0 || imageUrls.length - 1 > 0) loadImage(currentShowIndex + 1)
      } else {
        resetPosition()
      }
    },
    [
      goBack,
      goNext,
      resetPosition,
      currentShowIndex,
      imageUrls.length,
      loadImage,
      isRTL,
      flipThreshold
    ]
  )

  const handleCancel = useCallback(() => {
    onCancel?.()
  }, [onCancel])

  const handleSwipeDown = useCallback(() => {
    onSwipeDown?.()
    handleCancel()
  }, [onSwipeDown, handleCancel])

  const handleLongPress = useCallback(
    (e?: ClickEvent) => {
      const image = e?.imageIndex != null ? imageUrls[e.imageIndex] : undefined
      if (saveToLocalByLongPress) setIsShowMenu(true)
      onLongPress?.(image)
    },
    [imageUrls, saveToLocalByLongPress, onLongPress]
  )

  const handleClick = useCallback(() => {
    onClick?.(handleCancel, currentShowIndex)
  }, [onClick, handleCancel, currentShowIndex])

  const handleDoubleClick = useCallback(() => {
    onDoubleClick?.(handleCancel)
  }, [onDoubleClick, handleCancel])

  const handleLeaveMenu = useCallback(() => setIsShowMenu(false), [])
  const handleSaveToLocal = useCallback(() => setIsShowMenu(false), [])

  return {
    viewport,
    currentShowIndex,
    imageSizes,
    isShowMenu,
    pagerStyles,
    fadeStyle,
    moveStyle,
    handleLayout,
    goBack,
    goNext,
    handleHorizontalOuterRangeOffset,
    handleResponderRelease,
    handleLongPress,
    handleClick,
    handleDoubleClick,
    handleSwipeDown,
    handleLeaveMenu,
    handleSaveToLocal
  }
}
