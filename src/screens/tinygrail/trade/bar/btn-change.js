/*
 * @Author: czy0729
 * @Date: 2019-09-02 14:59:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:23:25
 */
import React from 'react'
import { Text } from '@components'
import { obc } from '@utils/decorators'

function BtnChange({ value, text }, { $ }) {
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
