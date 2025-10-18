/*
 * @Author: czy0729
 * @Date: 2023-01-12 06:38:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-19 20:58:29
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { TITLE_ANITABI } from '../../ds'
import Split from '../split'
import Anitabi from './anitabi'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function AnitabiWrap({ onBlockRef }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
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
  })
}

export default AnitabiWrap
