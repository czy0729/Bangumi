/*
 * @Author: czy0729
 * @Date: 2019-04-08 10:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-11 04:52:53
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { cnjp } from '@utils'
import { useObserver } from '@utils/hooks'
import { TITLE_RELATIONS } from '../../ds'
import Split from '../split'
import Relations from './relations'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'
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
            name={cnjp($.cn, $.jp)}
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
