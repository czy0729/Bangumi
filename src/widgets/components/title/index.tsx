/*
 * @Author: czy0729
 * @Date: 2023-05-23 19:50:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-23 19:52:05
 */
import React from 'react'
import { FlexWidget as Flex, TextWidget as Text } from 'react-native-android-widget'
import { styles } from './styles'

export function Title({ text = '' }: any) {
  return (
    <Flex style={styles.title}>
      <Text style={styles.titleText} text={text} />
    </Flex>
  )
}
