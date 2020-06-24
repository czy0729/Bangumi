/*
 * @Author: czy0729
 * @Date: 2019-05-24 02:02:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-24 21:33:08
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Touchable, Flex, Text, Iconfont } from '@components'
import { _ } from '@stores'

function ItemSetting({ style, hd, ft, arrow, information, onPress, ...other }) {
  const styles = memoStyles()
  const content = (
    <View style={styles.item}>
      <Flex>
        <Flex.Item>
          <Text type='title' size={17} bold>
            {hd}
          </Text>
        </Flex.Item>
        {typeof ft === 'string' ? (
          <Text type='sub' size={15}>
            {ft}
          </Text>
        ) : (
          ft
        )}
        {arrow && <Iconfont style={_.ml.xs} name='right' />}
      </Flex>
      {information && (
        <Text style={styles.information} type='sub' size={13} lineHeight={15}>
          {information}
        </Text>
      )}
    </View>
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
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  information: {
    marginTop: _.sm,
    maxWidth: '88%'
  }
}))
