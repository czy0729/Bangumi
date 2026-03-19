/*
 * @Author: czy0729
 * @Date: 2023-03-11 11:20:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 01:24:11
 */
import React from 'react'
import { observer } from 'mobx-react'
import { IOS } from '@constants'
import { Flex } from '../../flex'
import { Iconfont } from '../../iconfont'
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

export default observer(Clear)
