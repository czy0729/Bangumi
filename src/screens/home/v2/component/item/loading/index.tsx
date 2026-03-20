/*
 * @Author: czy0729
 * @Date: 2024-01-20 09:42:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 07:37:26
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Loading as LoadingComp } from '@components'
import { _, useStore } from '@stores'
import { COMPONENT } from './ds'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function Loading({ subjectId }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { progress } = $.state
  if (progress.fetchingSubjectId1 !== subjectId && progress.fetchingSubjectId2 !== subjectId)
    return null

  return <LoadingComp.Medium color={_.colorSub} size={16} />
}

export default observer(Loading)
