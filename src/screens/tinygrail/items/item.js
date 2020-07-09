/*
 * @Author: czy0729
 * @Date: 2020-07-01 17:20:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-09 13:53:31
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { Touchable, Flex, Text } from '@components'
import { Avatar } from '@screens/_'
import { _ } from '@stores'
import { tinygrailOSS } from '@utils/app'

function Item({ src, id, level, name, extra, disabled, onPress }) {
  return (
    <Touchable onPress={onPress}>
      <Flex style={[styles.item, disabled && styles.disabled]}>
        {src ? (
          <Avatar src={tinygrailOSS(src)} size={28} borderColor='transparent' />
        ) : (
          <Text type='tinygrailPlain' size={10} bold>
            #{id}{' '}
          </Text>
        )}
        <Flex.Item style={_.ml.sm}>
          <Text type='tinygrailPlain' size={10} bold numberOfLines={1}>
            <Text type='ask' size={10} bold>
              lv{level}{' '}
            </Text>
            {name}
          </Text>
          {!!extra && (
            <Text type='tinygrailText' size={10} numberOfLines={1}>
              {extra}
            </Text>
          )}
        </Flex.Item>
      </Flex>
    </Touchable>
  )
}

export default observer(Item)

const styles = StyleSheet.create({
  item: {
    paddingVertical: 8
  },
  disabled: {
    opacity: 0.4
  }
})
