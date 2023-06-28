/*
 * @Author: czy0729
 * @Date: 2023-06-28 08:56:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-28 08:57:26
 */
import React from 'react'
import { Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'

function Sync({ style }, { $ }: Ctx) {
  const { percent } = $.users
  return (
    <Text style={style} type={_.select('plain', 'title')} size={11} bold noWrap>
      同步率 {isNaN(percent) ? '-' : percent}%
    </Text>
  )
}

export default obc(Sync)
