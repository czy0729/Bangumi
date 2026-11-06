/*
 * @Author: czy0729
 * @Date: 2024-01-01 20:26:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-06 18:20:00
 *
 * 收藏分类标签文字 (props 驱动, 浅比较)
 */
import { Flex, Text } from '@components'
import { memo } from '@utils/decorators'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

import type { LabelProps } from './types'

const TabBarLabel = memo(
  ({ style, title = '', count = 0, focused = false }: LabelProps) => {
    return (
      <Flex style={style} justify='center' align='start'>
        <Text type='title' size={13} bold={focused} noWrap>
          {title}
        </Text>
        {!!count && (
          <Text type='sub' size={10} lineHeight={11} bold>
            {' '}
            {count}{' '}
          </Text>
        )}
      </Flex>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default TabBarLabel
