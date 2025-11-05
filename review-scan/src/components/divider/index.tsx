/*
 * @Author: czy0729
 * @Date: 2019-03-29 03:42:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 03:29:18
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { Component } from '../component'
import { Flex } from '../flex'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as DividerProps } from './types'

export { DividerProps }

/** 分割线 */
export const Divider = observer(({ style }: DividerProps) => {
  r(COMPONENT)

  const styles = memoStyles()
  return (
    <Component id='component-divider'>
      <Flex style={stl(styles.divider, style)} justify='center'>
        <View style={styles.line} />
      </Flex>
    </Component>
  )
})

export default Divider
