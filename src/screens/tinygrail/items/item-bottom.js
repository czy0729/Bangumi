/*
 * @Author: czy0729
 * @Date: 2020-07-03 15:08:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-06 12:07:33
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Touchable, Flex, Text } from '@components'
import { Avatar } from '@screens/_'
import { _ } from '@stores'
import { tinygrailOSS } from '@utils/app'

function ItemBottom({ src, name, level, change, type, onPress }) {
  const styles = memoStyles()
  return (
    <Touchable onPress={onPress}>
      <Flex>
        <Avatar
          style={styles.avatar}
          src={tinygrailOSS(src)}
          size={28}
          name={name}
          borderColor='transparent'
        />
        <Flex.Item style={_.ml.sm}>
          <Text type='tinygrailPlain' size={10} bold numberOfLines={1}>
            <Text type='ask' size={10} bold>
              lv{level}{' '}
            </Text>
            {name}
          </Text>
          <Text type={type} size={10}>
            {change}
          </Text>
        </Flex.Item>
      </Flex>
    </Touchable>
  )
}

export default observer(ItemBottom)

const memoStyles = _.memoStyles(_ => ({
  avatar: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  }
}))
