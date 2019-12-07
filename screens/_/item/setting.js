/*
 * @Author: czy0729
 * @Date: 2019-05-24 02:02:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-08 02:21:11
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Touchable, Flex, Text, Iconfont } from '@components'
import { _ } from '@stores'

function ItemSetting({ style, border, hd, ft, arrow, onPress, ...other }) {
  const styles = memoStyles()
  const content = (
    <Flex style={[styles.item, border && styles.border]}>
      <Flex.Item>
        <Text size={16}>{hd}</Text>
      </Flex.Item>
      {typeof ft === 'string' ? (
        <Text size={16} type='sub'>
          {ft}
        </Text>
      ) : (
        ft
      )}
      {arrow && <Iconfont style={_.ml.xs} name='right' size={16} />}
    </Flex>
  )

  if (onPress) {
    return (
      <Touchable style={[styles.touchable, style]} onPress={onPress} {...other}>
        {content}
      </Touchable>
    )
  }

  return (
    <View style={[styles.touchable, style]} {...other}>
      {content}
    </View>
  )
}

export default observer(ItemSetting)

const memoStyles = _.memoStyles(_ => ({
  touchable: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  item: {
    height: 56,
    paddingRight: _.wind
  },
  border: {
    borderTopWidth: _.hairlineWidth,
    borderTopColor: _.colorBorder
  }
}))
