/*
 * @Author: czy0729
 * @Date: 2023-04-12 08:06:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-18 19:06:52
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex } from '../../flex'
import { Text } from '../../text'
import { styles } from './styles'

import type { WithViewStyles } from '@types'

function TextOnly({ style }: WithViewStyles) {
  return (
    <Flex style={style} justify='center'>
      <Text style={styles.textOnly} type='sub' size={10} bold align='center' />
    </Flex>
  )
}

export default observer(TextOnly)
