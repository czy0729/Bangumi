/*
 * @Author: czy0729
 * @Date: 2025-07-17 17:05:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-17 18:31:26
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import TinygrailSegmentedControl from '@tinygrail/_/segmented-control'
import { Ctx } from '../../types'
import { getDay } from '../../utils'
import { COMPONENT, VALUES } from './ds'
import { memoStyles } from './styles'

function ToolBar() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()
    const { prev, sort, _loaded } = $.state
    return (
      <Flex style={styles.toolBar} justify='around'>
        <View style={styles.side} />
        <Flex>
          <IconTouchable
            name='md-navigate-before'
            color={Number(getDay(prev)) <= 250718 ? _.colorTinygrailIcon : _.colorTinygrailPlain}
            size={18}
            onPress={() => {
              $.onSubtractDay(1)
            }}
          />
          <Text type='tinygrailPlain' size={12} bold>
            {getDay(prev)} ({$.list.length})
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
        <View style={styles.side}>
          {!!_loaded && (
            <TinygrailSegmentedControl
              style={styles.segment}
              values={VALUES}
              selectedIndex={sort === 'amount' ? 1 : 0}
              onValueChange={$.onSort}
            />
          )}
        </View>
      </Flex>
    )
  })
}

export default ToolBar
