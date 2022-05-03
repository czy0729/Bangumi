/*
 * @Author: czy0729
 * @Date: 2019-03-13 22:49:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-03 18:21:36
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { randomSpeech } from '@constants/speech'
import { Flex } from '../flex'
import { Text } from '../text'
import { Mesume } from '../mesume'
import { styles } from './styles'

export const Empty = observer(() => (
  <Flex style={styles.empty} direction='column' justify='center'>
    <Mesume size={80} />
    <Text style={_.mt.sm} type='sub' align='center'>
      {randomSpeech()}
    </Text>
  </Flex>
))
