/*
 * @Author: czy0729
 * @Date: 2019-04-18 16:34:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-27 05:35:43
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { _ } from '@stores'

function SectionHeader({ style, type, size, right, children }) {
  const styles = memoStyles()
  return (
    <Flex style={[styles.section, style]}>
      <Flex.Item>
        <Text type={type} size={size} bold>
          {children}
        </Text>
      </Flex.Item>
      {right}
    </Flex>
  )
}

SectionHeader.defaultProps = {
  type: 'title',
  size: 14
}

export default observer(SectionHeader)

const memoStyles = _.memoStyles(_ => ({
  section: {
    paddingVertical: _.sm + _.xs,
    paddingHorizontal: _.wind,
    backgroundColor: _.colorBg
  }
}))
