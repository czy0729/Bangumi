/*
 * @Author: czy0729
 * @Date: 2023-04-12 08:06:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-30 07:29:34
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex } from '../../flex'
import { Text } from '../../text'
import { styles } from './styles'

function TextOnly({ style }) {
  return (
    <Flex style={style} justify='center'>
      <Text style={styles.textOnly} type='sub' size={10} bold align='center'>
        text-only
      </Text>
    </Flex>
  )
}

export default observer(TextOnly)
