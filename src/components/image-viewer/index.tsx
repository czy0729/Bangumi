/*
 * @Author: czy0729
 * @Date: 2019-05-23 18:57:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-20 04:47:39
 */
import React, { useCallback } from 'react'
import { Modal, View } from 'react-native'
import { observer } from 'mobx-react'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { Component } from '../component'
import { ActivityIndicator } from '../activity-indicator'
import { Iconfont } from '../iconfont'
import { Image } from '../image'
import { Text } from '../text'
import { Touchable } from '../touchable'
import { useImageMenus, useImageUrlProxy, useImageVisibleLog } from './hooks'
import ZoomPager from './zoom-pager'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { RenderImageProps } from './zoom-pager/types'
import type { Props as ImageViewerProps } from './types'
export type { ImageViewerProps }

/**
 * 图片相册查看器
 */
export const ImageViewer = observer(
  ({
    visible = false,
    index = 0,
    imageUrls = [],
    mini = false,
    useRN = false,
    onCancel = FROZEN_FN,
    ...other
  }: ImageViewerProps) => {
    r(COMPONENT)

    const styles = memoStyles()

    const proxyImageUrls = useImageUrlProxy(imageUrls)
    useImageVisibleLog(visible, proxyImageUrls)

    const handleRequestClose = useCallback(() => {
      if (typeof onCancel === 'function') onCancel()
    }, [onCancel])

    const handleMenus = useImageMenus(proxyImageUrls, index, onCancel)

    const handleRenderIndicator = useCallback(
      (currentIndex: number, allSize: number) => {
        if (proxyImageUrls.length <= 1) return null

        return (
          <Text style={styles.indicator} type='__plain__' align='center' pointerEvents='none'>
            {currentIndex} / {allSize}
          </Text>
        )
      },
      [proxyImageUrls.length, styles]
    )

    const handleRenderImage = useCallback(
      (p: RenderImageProps) => {
        if (!(p?.style?.width || p?.style?.height)) return null

        const source = typeof p?.source === 'object' ? p?.source?.uri : undefined

        return (
          <Image
            src={source}
            width={p?.style?.width}
            height={p?.style?.height}
            headers={proxyImageUrls?.[0]?.headers}
            placeholder={false}
            skeleton={false}
          />
        )
      },
      [proxyImageUrls]
    )

    return (
      <Component id='component-image-viewer'>
        <Modal
          visible={visible}
          transparent
          hardwareAccelerated={false}
          animationType='fade'
          statusBarTranslucent
          onRequestClose={handleRequestClose}
        >
          <View style={styles.container}>
            <View style={styles.activityIndicator}>
              <ActivityIndicator />
            </View>
            <View style={stl(styles.viewerContainer, mini && styles.viewerMini)}>
              <ZoomPager
                style={styles.viewer}
                index={index}
                imageUrls={proxyImageUrls}
                backgroundColor='transparent'
                enableSwipeDown={!mini}
                enableImageZoom={!mini}
                menus={handleMenus}
                saveToLocalByLongPress={false}
                renderIndicator={handleRenderIndicator}
                renderImage={useRN ? undefined : handleRenderImage}
                onCancel={onCancel}
                {...other}
              />
            </View>
            <Touchable style={styles.close} useRN onPress={onCancel}>
              <Iconfont style={styles.iconfont} name='md-close' />
            </Touchable>
          </View>
        </Modal>
      </Component>
    )
  }
)

export default ImageViewer
