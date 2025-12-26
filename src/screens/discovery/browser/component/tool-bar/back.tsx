/*
 * @Author: czy0729
 * @Date: 2022-06-04 07:01:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 06:58:12
 */
import React from 'react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'

import type { Ctx } from '../../types'

function Back() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => (
    <ToolBar.Icon icon='md-arrow-back' iconColor={_.colorDesc} onSelect={$.onAirdatePrev} />
  ))
}

export default Back
