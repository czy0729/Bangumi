/*
 * @Author: czy0729
 * @Date: 2023-06-28 08:53:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-28 08:54:07
 */
import React from 'react'
import { Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'

function Join({ style }, { $ }: Ctx) {
  const { join } = $.users
  return (
    <Text style={style} type={_.select('plain', 'title')} size={11} bold noWrap>
      {join || '- 加入'}
    </Text>
  )
}

export default obc(Join)
