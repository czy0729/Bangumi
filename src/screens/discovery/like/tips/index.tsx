/*
 * @Author: czy0729
 * @Date: 2023-06-10 06:00:23
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-06-10 06:00:23
 */
import React from 'react'
import { Progress } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function Tips(props, { $ }: Ctx) {
  const { fetching, message, current, total } = $.state
  return <Progress show={fetching} message={message} current={current} total={total} />
}

export default obc(Tips)
