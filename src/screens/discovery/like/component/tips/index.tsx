/*
 * @Author: czy0729
 * @Date: 2023-06-10 06:00:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-15 12:00:00
 *
 * 请求进度
 */
import { observer } from 'mobx-react'
import { Progress } from '@components'
import { useStore } from '@stores'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Tips() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { fetching, message, current, total } = $.state

  return <Progress show={fetching} message={message} current={current} total={total} />
}

export default observer(Tips)
