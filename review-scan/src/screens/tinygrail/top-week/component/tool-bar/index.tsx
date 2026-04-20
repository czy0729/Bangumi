/*
 * @Author: czy0729
 * @Date: 2025-07-17 17:05:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-03 03:05:03
 */
import React from 'react'
import { Flex, Text } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { MAX_PREV } from '../../ds'
import { Ctx } from '../../types'
import { getWeekData } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function ToolBar() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()
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
  })
}

export default ToolBar
