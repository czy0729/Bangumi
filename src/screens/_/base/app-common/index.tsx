/*
 * iOS 和 android 公用逻辑
 *
 * @Author: czy0729
 * @Date: 2020-03-14 15:51:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-14 07:21:24
 */
import React from 'react'
import { ImageViewer, Heatmap } from '@components'
import { systemStore, uiStore } from '@stores'
import { ob } from '@utils/decorators'
import { Popable } from '../popable'
import { ListenClipboard } from '../listen-clipboard'

export const AppCommon = ob(() => {
  return (
    <>
      <ImageViewer
        {...systemStore.imageViewer}
        onCancel={systemStore.closeImageViewer}
      />
      <Popable {...uiStore.popableSubject} />
      <ListenClipboard />
      {/* @ts-ignore */}
      <Heatmap.Control />
    </>
  )
})
