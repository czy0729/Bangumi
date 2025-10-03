/*
 * @Author: czy0729
 * @Date: 2019-04-08 10:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-23 17:12:53
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { TITLE_RELATIONS } from '../../ds'
import { Ctx } from '../../types'
import Split from '../split'
import Relations from './relations'
import { COMPONENT } from './ds'
import { Props } from './types'

function RelationsWrap({ onBlockRef }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
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
  })
}

export default RelationsWrap
