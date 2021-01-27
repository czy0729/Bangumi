/*
 * @Author: czy0729
 * @Date: 2019-11-27 21:50:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:29:06
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Image, Text } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { toFixed } from '@utils'
import { ob } from '@utils/decorators'
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
  onPress,
  onLongPress
}) {
  const styles = memoStyles()
  const ratio = (percent + 1) ** 2
  const ratioHeight = (h / _.window.height) * 1.2
  const showAvatar = !!icon && (w * h) / area > 0.012
  const _percent = percent * 100
  const textSize = parseInt(8 * ratio)

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
              style={[
                styles.image,
                {
                  marginBottom: parseInt(5.6 * ratio)
                }
              ]}
              src={icon}
              size={parseInt(ratioHeight * 240)}
              height={parseInt(ratioHeight * 240)}
              radius={parseInt(ratioHeight * 120)}
              placeholder={false}
              quality={false}
            />
          )}
          <Text
            type='tinygrailPlain'
            size={parseInt(10 * ratio)}
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

export default ob(Item, {
  onPress: Function.prototype,
  onLongPress: Function.prototype
})

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
