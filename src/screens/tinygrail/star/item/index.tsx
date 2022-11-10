/*
 * @Author: czy0729
 * @Date: 2021-02-28 14:52:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-09 07:09:21
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Image, Flex, Text } from '@components'
import { _ } from '@stores'
import { formatNumber, tinygrailOSS } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Item({ id, icon, name, rank, starForces, hover }, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const { label } = $.state
  const isDisabled = label === '持仓' && !$.mergeListMap[id]
  const imageWidth = _.window.width * 0.2
  return (
    <View>
      <Touchable withoutFeedback onPress={() => $.setHover(id)}>
        <Image
          style={isDisabled && styles.disabled}
          src={tinygrailOSS(icon, 120)}
          size={imageWidth}
          radius={0}
          fadeDuration={300}
          placeholder={false}
          border='transparent'
        />
      </Touchable>
      {hover && (
        <Touchable
          style={styles.hover}
          useRN
          onPress={() => {
            navigation.push('TinygrailSacrifice', {
              monoId: `character/${id}`
            })
          }}
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
