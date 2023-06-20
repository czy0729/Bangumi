/*
 * @Author: czy0729
 * @Date: 2023-06-20 10:03:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-20 10:16:29
 */
import React from 'react'
import { Flex, Text } from '@components'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'

function TextOnly({ width, height, radius, onPress }) {
  const styles = memoStyles()
  return (
    <Flex
      style={stl(
        styles.textOnly,
        {
          width,
          height
        },
        radius && styles.radius
      )}
      justify='center'
    >
      <Text type='sub' bold onPress={onPress}>
        text-only
      </Text>
    </Flex>
  )
}

export default ob(TextOnly)
