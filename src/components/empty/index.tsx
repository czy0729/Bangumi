/*
 * @Author: czy0729
 * @Date: 2019-03-13 22:49:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-22 19:09:20
 */
import React, { useRef } from 'react'
import { useObserver } from 'mobx-react'
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
export const Empty = ({ text, children }: EmptyProps) => {
  r(COMPONENT)

  const random = useRef(randomSpeech())
  return useObserver(() => (
    <Component id='component-empty'>
      <Flex style={styles.empty} direction='column' justify='center'>
        <Mesume size={80} />
        <Text style={_.mt.sm} type='sub' align='center'>
          {text || random.current}
        </Text>
        {children}
      </Flex>
    </Component>
  ))
}

export default Empty
