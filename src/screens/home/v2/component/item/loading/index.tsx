/*
 * @Author: czy0729
 * @Date: 2024-01-20 09:42:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-20 09:44:49
 */
import React from 'react'
import { Loading as LoadingComp } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { SubjectId } from '@types'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'

function Loading(
  {
    subjectId
  }: {
    subjectId: SubjectId
  },
  { $ }: Ctx
) {
  const { progress } = $.state
  if (progress.fetchingSubjectId1 !== subjectId && progress.fetchingSubjectId2 !== subjectId) {
    return null
  }

  return <LoadingComp.Medium color={_.colorSub} size={16} />
}

export default obc(Loading, COMPONENT)
