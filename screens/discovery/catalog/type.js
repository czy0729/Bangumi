/*
 * @Author: czy0729
 * @Date: 2020-01-05 20:45:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-05 20:58:27
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Touchable, Text } from '@components'

function Type({ style, $ }) {
  const { type } = $.state
  return (
    <Touchable
      style={[
        style,
        {
          padding: 2
        }
      ]}
      onPress={$.toggleType}
    >
      <Text>{type === 'collect' ? '按热门' : '按最新'}</Text>
    </Touchable>
  )
}

export default observer(Type)
