/*
 * @Author: czy0729
 * @Date: 2022-04-17 17:09:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 07:41:25
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Progress } from '@components'
import { useStore } from '@stores'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Tips() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { progress } = $.state

  return (
    <Progress
      show={progress.fetching}
      message={progress.message}
      current={progress.current}
      total={progress.total}
    />
  )
}

export default observer(Tips)
