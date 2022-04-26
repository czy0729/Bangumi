/*
 * @Author: czy0729
 * @Date: 2022-04-27 06:03:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-27 06:43:20
 */
import React from 'react'
import { Text } from '@components'
import { ob } from '@utils/decorators'

function Column({ style, type, text, onPress }) {
  return (
    <Text style={style} size={11} type={!text ? 'sub' : type} onPress={onPress}>
      {text || '__'}
    </Text>
  )
}

export default ob(Column)
