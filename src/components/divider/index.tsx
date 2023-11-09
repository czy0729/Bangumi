/*
 * 分割线
 * @Author: czy0729
 * @Date: 2019-03-29 03:42:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 12:56:48
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { stl } from '@utils'
import { Component } from '../component'
import { Flex } from '../flex'
import { memoStyles } from './styles'
import { Props as DividerProps } from './types'

export { DividerProps }

export const Divider = observer(({ style }: DividerProps) => {
  const styles = memoStyles()
  return (
    <Component id='component-divider'>
      <Flex style={stl(styles.divider, style)} justify='center'>
        <View style={styles.line} />
        {/* <View style={styles.dot} /> */}
        {/* <View style={styles.dot} /> */}
      </Flex>
    </Component>
  )
})
