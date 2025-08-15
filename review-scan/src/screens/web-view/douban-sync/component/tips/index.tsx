/*
 * @Author: czy0729
 * @Date: 2022-10-17 00:02:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 05:42:20
 */
import React from 'react'
import { Progress } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function Tips() {
  const { $ } = useStore<Ctx>()
  const { fetching, message, current, total } = $.state.progress
  return <Progress show={fetching} message={message} current={current} total={total} />
}

export default ob(Tips, COMPONENT)
