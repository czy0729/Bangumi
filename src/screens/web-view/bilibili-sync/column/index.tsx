/*
 * @Author: czy0729
 * @Date: 2022-04-27 06:03:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 19:29:54
 */
import React from 'react'
import { Flex, Text } from '@components'
import { ob } from '@utils/decorators'

function Column({
  style = undefined,
  type = undefined,
  text = undefined,
  right = undefined,
  onPress = undefined
}) {
  return (
    <Flex style={style}>
      <Text size={11} type={!text || text === '/' ? 'sub' : type} onPress={onPress}>
        {text || '__'}
      </Text>
      {right}
    </Flex>
  )
}

export default ob(Column)
