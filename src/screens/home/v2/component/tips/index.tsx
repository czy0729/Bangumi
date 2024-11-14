/*
 * @Author: czy0729
 * @Date: 2022-04-17 17:09:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-12 17:19:53
 */
import React from 'react'
import { Progress } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function Tips() {
  const { $ } = useStore<Ctx>()
  return (
    <Progress
      show={$.state.progress.fetching}
      message={$.state.progress.message}
      current={$.state.progress.current}
      total={$.state.progress.total}
    />
  )
}

export default ob(Tips, COMPONENT)
