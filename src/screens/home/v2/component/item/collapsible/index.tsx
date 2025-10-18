/*
 * @Author: czy0729
 * @Date: 2024-01-20 08:29:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 05:22:43
 */
import React from 'react'
import { Collapsible as CollapsibleComp } from '@components'
import { numbersOfLine } from '@_/base/eps/ds'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Eps from '../eps'
import { COMPONENT } from './ds'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function Collapsible({ subjectId, isFirst }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <CollapsibleComp
      key={String(Math.floor(Number($.epsCount(subjectId)) / numbersOfLine))}
      collapsed={!$.$Item(subjectId).expand}
    >
      <Eps subjectId={subjectId} isFirst={isFirst} />
    </CollapsibleComp>
  ))
}

export default Collapsible
