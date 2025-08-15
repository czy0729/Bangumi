/*
 * @Author: czy0729
 * @Date: 2024-07-10 10:55:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-04 15:57:44
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Highlight, Touchable } from '@components'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'

function Item({ filter, label, value, show, onPress }) {
  const styles = memoStyles()
  return (
    <Flex.Item>
      <Touchable animate onPress={() => onPress(value)}>
        <Flex style={styles.tab} justify='center' direction='column'>
          <Highlight type={show ? undefined : 'icon'} size={13} bold align='center' value={filter}>
            {label}
          </Highlight>
        </Flex>
        {!show && <View style={styles.disabledLine} />}
      </Touchable>
    </Flex.Item>
  )
}

export default ob(Item)
