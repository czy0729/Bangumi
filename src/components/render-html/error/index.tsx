/*
 * @Author: czy0729
 * @Date: 2020-01-23 17:40:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 03:02:34
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex } from '../../flex'
import { Text } from '../../text'
import { memoStyles } from './styles'

function Error() {
  const styles = memoStyles()

  return (
    <Flex style={styles.error} justify='center' direction='column'>
      <Text type='sub' size={13} align='center'>
        网页结构解释错误
      </Text>
    </Flex>
  )
}

export default observer(Error)
