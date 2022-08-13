/*
 * iOS 和 android 公用逻辑
 *
 * @Author: czy0729
 * @Date: 2020-03-14 15:51:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-13 11:35:39
 */
import React from 'react'
import { ImageViewer, Heatmap } from '@components'
import { Popable } from '@_'
import { systemStore, uiStore } from '@stores'
import { ob } from '@utils/decorators'
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
