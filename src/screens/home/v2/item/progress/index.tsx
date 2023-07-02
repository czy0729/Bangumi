/*
 * @Author: czy0729
 * @Date: 2021-01-21 16:01:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-02 11:22:51
 */
import React from 'react'
import { OnairProgress } from '@_'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'

function Progress({ epStatus, subjectId }, { $ }: Ctx) {
  const { homeListCompact } = systemStore.setting
  return (
    <OnairProgress
      key={String($.$Item(subjectId).doing)}
      epStatus={epStatus}
      current={$.currentOnAir(subjectId)}
      total={$.epsCount(subjectId)}
      height={homeListCompact ? 5 : 6}
    />
  )
}

export default obc(Progress)
