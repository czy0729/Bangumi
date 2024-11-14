/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:28:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 02:07:14
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { TITLE_STAFF } from '../../ds'
import { Ctx } from '../../types'
import Staff from './staff.lazy'
import { COMPONENT } from './ds'

function StaffWrap({ onBlockRef }) {
  const { $, navigation } = useStore<Ctx>()
  if (!$.showStaff[1]) return null

  return (
    <Suspense fallback={null}>
      <Component id='screen-subject-staff'>
        <View style={_.container.layout} ref={ref => onBlockRef(ref, TITLE_STAFF)} />
        <Staff
          navigation={navigation}
          showStaff={systemStore.setting.showStaff}
          subjectId={$.subjectId}
          staff={$.staff}
          onSwitchBlock={$.onSwitchBlock}
        />
      </Component>
    </Suspense>
  )
}

export default ob(StaffWrap, COMPONENT)
