/*
 * @Author: czy0729
 * @Date: 2019-11-27 21:50:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-27 22:26:46
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { Flex, Image, Text } from '@components'
import { Popover } from '@screens/_'
import { observer } from '@utils/decorators'
import _ from '@styles'
import { colorContainer, colorText, colorBorder } from '../styles'

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
  onPress,
  onLongPress
}) {
  const ratio = (percent + 1) ** 2
  const ratioHeight = (h / _.window.height) * 1.2
  const showAvatar = !!icon && (w * h) / area > 0.016
  const _percent = percent * 100
  const textSize = parseInt(9 * ratio)

  let priceText
  if (price > 100000000) {
    priceText = `${parseFloat((price / 100000000).toFixed(1))}亿`
  } else if (price > 10000) {
    priceText = `${parseFloat((price / 10000).toFixed(1))}万`
  } else {
    priceText = parseFloat(price.toFixed(1))
  }

  let backgroundColor = colorContainer
  if (!icon) {
    backgroundColor = colorBorder
  }

  return (
    <Popover
      style={[
        styles.item,
        {
          top: y,
          left: x,
          backgroundColor
        }
      ]}
      data={!id ? [] : [name, '资产分析', '隐藏']}
      placement='auto'
      onSelect={title =>
        onPress({
          id,
          name,
          title
        })
      }
      onLongPress={() =>
        onLongPress({
          id,
          name
        })
      }
    >
      <Flex
        style={[
          _.container.flex,
          {
            width: w,
            height: h
          }
        ]}
        direction='column'
        justify='center'
      >
        {showAvatar && (
          <Image
            style={{
              marginBottom: parseInt(5.6 * ratio)
            }}
            src={icon}
            size={parseInt(ratioHeight * 240)}
            height={parseInt(ratioHeight * 240)}
            radius={parseInt(ratioHeight * 120)}
            placeholder={false}
          />
        )}
        <Text size={parseInt(11 * ratio)} type='plain' numberOfLines={1}>
          {name}
        </Text>
        <Text
          style={{
            marginTop: parseInt(3 * ratio),
            color: colorText
          }}
          size={textSize}
          numberOfLines={1}
        >
          <Text
            style={{
              color: colorText
            }}
            size={textSize}
          >
            {priceText}
          </Text>{' '}
          / {_percent.toFixed(_percent < 0.1 ? 2 : 1)}%
        </Text>
      </Flex>
    </Popover>
  )
}

Item.defaultProps = {
  onPress: Function.prototype,
  onLongPress: Function.prototype
}

export default observer(Item)

const styles = StyleSheet.create({
  item: {
    position: 'absolute',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colorBorder,
    overflow: 'hidden'
  }
})
