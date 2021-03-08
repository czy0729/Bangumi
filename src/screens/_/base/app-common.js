/*
 * iOS和android公用逻辑
 * @Author: czy0729
 * @Date: 2020-03-14 15:51:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-08 20:19:41
 */
import React from 'react'
import { ImageViewer, Heatmap } from '@components'
import { systemStore } from '@stores'
import { ob } from '@utils/decorators'
import { ListenClipboard } from './listen-clipboard'

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
      <Heatmap.Control />
    </>
  )
})
