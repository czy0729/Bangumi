/*
 * @Author: czy0729
 * @Date: 2025-01-24 06:12:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-24 06:14:30
 */
import React from 'react'
import { Flex } from '@components'
import { ob } from '@utils/decorators'
import { styles } from './styles'

function Content({ comments, isCatalog, isEditable, children }) {
  let justify: 'between'
  if (!isCatalog || (!comments && !isEditable)) justify = 'between'

  return (
    <Flex style={!!justify && styles.content} direction='column' justify={justify} align='start'>
      {children}
    </Flex>
  )
}

export default ob(Content)
