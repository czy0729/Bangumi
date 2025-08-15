/*
 * @Author: czy0729
 * @Date: 2021-01-21 16:01:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-30 05:32:29
 */
import React from 'react'
import { OnairProgress } from '@_'
import { systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { SubjectId } from '@types'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'

function Progress({ subjectId, epStatus }: { subjectId: SubjectId; epStatus: string | number }) {
  const { $ } = useStore<Ctx>()
  const total = $.epsCount(subjectId)
  let current = $.currentOnAir(subjectId)

  // 有一种情况为多季度番剧, 章节数非 0 或 1 开始的
  // 会出现当前集数比总章节数多的情况, 需要使用实际放送章节数代替当前章节数
  if (current > total) {
    current = $.epsNoSp(subjectId).filter(item => item.status === 'Air').length
  }

  return (
    <OnairProgress
      epStatus={epStatus || 0}
      total={Math.max(current || 0, total || 0)}
      current={current || 0}
      height={systemStore.setting.homeListCompact ? 5 : 6}
    />
  )
}

export default ob(Progress, COMPONENT)
