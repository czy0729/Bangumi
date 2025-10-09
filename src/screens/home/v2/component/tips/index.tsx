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
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function Tips() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <Progress
      show={$.state.progress.fetching}
      message={$.state.progress.message}
      current={$.state.progress.current}
      total={$.state.progress.total}
    />
  ))
}

export default Tips
