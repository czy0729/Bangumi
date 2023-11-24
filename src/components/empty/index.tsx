/*
 * 空占位组件
 * @Author: czy0729
 * @Date: 2019-03-13 22:49:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-24 16:53:50
 */
import React, { useRef } from 'react'
import { useObserver } from 'mobx-react'
import { _ } from '@stores'
import { Component } from '../component'
import { Flex } from '../flex'
import { Text } from '../text'
import { Mesume } from '../mesume'
import { randomSpeech } from '../mesume/utils'
import { styles } from './styles'
import { Props as EmptyProps } from './types'

export { EmptyProps }

export const Empty = ({ text }: EmptyProps) => {
  const random = useRef(randomSpeech())
  return useObserver(() => (
    <Component id='component-empty'>
      <Flex style={styles.empty} direction='column' justify='center'>
        <Mesume size={80} />
        <Text style={_.mt.sm} type='sub' align='center'>
          {text || random.current}
        </Text>
      </Flex>
    </Component>
  ))
}
