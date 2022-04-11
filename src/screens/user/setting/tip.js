/*
 * @Author: czy0729
 * @Date: 2022-01-22 16:17:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-12 04:08:03
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

function Tip({ children }) {
  const styles = memoStyles()
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

const memoStyles = _.memoStyles(() => ({
  tip: {
    paddingTop: _.md,
    paddingHorizontal: _._wind,
    paddingBottom: _.sm
  }
}))
