/*
 * @Author: czy0729
 * @Date: 2024-01-20 08:29:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 07:33:54
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Collapsible as CollapsibleComp } from '@components'
import { numbersOfLine } from '@_/base/eps/ds'
import { useStore } from '@stores'
import Eps from '../eps'
import { COMPONENT } from './ds'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function Collapsible({ subjectId, isFirst }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <CollapsibleComp
      key={String(Math.floor(Number($.epsCount(subjectId)) / numbersOfLine))}
      collapsed={!$.$Item(subjectId).expand}
    >
      <Eps subjectId={subjectId} isFirst={isFirst} />
    </CollapsibleComp>
  )
}

export default observer(Collapsible)
