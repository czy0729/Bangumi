/*
 * @Author: czy0729
 * @Date: 2019-05-23 18:57:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-23 02:05:14
 */
import React, { useCallback, useMemo } from 'react'
import { Modal, View } from 'react-native'
import { useObserver } from 'mobx-react'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
import { RNImageViewer } from '@components/@'
import { open, showActionSheet, stl } from '@utils'
import { r } from '@utils/dev'
import { FROZEN_FN, HOST_DOGE, IOS } from '@constants'
import { Component } from '../component'
import { Iconfont } from '../iconfont'
import { Image } from '../image'
import { Text } from '../text'
import { Touchable } from '../touchable'
import { ACTION_SHEET_DS, COMPONENT } from './ds'
import { styles } from './styles'

import type { Props as ImageViewerProps } from './types'

export type { ImageViewerProps }

/**
 * 图片相册查看器
 * @doc https://github.com/ascoders/react-native-image-viewer
 */
export const ImageViewer = ({
  visible = false,
  index = 0,
  imageUrls = [],
  mini = false,
  useRN = false,
  onCancel = FROZEN_FN,
  ...other
}: ImageViewerProps) => {
  r(COMPONENT)

  // 组件 RNImageViewer 在 iOS Expo 环境下代码已过时, 导致初始 index 非 0 时布局错乱 (待处理)
  const iOSToFixed = IOS && index !== 0
  const memoData = useMemo(
    () => (iOSToFixed ? [imageUrls[index]] : imageUrls),
    [iOSToFixed, imageUrls, index]
  )
  const selectedIndex = iOSToFixed ? 0 : index

  const handleRequestClose = useCallback(() => {
    if (typeof onCancel === 'function') onCancel()
  }, [onCancel])

  const handleRenderMenus = useCallback((url: string, cancel: any) => {
    if (typeof url === 'string' && url.includes(HOST_DOGE)) return null

    if (IOS) {
      // 不想涉及到权限问题, 暂时用浏览器打开图片来处理
      showActionSheet(ACTION_SHEET_DS, (i: number) => {
        if (i === 0) open(url)
      })
    } else {
      // @issue 安卓的 ActionSheet 在这个 Viewer 的下面
      cancel?.()
      showActionSheet(ACTION_SHEET_DS, (i: number) => {
        if (i === 0) open(url)
      })
    }
    return null
  }, [])

  const handleMenus = useCallback(() => {
    const currentUrl = memoData[selectedIndex]?._url || memoData[selectedIndex]?.url
    return handleRenderMenus(currentUrl, onCancel)
  }, [memoData, selectedIndex, handleRenderMenus, onCancel])

  const handleRenderIndicator = useCallback(
    (currentIndex: number, allSize: number) => {
      if (memoData.length <= 1) return null

      return (
        <Text style={styles.indicator} type='__plain__' align='center' pointerEvents='none'>
          {currentIndex} / {allSize}
        </Text>
      )
    },
    [memoData.length]
  )

  const handleRenderImage = useCallback(
    (p: any) => {
      if (!(p?.style?.width || p?.style?.height)) return null

      return (
        <Image
          src={p?.source?.uri}
          width={p?.style?.width}
          height={p?.style?.height}
          headers={memoData?.[0]?.headers}
          placeholder={false}
          skeleton={false}
        />
      )
    },
    [memoData]
  )

  return useObserver(() => (
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
            <RNImageViewer
              style={styles.viewer}
              index={selectedIndex}
              imageUrls={memoData}
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
  ))
}

export default ImageViewer
