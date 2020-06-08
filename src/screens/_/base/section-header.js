/*
 * @Author: czy0729
 * @Date: 2019-04-18 16:34:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-19 19:35:19
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { _ } from '@stores'

function SectionHeader({ style, size, right, children }) {
  const styles = memoStyles()
  return (
    <Flex style={[styles.section, style]}>
      <Flex.Item>
        <Text type='sub' size={size}>
          {children}
        </Text>
      </Flex.Item>
      {right}
    </Flex>
  )
}

SectionHeader.defaultProps = {
  size: 12
}

export default observer(SectionHeader)

const memoStyles = _.memoStyles(_ => ({
  section: {
    paddingVertical: _.sm,
    paddingHorizontal: _.wind,
    backgroundColor: _.colorBg
  }
}))
