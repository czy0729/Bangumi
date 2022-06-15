/*
 * @Author: czy0729
 * @Date: 2019-05-08 20:23:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-15 12:22:45
 */
import React from 'react'
import { Flex, Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { ColorValue, Navigation, ViewStyle } from '@types'

type Props = {
  navigation: Navigation
  style?: ViewStyle
  color?: ColorValue
}

export const IconBack = ob(({ navigation, style, color = _.colorPlain }: Props) => (
  <Touchable style={[styles.touch, style]} onPress={navigation.goBack}>
    <Flex style={styles.icon} justify='center'>
      <Iconfont name='md-arrow-back' color={color} />
    </Flex>
  </Touchable>
))

const styles = _.create({
  touch: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  icon: {
    width: 36,
    height: 36
  }
})
