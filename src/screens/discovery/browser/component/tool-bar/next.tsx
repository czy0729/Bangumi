/*
 * @Author: czy0729
 * @Date: 2022-06-04 07:24:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 06:59:06
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'

import type { Ctx } from '../../types'

function Next() {
  const { $ } = useStore<Ctx>()

  return <ToolBar.Icon icon='md-arrow-forward' iconColor={_.colorDesc} onSelect={$.onAirdateNext} />
}

export default observer(Next)
