/*
 * @Author: czy0729
 * @Date: 2022-07-04 13:00:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-19 22:39:35
 */
import React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { getTimestamp, stl, titleCase } from '@utils'
import { memo } from '@utils/decorators'
import { FROZEN_ARRAY, FROZEN_FN, IOS, MODEL_RAKUEN_SCROLL_DIRECTION } from '@constants'
import { RakuenScrollDirection } from '@types'
import { PassProps } from './type'
import { COMPONENT_MAIN, DEFAULT_PROPS, HIT_SLOP } from './ds'

export const TouchScroll = memo(
  ({
    styles,
    list = FROZEN_ARRAY,
    readedTime = 0,
    scrollDirection = 'right',
    directFloor = '',
    isWebLogin = false,
    newFloorStyle = '角标',
    onPress = FROZEN_FN
  }) => {
    const currentFloor = directFloor ? Number(directFloor.match(/\d+/)?.[0] || 0) : 0
    const showFloor = [
      Math.floor(list.length * 0.33333) - 1,
      Math.floor(list.length * 0.66666) - 1,
      list.length - 1
    ]
    const isVertical =
      scrollDirection === MODEL_RAKUEN_SCROLL_DIRECTION.getValue<RakuenScrollDirection>('右侧') ||
      scrollDirection === MODEL_RAKUEN_SCROLL_DIRECTION.getValue<RakuenScrollDirection>('左侧')

    const passProps: PassProps = {
      hitSlop: HIT_SLOP
    }
    if (IOS) {
      passProps.onPress = () => onPress(-1)
    } else {
      passProps.onPressIn = () => onPress(-1)
    }

    return (
      <Flex
        style={stl(
          styles[`container${titleCase(scrollDirection)}`],
          !isWebLogin && !isVertical && styles.notLogin
        )}
        direction={isVertical ? 'column' : undefined}
      >
        <Flex.Item style={styles.itemText} flex={isVertical ? 1 : 3}>
          <TouchableWithoutFeedback {...passProps}>
            <Flex style={isVertical ? styles.itemVertical : styles.itemHorizontal}>
              <Text style={_.container.block} size={8} type='icon' align='center'>
                1
              </Text>
            </Flex>
          </TouchableWithoutFeedback>
        </Flex.Item>
        {list.map((item, index) => {
          const isCurrent = currentFloor && `#${currentFloor}` === item.floor

          let isNew = false
          if (readedTime) {
            if (getTimestamp(item.time) > readedTime) isNew = true

            if (!isNew) {
              if (item.sub) {
                item.sub.forEach(i => {
                  if (getTimestamp(i.time) > readedTime) isNew = true
                })
              }
            }
          }

          const showFloorText = showFloor.includes(index)
          const passProps: PassProps = {
            hitSlop: HIT_SLOP
          }
          if (IOS) {
            passProps.onPress = () => onPress(index)
          } else {
            passProps.onPressIn = () => onPress(index)
          }

          return (
            <Flex.Item
              key={index}
              style={showFloorText && styles.itemText}
              flex={isVertical ? 1 : showFloorText ? 3 : 1}
            >
              <TouchableWithoutFeedback {...passProps}>
                <Flex
                  style={stl(
                    isVertical ? styles.itemVertical : styles.itemHorizontal,
                    isNew &&
                      (newFloorStyle === '角标' || newFloorStyle === '红点') &&
                      styles.itemNew,
                    isNew && newFloorStyle === '背景' && styles.itemNewFull
                  )}
                  justify='center'
                >
                  {showFloorText ? (
                    <Text
                      style={_.container.block}
                      size={8}
                      type={isNew ? _.select('plain', 'icon') : 'icon'}
                      bold={isCurrent}
                      align='center'
                      noWrap
                    >
                      {String(list[index]?.floor || '').replace('#', '')}
                    </Text>
                  ) : isCurrent ? (
                    <View style={styles.dot} />
                  ) : null}
                </Flex>
              </TouchableWithoutFeedback>
            </Flex.Item>
          )
        })}
      </Flex>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN,
  props => ({
    ...props,
    list: props.list.length
  })
)
