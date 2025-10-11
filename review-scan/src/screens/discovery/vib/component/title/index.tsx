/*
 * @Author: czy0729
 * @Date: 2024-05-04 05:23:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-04 18:54:24
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Title({ text, size }: { text: string; size?: string }) {
  const styles = memoStyles()
  const primary = size === 'primary'
  return (
    <Flex>
      <View style={stl(styles.title, primary && styles.primary)}>
        <Text size={primary ? 16 : 26} lineHeight={primary ? 26 : 36} bold>
          {text}
        </Text>
      </View>
    </Flex>
  )
}

export default ob(Title, COMPONENT)
