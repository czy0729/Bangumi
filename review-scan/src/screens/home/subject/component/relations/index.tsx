/*
 * @Author: czy0729
 * @Date: 2019-04-08 10:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-10 07:21:18
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { TITLE_RELATIONS } from '../../ds'
import { Ctx } from '../../types'
import Split from '../split'
import Relations from './relations.lazy'
import { COMPONENT } from './ds'

function RelationsWrap({ onBlockRef }) {
  const { $, navigation } = useStore<Ctx>()
  if (!$.showRelations[1]) return null

  return (
    <Suspense fallback={null}>
      <Component id='screen-subject-relations'>
        <View
          ref={ref => onBlockRef(ref, TITLE_RELATIONS)}
          style={_.container.layout}
          collapsable={false}
        />
        <Relations
          navigation={navigation}
          showRelations={systemStore.setting.showRelations}
          subjectId={$.subjectId}
          relations={$.relations}
          typeCn={$.type}
          onSwitchBlock={$.onSwitchBlock}
        />
        <Split
          style={{
            marginTop: 12
          }}
        />
      </Component>
    </Suspense>
  )
}

export default ob(RelationsWrap, COMPONENT)
