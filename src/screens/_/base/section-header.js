/*
 * @Author: czy0729
 * @Date: 2019-04-18 16:34:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-08 14:51:05
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

export const SectionHeader = ob(
  ({ style, type = 'title', size = 14, right, children }) => {
    const styles = memoStyles()
    return (
      <Flex style={[styles.section, style]}>
        <Flex.Item>
          <Text type={type} size={size} bold>
            {children}{' '}
          </Text>
        </Flex.Item>
        {right}
      </Flex>
    )
  }
)

const memoStyles = _.memoStyles(() => ({
  section: {
    paddingVertical: _.sm + _.xs,
    paddingHorizontal: _.wind,
    backgroundColor: _.colorBg
  }
}))
