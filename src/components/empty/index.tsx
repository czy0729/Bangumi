/*
 * @Author: czy0729
 * @Date: 2019-03-13 22:49:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-20 18:02:40
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { Flex } from '../flex'
import { Text } from '../text'
import { Mesume } from '../mesume'
import { randomSpeech } from '../mesume/utils'
import { styles } from './styles'
import { Props as EmptyProps } from './types'

export { EmptyProps }

export const Empty = observer(({ text }: EmptyProps) => (
  <Flex style={styles.empty} direction='column' justify='center'>
    <Mesume size={80} />
    <Text style={_.mt.sm} type='sub' align='center'>
      {text || randomSpeech()}
    </Text>
  </Flex>
))
