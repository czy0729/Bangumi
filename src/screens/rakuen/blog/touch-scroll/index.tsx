/*
 * @Author: czy0729
 * @Date: 2019-10-14 22:46:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-29 04:58:01
 */
import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { stl, titleCase } from '@utils'
import { obc } from '@utils/decorators'
import { MODEL_RAKUEN_SCROLL_DIRECTION } from '@constants'
import { Fn } from '@types'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function TouchScroll(
  {
    onPress = () => {}
  }: {
    onPress?: Fn
  },
  { $ }: Ctx
) {
  const { scrollDirection } = $.setting
  const { list } = $.comments
  if (
    scrollDirection === MODEL_RAKUEN_SCROLL_DIRECTION.getValue('隐藏') ||
    !list.length
  ) {
    return null
  }

  const styles = memoStyles()
  const showFloor = [
    Math.floor(list.length * 0.33333),
    Math.floor(list.length * 0.66666),
    list.length - 1
  ]

  const isVertical =
    scrollDirection === MODEL_RAKUEN_SCROLL_DIRECTION.getValue('右侧') ||
    scrollDirection === MODEL_RAKUEN_SCROLL_DIRECTION.getValue('左侧')
  return (
    <Flex
      style={styles[`container${titleCase(scrollDirection)}`]}
      direction={isVertical ? 'column' : undefined}
    >
      <Flex.Item flex={isVertical ? 1 : 3}>
        <TouchableWithoutFeedback onPressIn={() => onPress(-1)}>
          <Flex style={isVertical ? styles.itemVertical : styles.itemHorizontal}>
            <Text style={styles.text} size={8} type='icon' align='center'>
              0
            </Text>
          </Flex>
        </TouchableWithoutFeedback>
      </Flex.Item>
      {list.map((item, index) => {
        const isNew = false
        const showFloorText = showFloor.includes(index)
        return (
          <Flex.Item key={index} flex={isVertical ? 1 : showFloorText ? 3 : 1}>
            <TouchableWithoutFeedback onPressIn={() => onPress(index)}>
              <Flex
                style={stl(
                  isVertical ? styles.itemVertical : styles.itemHorizontal,
                  isNew && styles.itemNew
                )}
              >
                {showFloorText && (
                  <Text
                    style={styles.text}
                    size={8}
                    type={isNew ? _.select('plain', 'icon') : 'icon'}
                    align='center'
                  >
                    {String(list[index].floor || '').replace('#', '')}
                  </Text>
                )}
              </Flex>
            </TouchableWithoutFeedback>
          </Flex.Item>
        )
      })}
    </Flex>
  )
}

export default obc(TouchScroll)
