/*
 * @Author: czy0729
 * @Date: 2023-01-12 06:38:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 02:34:17
 */
import React, { Suspense } from 'react'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { systemStore, useStore } from '@stores'
import { TITLE_ANITABI } from '../../ds'
import BlockAnchor from '../block-anchor'
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
        <BlockAnchor title={TITLE_ANITABI} onBlockRef={onBlockRef} />
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
