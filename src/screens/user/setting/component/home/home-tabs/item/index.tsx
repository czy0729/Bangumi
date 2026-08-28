/*
 * @Author: czy0729
 * @Date: 2024-07-10 10:55:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-28 02:49:43
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Highlight, Touchable } from '@components'
import { _ } from '@stores'
import { memoStyles } from './styles'

import type { Props } from './types'

function Item<T = string>({ filter, label, value, show, onPress }: Props<T>) {
  const styles = memoStyles()

  return (
    <Flex.Item>
      <Touchable animate onPress={() => onPress(value)}>
        <Flex style={styles.tab} justify='center' direction='column'>
          <Highlight
            type={show ? undefined : _.select('sub', 'icon')}
            size={13}
            bold
            align='center'
            value={filter}
          >
            {label}
          </Highlight>
        </Flex>
        {!show && <View style={styles.disabledLine} />}
      </Touchable>
    </Flex.Item>
  )
}

export default observer(Item) as <T>(props: Props<T>) => React.JSX.Element
