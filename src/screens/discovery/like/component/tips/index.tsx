/*
 * @Author: czy0729
 * @Date: 2023-06-10 06:00:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:41:28
 */
import React from 'react'
import { Progress } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function Tips() {
  const { $ } = useStore<Ctx>()
  const { fetching, message, current, total } = $.state
  return <Progress show={fetching} message={message} current={current} total={total} />
}

export default ob(Tips, COMPONENT)
