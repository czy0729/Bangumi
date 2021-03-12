/*
 * @Author: czy0729
 * @Date: 2021-02-28 14:52:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-12 14:01:41
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Image, Flex, Text } from '@components'
import { _ } from '@stores'
import { formatNumber } from '@utils'
import { obc } from '@utils/decorators'
import { tinygrailOSS } from '@utils/app'

const imageWidth = _.window.contentWidth * 0.2

function Item({ id, icon, name, rank, starForces, hover }, { $, navigation }) {
  const styles = memoStyles()
  const { label } = $.state
  const isDisabled = label === '持仓' && !$.mergeListMap[id]
  return (
    <View>
      <Touchable withoutFeedback onPress={() => $.setHover(id)}>
        <Image
          style={[styles.avatar, isDisabled && styles.disabled]}
          src={tinygrailOSS(icon, 120)}
          size={imageWidth}
          radius={0}
          fadeDuration={300}
          placeholder={false}
          borderColor='transparent'
        />
      </Touchable>
      {hover && (
        <Touchable
          style={styles.hover}
          onPress={() =>
            navigation.push('TinygrailSacrifice', {
              monoId: `character/${id}`
            })
          }
        >
          <Flex style={_.container.flex} direction='column' justify='center'>
            <Text type='__plain__' size={13} bold align='center'>
              第{rank}位
            </Text>
            <Text
              style={_.mt.xxs}
              type='__plain__'
              size={10}
              bold
              align='center'
              numberOfLines={2}
            >
              {name}
            </Text>
            <Text type='__plain__' size={10} bold align='center'>
              +{formatNumber(starForces, 0)}
            </Text>
          </Flex>
        </Touchable>
      )}
    </View>
  )
}

export default obc(Item)

const memoStyles = _.memoStyles(_ => ({
  disabled: {
    opacity: 0.1
  },
  hover: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    padding: _.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  }
}))
