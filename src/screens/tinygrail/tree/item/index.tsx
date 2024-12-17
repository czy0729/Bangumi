/*
 * @Author: czy0729
 * @Date: 2019-11-23 22:22:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 05:32:07
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Image, Text, TextType } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { toFixed } from '@utils'
import { ob } from '@utils/decorators'
import { B, M } from '@constants'
import { memoStyles } from './styles'

const area = _.window.width * _.window.height

function Item({
  w,
  h,
  x,
  y,
  id,
  icon,
  name,
  price,
  percent,
  fluctuation,
  label,
  extra,
  isTemple,
  onPress,
  onLongPress
}) {
  const styles = memoStyles()
  const ratio = (percent + 1) ** 2
  const ratioHeight = (h / _.window.height) * 1.2
  const showAvatar = !!icon && (w * h) / area > 0.016
  const _percent = percent * 100
  const textSize = Math.floor(9 * ratio)

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

  let left: string
  let right: string
  let textColor: TextType = 'tinygrailText'
  if (label === '当前涨跌') {
    right = '%'
    if (fluctuation > 0) {
      left = '+'
      textColor = 'bid'
    } else if (fluctuation < 0) {
      left = '-'
      textColor = 'ask'
    }
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
        data={!id ? [] : [name, 'K线', '买入', '卖出', '资产重组', '隐藏']}
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
              height={isTemple ? Math.floor(ratioHeight * 320) : Math.floor(ratioHeight * 240)}
              radius={isTemple ? 4 : Math.floor(ratioHeight * 120)}
              placeholder={false}
              skeletonType='tinygrail'
            />
          )}
          <Text
            type='tinygrailPlain'
            size={Math.min(Math.floor(11 * ratio), 15)}
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
            size={Math.min(textSize, 14)}
            numberOfLines={1}
            selectable={false}
          >
            <Text type={textColor} size={Math.min(textSize, 14)} selectable={false}>
              {extra}
              {left}
              {priceText}
              {right}
            </Text>{' '}
            / {toFixed(_percent, _percent < 0.1 ? 2 : 1)}%
          </Text>
        </Flex>
      </Popover>
    </View>
  )
}

export default ob(Item)
