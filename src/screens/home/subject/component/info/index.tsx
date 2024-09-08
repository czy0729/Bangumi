/*
 * @Author: czy0729
 * @Date: 2019-08-23 00:24:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-08 19:45:44
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { TITLE_INFO } from '../../ds'
import { Ctx } from '../../types'
import Info from './info.lazy'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function InfoWrap({ onBlockRef }, { $, navigation }: Ctx) {
  if (!$.showInfo[1]) return null

  return (
    <Suspense fallback={null}>
      <Component id='screen-subject-info'>
        <View style={_.container.layout} ref={ref => onBlockRef(ref, TITLE_INFO)} />
        <Info
          navigation={navigation}
          styles={memoStyles()}
          subjectId={$.subjectId}
          showInfo={systemStore.setting.showInfo}
          info={$.info}
          onSwitchBlock={$.onSwitchBlock}
        />
      </Component>
    </Suspense>
  )
}

export default obc(InfoWrap, COMPONENT)
