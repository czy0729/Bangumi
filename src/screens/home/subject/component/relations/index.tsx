/*
 * @Author: czy0729
 * @Date: 2019-04-08 10:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-16 09:43:08
 */
import React from 'react'
import { View } from 'react-native'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { TITLE_RELATIONS } from '../../ds'
import { Ctx } from '../../types'
import Relations from './relations'
import { COMPONENT } from './ds'

function RelationsWrap({ onBlockRef }, { $, navigation }: Ctx) {
  if (!$.showRelations[1]) return null

  const { showRelations } = systemStore.setting
  return (
    <>
      <View ref={ref => onBlockRef(ref, TITLE_RELATIONS)} />
      <Relations
        navigation={navigation}
        showRelations={showRelations}
        subjectId={$.subjectId}
        relations={$.relations}
        onSwitchBlock={$.onSwitchBlock}
      />
    </>
  )
}

export default obc(RelationsWrap, COMPONENT)
