/*
 * @Author: czy0729
 * @Date: 2021-10-19 17:56:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-05 11:22:08
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Text, Iconfont, Heatmap } from '@components'
import { _ } from '@stores'

const BtnMain = ({ item, onPress }) => {
  const styles = memoStyles()
  const { key, name, text, icon, size } = item
  if (key === 'Split') {
    return (
      <View style={_.container.touch}>
        <View style={styles.wrap}>
          <Flex style={styles.item} justify='center'>
            <View style={styles.split} />
          </Flex>
        </View>
      </View>
    )
  }

  const content = (
    <Flex style={styles.wrap} justify='center'>
      <Flex style={styles.item} direction='column' justify='center'>
        <View style={styles.iconWrap}>
          <Flex style={styles.icon} justify='center'>
            {text ? (
              <Text type='__plain__' size={size || 16} bold>
                {text}
              </Text>
            ) : (
              <Iconfont name={icon} size={size || 24} color={_.__colorPlain__} />
            )}
          </Flex>
        </View>
        <Text style={_.mt.sm} size={13} align='center' bold>
          {name}
        </Text>
      </Flex>
    </Flex>
  )

  if (onPress) {
    return (
      <Touchable style={_.container.touch} onPress={onPress}>
        {content}
        <Heatmap
          id='发现.跳转'
          data={{
            to: key,
            alias: name
          }}
        />
      </Touchable>
    )
  }

  return <View style={_.container.touch}>{content}</View>
}

export default BtnMain

const size = 50 * _.ratio
const memoStyles = _.memoStyles(() => ({
  wrap: {
    width: (_.windowSm.width - 2 * _.windSm) * 0.249,
    paddingVertical: _.sm + 4
  },
  item: {
    width: (_.windowSm.width - 2 * _.windSm) / 4
  },
  split: {
    width: 3,
    height: 28,
    backgroundColor: _.select(_.colorDesc, _._colorDarkModeLevel2),
    borderRadius: 2
  },
  iconWrap: {
    width: size
  },
  icon: {
    width: size,
    height: size,
    backgroundColor: _.select(_.colorDesc, _._colorDarkModeLevel1),
    borderRadius: size
  }
}))
