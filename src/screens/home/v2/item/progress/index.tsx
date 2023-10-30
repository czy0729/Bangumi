/*
 * @Author: czy0729
 * @Date: 2021-01-21 16:01:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-30 22:46:43
 */
import React from 'react'
import { OnairProgress } from '@_'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'

function Progress({ epStatus, subjectId }, { $ }: Ctx) {
  const { homeListCompact } = systemStore.setting
  const total = $.epsCount(subjectId)
  let current = $.currentOnAir(subjectId)

  // 有一种情况为多季度番剧, 章节数非 0 或 1 开始的
  // 会出现当前集数比总章节数多的情况, 需要使用实际放送章节数代替当前章节数
  if (current > total) {
    current = $.epsNoSp(subjectId).filter(item => item.status === 'Air').length
  }

  return (
    <OnairProgress
      key={String($.$Item(subjectId).doing)}
      epStatus={epStatus}
      total={total}
      current={current}
      height={homeListCompact ? 5 : 6}
    />
  )
}

export default obc(Progress)
