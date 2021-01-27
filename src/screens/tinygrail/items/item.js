/*
 * @Author: czy0729
 * @Date: 2020-07-01 17:20:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:16:54
 */
import React from 'react'
import { Touchable, Flex, Text } from '@components'
import { Avatar } from '@screens/_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { tinygrailOSS } from '@utils/app'

function Item({ src, id, level, name, extra, disabled, onPress }) {
  const styles = memoStyles()
  return (
    <Touchable onPress={onPress}>
      <Flex style={[styles.item, disabled && styles.disabled]}>
        {src ? (
          <Avatar
            style={styles.avatar}
            src={tinygrailOSS(src)}
            size={28}
            borderColor='transparent'
          />
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

export default ob(Item)

const memoStyles = _.memoStyles(_ => ({
  item: {
    paddingVertical: 8
  },
  disabled: {
    opacity: 0.4
  },
  avatar: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  }
}))
