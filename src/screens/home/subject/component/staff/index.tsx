/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:28:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-10 07:21:00
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { TITLE_STAFF } from '../../ds'
import { Ctx } from '../../types'
import Split from '../split'
import Staff from './staff.lazy'
import { COMPONENT } from './ds'

function StaffWrap({ onBlockRef }) {
  const { $, navigation } = useStore<Ctx>()
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
}

export default ob(StaffWrap, COMPONENT)
