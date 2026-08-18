/*
 * @Author: czy0729
 * @Date: 2026-08-18 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-18 10:00:00
 */
import { memo } from 'react'
import { Flex } from '@components/flex'
import { Text } from '@components/text'
import { _ } from '@stores'

import type { LabelProps } from './types'

/** Tab 标签 */
function TabLabel({ route, focused, textColor }: LabelProps) {
  return (
    <Flex style={_.container.block} justify='center'>
      <Text style={textColor && { color: textColor }} type='title' size={13} bold={focused}>
        {route.title}
      </Text>
    </Flex>
  )
}

export default memo(TabLabel)
