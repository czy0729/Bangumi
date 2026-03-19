/*
 * @Author: czy0729
 * @Date: 2020-03-14 15:51:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 15:17:08
 */
import React, { Suspense } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { Component, Heatmap, ImageViewer } from '@components'
import { systemStore, uiStore } from '@stores'
import { r } from '@utils/dev'
import { useGlobalMount, useKeepAwake } from '@utils/hooks'
import { WEB } from '@constants'
import { LikesGrid } from '../likes-grid'
import { LikesUsers } from '../likes-users'
import { ListenClipboard } from '../listen-clipboard'
import { ManageModal } from '../manage-modal'
import { Popable } from '../popable'
import { COMPONENT } from './ds'

/** 全局公用逻辑 */
export const AppCommon = observer(() => {
  r(COMPONENT)

  useGlobalMount()
  useKeepAwake()

  return (
    <Suspense>
      <Component id='base-app-common'>
        <ImageViewer
          {...systemStore.imageViewer}
          imageUrls={toJS(systemStore.imageViewer.imageUrls)}
          onCancel={systemStore.closeImageViewer}
        />
        <Popable {...uiStore.popableSubject} />
        <LikesGrid {...uiStore.likesGrid} />
        <LikesUsers {...uiStore.likesUsers} onClose={uiStore.closeLikesUsers} />
        <ManageModal
          {...uiStore.manageModal}
          onSubmit={uiStore.submitManageModal}
          onClose={uiStore.closeManageModal}
        />
        {!WEB && <ListenClipboard />}
        <Heatmap.Control />
      </Component>
    </Suspense>
  )
})

export default AppCommon
