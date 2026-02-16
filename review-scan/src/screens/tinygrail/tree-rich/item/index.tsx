/*
 * @Author: czy0729
 * @Date: 2019-11-27 21:50:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-13 08:21:54
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Image, Text } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { toFixed } from '@utils'
import { ob } from '@utils/decorators'
import { B, M } from '@constants'
import { memoStyles } from './styles'

const area = _.window.width * _.window.height

function Item({ w, h, x, y, id, icon, name, price, percent, onPress, onLongPress }) {
  const styles = memoStyles()
  const ratio = (percent + 1) ** 2
  const ratioHeight = (h / _.window.height) * 1.2
  const showAvatar = !!icon && (w * h) / area > 0.012
  const _percent = percent * 100
  const textSize = Math.floor(8 * ratio)

  let priceText: string
  if (price > B) {
    priceText = `${toFixed(price / B, 1)}亿`
  } else if (price > M) {
    priceText = `${toFixed(price / M, 1)}万`
  } else {
    priceText = toFixed(price, 1)
  }

  let backgroundColor = _.colorTinygrailContainer
  if (!icon) {
    backgroundColor = _.colorTinygrailBorder
  }

  return (
    <View
      style={[
        styles.item,
        {
          top: y,
          left: x
        }
      ]}
    >
      <Popover
        data={!id ? [] : [name, '资产分析', '隐藏']}
        placement='auto'
        onSelect={title => {
          if (typeof onPress !== 'function') return

          return onPress({
            id,
            name,
            title
          })
        }}
        onLongPress={() => {
          if (typeof onLongPress !== 'function') return

          return onLongPress({
            id,
            name
          })
        }}
      >
        <Flex
          style={[
            _.container.flex,
            {
              width: w,
              height: h,
              backgroundColor
            }
          ]}
          direction='column'
          justify='center'
        >
          {showAvatar && (
            <Image
              style={{
                marginBottom: Math.floor(5.6 * ratio)
              }}
              src={icon}
              size={Math.floor(ratioHeight * 240)}
              height={Math.floor(ratioHeight * 240)}
              radius={Math.floor(ratioHeight * 120)}
              placeholder={false}
              skeletonType='tinygrail'
            />
          )}
          <Text
            type='tinygrailPlain'
            size={Math.floor(10 * ratio)}
            numberOfLines={1}
            bold
            selectable={false}
          >
            {name}
          </Text>
          <Text
            style={{
              marginTop: Math.floor(3 * ratio)
            }}
            type='tinygrailText'
            size={textSize}
            numberOfLines={1}
            selectable={false}
          >
            <Text type='tinygrailText' size={textSize} selectable={false}>
              {priceText}
            </Text>{' '}
            / {toFixed(_percent, _percent < 0.1 ? 2 : 1)}%
          </Text>
        </Flex>
      </Popover>
    </View>
  )
}

export default ob(Item)
