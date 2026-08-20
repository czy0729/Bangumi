/*
 * @Author: czy0729
 * @Date: 2026-08-19 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-20 04:08:47
 */
import React, { memo, useMemo } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { Text } from '../../text'
import { Touchable } from '../../touchable'
import { useZoomPager } from './hooks'
import Menu from './menu'
import { fitImageSize, getRenderImageProps } from './utils'
import ZoomImage from './zoom-image'
import { MAX_OVERFLOW } from './ds'
import { simpleStyle } from './styles'

import type { ReactNode } from 'react'
import type { ImageStyle } from 'react-native'
import type { Props, RenderImageProps } from './types'

const DEFAULT_RENDER_IMAGE = (p: RenderImageProps) => (
  <Image source={p.source} style={p.style as unknown as ImageStyle} />
)

const DEFAULT_RENDER_INDICATOR = (currentIndex?: number, allSize?: number) => (
  <View style={simpleStyle.count} pointerEvents='none'>
    <Text style={simpleStyle.countText} type='__plain__' align='center'>
      {currentIndex} / {allSize}
    </Text>
  </View>
)

/**
 * 图片缩放翻页容器 (内联重写 react-native-image-zoom-viewer)
 */
function ZoomPager(props: Props) {
  const {
    style,
    imageUrls = [],
    index = 0,
    flipThreshold,
    maxOverflow = MAX_OVERFLOW,
    failImageSource,
    backgroundColor = 'transparent',
    footerContainerStyle,
    menuContext,
    saveToLocalByLongPress = true,
    enableImageZoom = true,
    enableSwipeDown = false,
    swipeDownThreshold,
    doubleClickInterval,
    enablePreload = false,
    pageAnimateTime,
    onLongPress,
    onClick,
    onDoubleClick,
    onCancel,
    onSwipeDown,
    onChange,
    onMove,
    renderHeader,
    renderFooter,
    renderIndicator,
    renderImage,
    renderArrowLeft,
    renderArrowRight,
    loadingRender,
    menus
  } = props

  const {
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
  } = useZoomPager({
    imageUrls,
    index,
    flipThreshold,
    pageAnimateTime,
    backgroundColor,
    enablePreload,
    saveToLocalByLongPress,
    onCancel,
    onSwipeDown,
    onChange,
    onLongPress,
    onClick,
    onDoubleClick
  })

  const pages = useMemo(() => {
    const screenWidth = viewport.width
    const screenHeight = viewport.height
    const list: ReactNode[] = []

    for (let i = 0; i < imageUrls.length; i++) {
      const image = imageUrls[i]
      if (currentShowIndex > i + 1 || currentShowIndex < i - 1) {
        list.push(<View key={i} style={{ width: screenWidth, height: screenHeight }} />)
        continue
      }

      const imageInfo = imageSizes[i]
      if (!imageInfo || !imageInfo.status) {
        list.push(<View key={i} style={{ width: screenWidth, height: screenHeight }} />)
        continue
      }

      const { width, height } = fitImageSize(
        imageInfo.width,
        imageInfo.height,
        screenWidth,
        screenHeight
      )

      const zoomProps = {
        cropWidth: viewport.width,
        cropHeight: viewport.height,
        maxOverflow,
        imageIndex: i,
        horizontalOuterRangeOffset: handleHorizontalOuterRangeOffset,
        responderRelease: handleResponderRelease,
        onMove,
        onLongPress: handleLongPress,
        onClick: handleClick,
        onDoubleClick: handleDoubleClick,
        enableSwipeDown,
        swipeDownThreshold,
        onSwipeDown: handleSwipeDown,
        doubleClickInterval
      }
      const zoomPropsWithMenu = {
        ...zoomProps,
        panToMove: !isShowMenu,
        pinchToZoom: enableImageZoom && !isShowMenu,
        enableDoubleClickZoom: enableImageZoom && !isShowMenu
      }

      switch (imageInfo.status) {
        case 'loading':
          list.push(
            <ZoomImage
              key={i}
              {...zoomProps}
              style={[pagerStyles.modalContainer, pagerStyles.loadingContainer]}
              imageWidth={screenWidth}
              imageHeight={screenHeight}
            >
              <View style={pagerStyles.loadingContainer}>{loadingRender?.()}</View>
            </ZoomImage>
          )
          break

        case 'success':
          list.push(
            <ZoomImage key={i} {...zoomPropsWithMenu} imageWidth={width} imageHeight={height}>
              {(renderImage || DEFAULT_RENDER_IMAGE)(getRenderImageProps(image, width, height))}
            </ZoomImage>
          )
          break

        case 'fail':
          list.push(
            <ZoomImage
              key={i}
              {...zoomProps}
              style={pagerStyles.modalContainer}
              imageWidth={failImageSource?.width || screenWidth}
              imageHeight={failImageSource?.height || screenHeight}
            >
              {failImageSource &&
                renderImage?.({
                  source: { uri: failImageSource.url },
                  style: {
                    width: failImageSource.width,
                    height: failImageSource.height
                  }
                })}
            </ZoomImage>
          )
          break
      }
    }

    return list
  }, [
    imageUrls,
    imageSizes,
    currentShowIndex,
    viewport,
    isShowMenu,
    enableImageZoom,
    enableSwipeDown,
    swipeDownThreshold,
    doubleClickInterval,
    maxOverflow,
    failImageSource,
    pagerStyles,
    loadingRender,
    renderImage,
    onMove,
    handleLongPress,
    handleHorizontalOuterRangeOffset,
    handleResponderRelease,
    handleClick,
    handleDoubleClick,
    handleSwipeDown
  ])

  const currentImage = imageUrls[currentShowIndex || 0]

  return (
    <View style={style} onLayout={handleLayout}>
      <Animated.View style={{ zIndex: 100 }}>
        <Animated.View style={[pagerStyles.container, fadeStyle]}>
          {renderHeader?.(currentShowIndex)}

          <View style={pagerStyles.arrowLeftContainer}>
            <Touchable withoutFeedback onPress={goBack}>
              <View>{renderArrowLeft?.()}</View>
            </Touchable>
          </View>

          <View style={pagerStyles.arrowRightContainer}>
            <Touchable withoutFeedback onPress={goNext}>
              <View>{renderArrowRight?.()}</View>
            </Touchable>
          </View>

          <Animated.View
            style={[pagerStyles.moveBox, moveStyle, { width: viewport.width * imageUrls.length }]}
          >
            {pages}
          </Animated.View>

          {(renderIndicator || DEFAULT_RENDER_INDICATOR)(
            (currentShowIndex || 0) + 1,
            imageUrls.length
          )}

          {currentImage?.originSizeKb && currentImage?.originUrl && (
            <View style={pagerStyles.watchOrigin}>
              <TouchableOpacity style={pagerStyles.watchOriginTouchable}>
                <Text style={pagerStyles.watchOriginText} type='__plain__'>
                  查看原图({Math.ceil(currentImage.originSizeKb / 1024)}M)
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={[{ bottom: 0, position: 'absolute', zIndex: 9 }, footerContainerStyle]}>
            {renderFooter?.(currentShowIndex || -1)}
          </View>
        </Animated.View>
      </Animated.View>

      {isShowMenu && (
        <Menu
          menus={menus}
          menuContext={menuContext}
          pagerStyles={pagerStyles}
          handleLeaveMenu={handleLeaveMenu}
          handleSaveToLocal={handleSaveToLocal}
        />
      )}
    </View>
  )
}

export default memo(ZoomPager)
