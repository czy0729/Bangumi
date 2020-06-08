/*
 * iOS和android公用逻辑
 * @Author: czy0729
 * @Date: 2020-03-14 15:51:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-14 15:58:51
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ImageViewer } from '@components'
import { systemStore } from '@stores'
import ListenClipboard from './listen-clipboard'

function AppCommon() {
  const { visible, imageUrls } = systemStore.imageViewer
  return (
    <>
      <ImageViewer
        visible={visible}
        imageUrls={imageUrls}
        onCancel={systemStore.closeImageViewer}
      />
      <ListenClipboard />
    </>
  )
}

export default observer(AppCommon)
