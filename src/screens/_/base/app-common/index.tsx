/*
 * iOS 和 android 公用逻辑
 *
 * @Author: czy0729
 * @Date: 2020-03-14 15:51:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-23 03:51:43
 */
import React from 'react'
import { toJS } from 'mobx'
import { ImageViewer, Heatmap } from '@components'
import { systemStore, uiStore } from '@stores'
import { ob } from '@utils/decorators'
import { Popable } from '../popable'
import { ManageModal } from '../manage-modal'
import { ListenClipboard } from '../listen-clipboard'

export const AppCommon = ob(() => {
  const { imageViewer } = systemStore
  const { imageUrls } = imageViewer
  return (
    <>
      <ImageViewer
        {...imageViewer}
        imageUrls={toJS(imageUrls)}
        onCancel={systemStore.closeImageViewer}
      />
      <Popable {...uiStore.popableSubject} />
      <ManageModal
        {...uiStore.manageModal}
        onSubmit={uiStore.submitManageModal}
        onClose={uiStore.closeManageModal}
      />
      <ListenClipboard />
      {/* @ts-expect-error */}
      <Heatmap.Control />
    </>
  )
})
