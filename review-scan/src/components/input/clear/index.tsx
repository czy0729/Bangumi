/*
 * @Author: czy0729
 * @Date: 2023-03-11 11:20:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 12:58:55
 */
import React from 'react'
import { IOS } from '@constants'
import { Iconfont } from '../../iconfont'
import { Flex } from '../../flex'
import { Touchable } from '../../touchable'
import { styles } from './styles'

function Clear({ color, onPress }) {
  if (IOS) return null

  return (
    <Touchable style={styles.close} useRN onPress={onPress}>
      <Flex style={styles.icon} justify='center'>
        <Iconfont name='md-close' size={16} color={color} />
      </Flex>
    </Touchable>
  )
}

export default Clear
