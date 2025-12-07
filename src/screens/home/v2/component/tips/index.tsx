/*
 * @Author: czy0729
 * @Date: 2022-04-17 17:09:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 05:57:49
 */
import React from 'react'
import { Progress } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Tips() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { progress } = $.state

    return (
      <Progress
        show={progress.fetching}
        message={progress.message}
        current={progress.current}
        total={progress.total}
      />
    )
  })
}

export default Tips
