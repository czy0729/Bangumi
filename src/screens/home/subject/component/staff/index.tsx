/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:28:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-25 02:57:30
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { TITLE_STAFF } from '../../ds'
import Split from '../split'
import Staff from './staff'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function StaffWrap({ onBlockRef }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    if (!$.showStaff[1]) return null

    return (
      <Suspense fallback={null}>
        <Component id='screen-subject-staff'>
          <View
            ref={ref => onBlockRef(ref, TITLE_STAFF)}
            style={_.container.layout}
            collapsable={false}
          />
          <Staff
            navigation={navigation}
            showStaff={systemStore.setting.showStaff}
            subjectId={$.subjectId}
            staff={$.staff}
            onSwitchBlock={$.onSwitchBlock}
          />
          <Split
            style={{
              marginTop: 28
            }}
          />
        </Component>
      </Suspense>
    )
  })
}

export default StaffWrap
