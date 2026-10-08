/*
 * @Author: czy0729
 * @Date: 2021-01-21 16:01:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 07:38:11
 */
import { observer } from 'mobx-react'
import { OnairProgress } from '@_'
import { systemStore, useStore } from '@stores'
import { COMPONENT } from './ds'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function Progress({ subjectId, epStatus }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const total = $.epsCount(subjectId, true)
  const current = $.airedCount(subjectId)

  return (
    <OnairProgress
      epStatus={epStatus || 0}
      total={Math.max(current || 0, total || 0)}
      current={current || 0}
      height={systemStore.setting.homeListCompact ? 5 : 6}
    />
  )
}

export default observer(Progress)
