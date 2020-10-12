/*
 * iOS和android公用逻辑
 * @Author: czy0729
 * @Date: 2020-03-14 15:51:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-12 16:30:09
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ImageViewer } from '@components'
import { systemStore } from '@stores'
import ListenClipboard from './listen-clipboard'

function AppCommon() {
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
    </>
  )
}

export default observer(AppCommon)
