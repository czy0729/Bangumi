/*
 * @Author: czy0729
 * @Date: 2021-01-21 16:01:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-21 08:41:27
 */
import React from 'react'
import { OnairProgress } from '@_'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'

function Progress({ epStatus, subjectId }, { $ }: Ctx) {
  return (
    <OnairProgress
      key={String($.$Item(subjectId).doing)}
      epStatus={epStatus}
      current={$.currentOnAir(subjectId)}
      total={$.epsCount(subjectId)}
      height={6}
    />
  )
}

export default obc(Progress)
