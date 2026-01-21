/*
 * @Author: czy0729
 * @Date: 2024-01-20 08:29:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-20 09:46:48
 */
import React from 'react'
import { Collapsible as CollapsibleComp } from '@components'
import { numbersOfLine } from '@_/base/eps/ds'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { SubjectId } from '@types'
import { Ctx } from '../../../types'
import Eps from '../eps'
import { COMPONENT } from './ds'

function Collapsible({ subjectId, isFirst }: { subjectId: SubjectId; isFirst: boolean }) {
  const { $ } = useStore<Ctx>()
  return (
    <CollapsibleComp
      key={String(Math.floor(Number($.epsCount(subjectId)) / numbersOfLine))}
      collapsed={!$.$Item(subjectId).expand}
    >
      <Eps subjectId={subjectId} isFirst={isFirst} />
    </CollapsibleComp>
  )
}

export default ob(Collapsible, COMPONENT)
