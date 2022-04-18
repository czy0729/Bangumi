/*
 * @Author: czy0729
 * @Date: 2022-04-17 17:09:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-18 09:42:28
 */
import React from 'react'
import { Progress } from '@components'
import { obc } from '@utils/decorators'

function Tips(props, { $ }) {
  const { fetching, message, current, total } = $.state
  return <Progress show={fetching} message={message} current={current} total={total} />
}

export default obc(Tips)
