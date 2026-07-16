/*
 * @Author: czy0729
 * @Date: 2025-07-17 17:05:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 05:45:03
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { MAX_PREV } from '../../ds'
import { getWeekData } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

/** 工具栏 */
function ToolBar() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { prev } = $.state

  return (
    <Flex style={styles.toolBar} justify='around'>
      <Flex>
        <IconTouchable
          name='md-navigate-before'
          color={prev === MAX_PREV ? _.colorTinygrailIcon : _.colorTinygrailPlain}
          size={18}
          onPress={() => {
            $.onSubtractDay(1)
          }}
        />
        <Text type='tinygrailPlain' size={12} bold>
          {getWeekData(prev)}
        </Text>
        <IconTouchable
          name='md-navigate-next'
          color={prev === 0 ? _.colorTinygrailIcon : _.colorTinygrailPlain}
          size={18}
          onPress={() => {
            $.onSubtractDay(-1)
          }}
        />
      </Flex>
    </Flex>
  )
}

export default observer(ToolBar)
