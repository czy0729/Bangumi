/*
 * @Author: czy0729
 * @Date: 2022-10-17 00:02:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 05:42:20
 */
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
