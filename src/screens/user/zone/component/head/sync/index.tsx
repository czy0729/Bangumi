/*
 * @Author: czy0729
 * @Date: 2023-06-28 08:56:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-19 04:50:06
 */
import React from 'react'
import { Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'

function Sync({ style }, { $ }: Ctx) {
  const { percent, hobby } = $.users
  return (
    <Text style={style} type={_.select('plain', 'title')} size={11} bold shadow noWrap>
      同步率 {isNaN(percent) ? '-' : percent}% ({hobby})
    </Text>
  )
}

export default obc(Sync)
