/*
 * @Author: czy0729
 * @Date: 2019-05-08 20:23:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-24 14:15:11
 */
import React from 'react'
import { Flex, Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

export const IconBack = ob(({ style, navigation, color = _.colorPlain }) => (
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
