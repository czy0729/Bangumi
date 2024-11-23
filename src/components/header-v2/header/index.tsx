/*
 * @Author: czy0729
 * @Date: 2022-03-23 00:51:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-23 14:23:21
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { BlurView } from 'expo-blur'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { Flex } from '../../flex'
import { Text } from '../../text'
import Back from '../back'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

const BLUR = false

function Header({ title, headerRight }) {
  r(COMPONENT)

  const styles = memoStyles()
  return (
    <Flex style={styles.header}>
      {BLUR ? (
        <BlurView style={styles.bg} tint='dark' intensity={80} />
      ) : (
        <View style={stl(styles.bg, _.container.plain)} />
      )}
      <Flex style={styles.title} justify='center'>
        <Text style={styles.titleText} size={16} numberOfLines={1}>
          {title}
        </Text>
      </Flex>
      <Back />
      <Flex.Item />
      {!!headerRight && headerRight()}
    </Flex>
  )
}

export default observer(Header)
