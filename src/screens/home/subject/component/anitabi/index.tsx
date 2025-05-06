/*
 * @Author: czy0729
 * @Date: 2023-01-12 06:38:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-10 07:21:07
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { TITLE_ANITABI } from '../../ds'
import { Ctx } from '../../types'
import Split from '../split'
import Anitabi from './anitabi.lazy'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function AnitabiWrap({ onBlockRef }) {
  const { $ } = useStore<Ctx>()
  if (!$.showAnitabi[1]) return null

  return (
    <Suspense fallback={null}>
      <Component id='screen-subject-anitabi'>
        <View
          ref={ref => onBlockRef(ref, TITLE_ANITABI)}
          style={_.container.layout}
          collapsable={false}
        />
        <Anitabi
          styles={memoStyles()}
          showAnitabi={systemStore.setting.showAnitabi}
          subjectId={$.subjectId}
          data={$.state.anitabi}
          onSwitchBlock={$.onSwitchBlock}
        />
        <Split />
      </Component>
    </Suspense>
  )
}

export default ob(AnitabiWrap, COMPONENT)
