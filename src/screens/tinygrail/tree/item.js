/*
 * @Author: czy0729
 * @Date: 2019-11-23 22:22:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-27 14:03:42
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Image, Text } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { toFixed } from '@utils'
import { observer } from '@utils/decorators'
import { B, M } from '@constants'

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
  const textSize = parseInt(9 * ratio)

  let priceText
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

  let left
  let right
  let textColor = 'tinygrailText'
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
          left: x,
          backgroundColor
        }
      ]}
    >
      <Popover
        data={!id ? [] : [name, 'K线', '买入', '卖出', '资产重组', '隐藏']}
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
              style={[
                styles.image,
                {
                  marginBottom: parseInt(5.6 * ratio)
                }
              ]}
              src={icon}
              size={parseInt(ratioHeight * 240)}
              height={
                isTemple
                  ? parseInt(ratioHeight * 320)
                  : parseInt(ratioHeight * 240)
              }
              radius={isTemple ? 4 : parseInt(ratioHeight * 120)}
              placeholder={false}
              quality={false}
            />
          )}
          <Text
            type='tinygrailPlain'
            size={parseInt(11 * ratio)}
            numberOfLines={1}
            bold
            selectable={false}
          >
            {name}
          </Text>
          <Text
            style={{
              marginTop: parseInt(3 * ratio)
            }}
            type='tinygrailText'
            size={textSize}
            numberOfLines={1}
            selectable={false}
          >
            <Text type={textColor} size={textSize} selectable={false}>
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

Item.defaultProps = {
  onPress: Function.prototype,
  onLongPress: Function.prototype
}

export default observer(Item)

const memoStyles = _.memoStyles(_ => ({
  item: {
    position: 'absolute',
    borderWidth: _.hairlineWidth,
    borderColor: _.colorTinygrailBorder,
    overflow: 'hidden'
  },
  image: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  }
}))
