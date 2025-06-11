/*
 * @Author: czy0729
 * @Date: 2025-06-10 17:43:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-11 23:03:44
 */
import React from 'react'
import { Flex, Text } from '@components'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import Pagination from '../pagination'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Empty() {
  r(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <>
        <Flex style={styles.container} direction='column' justify='center'>
          <Text type='sub' size={16} bold>
            没有相关数据
          </Text>
        </Flex>
        <Pagination />
      </>
    )
  })
}

export default Empty
