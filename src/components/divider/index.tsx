/*
 * @Author: czy0729
 * @Date: 2019-03-29 03:42:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-10 07:38:28
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { Component } from '../component'
import { Flex } from '../flex'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props as DividerProps } from './types'

export type { DividerProps }

/** 分割线 */
export function Divider({ style }: DividerProps) {
  r(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <Component id='component-divider'>
        <Flex style={stl(styles.divider, style)} justify='center'>
          <View style={styles.line} />
        </Flex>
      </Component>
    )
  })
}

export default Divider
