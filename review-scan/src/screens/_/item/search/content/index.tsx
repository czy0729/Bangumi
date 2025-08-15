/*
 * @Author: czy0729
 * @Date: 2025-01-25 23:16:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-25 23:19:49
 */
import React from 'react'
import { Flex } from '@components'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { styles } from './styles'

function Content({ tip, comments, position, isMusic, children }) {
  const justify = tip || position ? 'between' : 'start'
  return (
    <Flex
      style={stl(styles.content, !!comments && styles.flux, isMusic && styles.music)}
      direction='column'
      justify={justify}
      align='start'
    >
      {children}
    </Flex>
  )
}

export default ob(Content)
