/*
 * @Author: czy0729
 * @Date: 2023-06-28 08:56:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:04:01
 */
import React from 'react'
import { Text } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'

function Sync({ style }) {
  const { $ } = useStore<Ctx>()
  const { percent, hobby } = $.users
  return (
    <Text style={style} type={_.select('plain', 'title')} size={11} bold shadow noWrap>
      同步率 {isNaN(percent) ? '-' : percent}% ({hobby})
    </Text>
  )
}

export default ob(Sync)
