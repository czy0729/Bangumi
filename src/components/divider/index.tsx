/*
 * 分割线
 * @Author: czy0729
 * @Date: 2019-03-29 03:42:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-19 13:51:58
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex } from '../flex'
import { memoStyles } from './styles'
import { Props as DividerProps } from './types'

export { DividerProps }

export const Divider = observer(({ style }: DividerProps) => {
  const styles = memoStyles()
  return (
    <Flex style={[styles.divider, style]} justify='center'>
      <View style={styles.line} />
      {/* <View style={styles.dot} /> */}
      {/* <View style={styles.dot} /> */}
    </Flex>
  )
})
