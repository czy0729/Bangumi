/*
 * @Author: czy0729
 * @Date: 2023-04-12 08:06:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-06 19:20:34
 */
import { memo } from 'react'
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

export default memo(TextOnly)
