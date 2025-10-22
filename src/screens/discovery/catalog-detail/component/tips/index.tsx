/*
 * @Author: czy0729
 * @Date: 2022-04-17 17:09:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-22 01:18:51
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
    const { fetching, message, current, total } = $.state.progress

    return <Progress show={fetching} message={message} current={current} total={total} />
  })
}

export default Tips
