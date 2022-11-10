/*
 * @Author: czy0729
 * @Date: 2019-09-02 14:59:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-11 04:09:54
 */
import React from 'react'
import { Text } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function BtnChange({ value, text }, { $ }: Ctx) {
  const { distance } = $.state
  return (
    <Text
      type={distance === value ? 'warning' : 'tinygrailText'}
      size={13}
      onPress={() => $.changeDistance(value)}
    >
      {text}
    </Text>
  )
}

export default obc(BtnChange)
