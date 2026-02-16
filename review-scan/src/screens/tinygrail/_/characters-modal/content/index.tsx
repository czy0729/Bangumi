/*
 * @Author: czy0729
 * @Date: 2025-05-03 16:14:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-03 16:28:23
 */
import React from 'react'
import { Flex } from '@components'
import { useObserver } from '@utils/hooks'
import { memoStyles } from './styles'

function Content({ children }) {
  return useObserver(() => {
    const styles = memoStyles()
    return <Flex style={styles.content}>{children}</Flex>
  })
}

export default Content
