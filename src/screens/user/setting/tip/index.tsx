/*
 * @Author: czy0729
 * @Date: 2022-01-22 16:17:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-01 17:51:34
 */
import React from 'react'
import { Flex, Text } from '@components'
import { ob } from '@utils/decorators'
import { styles } from './styles'

function Tip({ children }) {
  return (
    <Flex style={styles.tip}>
      <Flex.Item>
        <Text type='sub' bold>
          {children}
        </Text>
      </Flex.Item>
    </Flex>
  )
}

export default ob(Tip)
