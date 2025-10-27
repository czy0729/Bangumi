/*
 * @Author: czy0729
 * @Date: 2022-07-04 13:00:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-27 16:44:12
 */
import React, { useCallback, useMemo } from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { getTimestamp, stl, titleCase } from '@utils'
import { memo } from '@utils/decorators'
import { FROZEN_ARRAY, FROZEN_FN, IOS, MODEL_RAKUEN_SCROLL_DIRECTION } from '@constants'
import { COMPONENT_MAIN, DEFAULT_PROPS, HIT_SLOP } from './ds'

import type { TouchableWithoutFeedbackProps } from 'react-native'

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
    /** 当前楼层 */
    const currentFloor = useMemo(
      () => (directFloor ? Number(directFloor.match(/\d+/)?.[0] || 0) : 0),
      [directFloor]
    )

    /** 1/3、2/3、末尾节点 */
    const showFloor = useMemo(() => {
      const len = list.length
      return len < 10
        ? [Math.floor(len * 0.66666) - 1, len - 1]
        : [Math.floor(len * 0.33333) - 1, Math.floor(len * 0.66666) - 1, len - 1]
    }, [list.length])

    const isVertical = useMemo(
      () =>
        scrollDirection === MODEL_RAKUEN_SCROLL_DIRECTION.getValue('右侧') ||
        scrollDirection === MODEL_RAKUEN_SCROLL_DIRECTION.getValue('左侧'),
      [scrollDirection]
    )

    const containerStyle = useMemo(
      () =>
        stl(
          styles[`container${titleCase(scrollDirection)}`],
          !isWebLogin && !isVertical && styles.notLogin
        ),
      [styles, scrollDirection, isWebLogin, isVertical]
    )

    const makePressProps = useCallback(
      (index: number): TouchableWithoutFeedbackProps => ({
        hitSlop: HIT_SLOP,
        [IOS ? 'onPress' : 'onPressIn']: () => onPress(index)
      }),
      [onPress]
    )

    return (
      <Flex style={containerStyle} direction={isVertical ? 'column' : undefined}>
        {/* 顶部“1” */}
        <Flex.Item style={styles.itemText} flex={isVertical ? 1 : 3}>
          <TouchableWithoutFeedback {...makePressProps(-1)}>
            <Flex style={isVertical ? styles.itemVertical : styles.itemHorizontal}>
              <Text style={_.container.block} size={8} type='icon' align='center'>
                1
              </Text>
            </Flex>
          </TouchableWithoutFeedback>
        </Flex.Item>

        {/* 楼层列表 */}
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

          return (
            <Flex.Item
              key={index}
              style={showFloorText && styles.itemText}
              flex={isVertical ? 1 : showFloorText ? 3 : 1}
            >
              <TouchableWithoutFeedback {...makePressProps(index)}>
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
