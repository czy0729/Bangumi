/*
 * @Author: czy0729
 * @Date: 2023-01-12 06:38:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 22:59:18
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { TITLE_ANITABI } from '../../ds'
import Split from '../split'
import Anitabi from './anitabi'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function AnitabiWrap({ onBlockRef }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

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

export default observer(AnitabiWrap)
