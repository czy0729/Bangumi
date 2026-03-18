/*
 * @Author: czy0729
 * @Date: 2019-03-13 22:49:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-18 04:49:21
 */
import React, { useRef } from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { Component } from '../component'
import { Flex } from '../flex'
import { Mesume } from '../mesume'
import { randomSpeech } from '../mesume/utils'
import { Text } from '../text'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props as EmptyProps } from './types'
export type { EmptyProps }

/** 空占位 */
export const Empty = observer(({ text, children }: EmptyProps) => {
  r(COMPONENT)

  const randomRef = useRef(randomSpeech())

  return (
    <Component id='component-empty'>
      <Flex style={styles.empty} direction='column' justify='center'>
        <Mesume size={80} />
        <Text style={_.mt.sm} type='sub' align='center'>
          {text || randomRef.current}
        </Text>
        {children}
      </Flex>
    </Component>
  )
})

export default Empty
