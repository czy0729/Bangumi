/*
 * @Author: czy0729
 * @Date: 2025-01-25 22:44:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-25 22:45:42
 */
import React from 'react'
import { View } from 'react-native'
import { uiStore } from '@stores'
import { cnjp, getAction } from '@utils'
import { ob } from '@utils/decorators'
import { MODEL_COLLECTION_STATUS } from '@constants'
import { CollectionStatus } from '@types'
import { Manage as ManageComp } from '../../../base'
import { styles } from './styles'

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

export default ob(Manage)
