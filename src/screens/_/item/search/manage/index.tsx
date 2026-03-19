/*
 * @Author: czy0729
 * @Date: 2025-01-25 22:44:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:44:57
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { uiStore } from '@stores'
import { cnjp, getAction } from '@utils'
import { MODEL_COLLECTION_STATUS } from '@constants'
import { Manage as ManageComp } from '../../../base'
import { styles } from './styles'

import type { CollectionStatus } from '@types'

function Manage({ subjectId, collection, typeCn, name, nameCn, screen }) {
  return (
    <View style={styles.manage}>
      <ManageComp
        subjectId={subjectId}
        collection={collection}
        typeCn={typeCn}
        onPress={() => {
          uiStore.showManageModal(
            {
              subjectId,
              title: cnjp(nameCn, name),
              desc: cnjp(name, nameCn),
              status: MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(collection),
              action: getAction(typeCn)
            },
            screen
          )
        }}
      />
    </View>
  )
}

export default observer(Manage)
