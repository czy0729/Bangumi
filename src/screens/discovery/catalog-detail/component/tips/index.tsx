/*
 * @Author: czy0729
 * @Date: 2022-04-17 17:09:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-10 05:06:17
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Progress } from '@components'
import { useStore } from '@stores'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Tips() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { fetching, message, current, total } = $.state.progress

  return <Progress show={fetching} message={message} current={current} total={total} />
}

export default observer(Tips)
