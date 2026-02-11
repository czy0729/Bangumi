/*
 * @Author: czy0729
 * @Date: 2023-04-12 08:06:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-18 07:23:48
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Flex } from '../../flex'
import { Text } from '../../text'
import { styles } from './styles'

import type { WithViewStyles } from '@types'

function TextOnly({ style }: WithViewStyles) {
  return useObserver(() => (
    <Flex style={style} justify='center'>
      <Text style={styles.textOnly} type='sub' size={10} bold align='center'>
        {/* text-only */}
      </Text>
    </Flex>
  ))
}

export default TextOnly
