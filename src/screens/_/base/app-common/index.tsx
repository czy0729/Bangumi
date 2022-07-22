/*
 * iOS 和 android 公用逻辑
 *
 * @Author: czy0729
 * @Date: 2020-03-14 15:51:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-21 15:28:20
 */
import React from 'react'
import { ImageViewer, Heatmap } from '@components'
import { systemStore } from '@stores'
import { ob } from '@utils/decorators'
import { ListenClipboard } from '../listen-clipboard'

export const AppCommon = ob(() => {
  const { visible, imageUrls, index } = systemStore.imageViewer
  return (
    <>
      <ImageViewer
        index={index}
        visible={visible}
        imageUrls={imageUrls}
        onCancel={systemStore.closeImageViewer}
      />
      <ListenClipboard />
      {/* @ts-ignore */}
      <Heatmap.Control />
    </>
  )
})
