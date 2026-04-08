/*
 * @Author: czy0729
 * @Date: 2025-05-03 16:14:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-03 16:28:23
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex } from '@components'
import { memoStyles } from './styles'

function Content({ children }) {
  const styles = memoStyles()

  return <Flex style={styles.content}>{children}</Flex>
}

export default observer(Content)
