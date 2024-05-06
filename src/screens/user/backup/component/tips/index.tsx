/*
 * @Author: czy0729
 * @Date: 2022-12-04 17:39:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-06 15:29:09
 */
import React from 'react'
import { Progress } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function Tips(props, { $ }: Ctx) {
  const { fetching, message, current, total } = $.state.progress
  return <Progress show={fetching} message={message} current={current} total={total} />
}

export default obc(Tips, COMPONENT)
