/*
 * @Author: czy0729
 * @Date: 2025-01-24 05:51:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:20:14
 */
import React from 'react'
import { observer } from 'mobx-react'
import { uiStore } from '@stores'
import { getAction } from '@utils'
import { MODEL_COLLECTION_STATUS } from '@constants'
import { Manage as ManageComp } from '../../../base'

import type { CollectionStatus } from '@types'

function Manage({ subjectId, name, nameCn, collection, typeCn }) {
  return (
    <ManageComp
      subjectId={subjectId}
      collection={collection}
      typeCn={typeCn}
      onPress={() => {
        uiStore.showManageModal(
          {
            subjectId,
            title: nameCn,
            desc: name,
            status: MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(collection),
            action: getAction(typeCn)
          },
          '收藏'
        )
      }}
    />
  )
}

export default observer(Manage)
