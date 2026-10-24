/*
 * @Author: czy0729
 * @Date: 2019-10-14 22:46:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-23 11:00:00
 *
 * 楼层进度条: 点击跳转楼层
 */
import { TouchableWithoutFeedback } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { useStore } from '@stores'
import { stl, titleCase } from '@utils'
import { FROZEN_FN, MODEL_RAKUEN_SCROLL_DIRECTION, WEB } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'
import type { Ctx } from '../../types'

/** 楼层进度条 */
function TouchScroll({ onPress = FROZEN_FN }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  if (WEB) return null

  const { scrollDirection } = $.setting
  const { list } = $.comments
  if (scrollDirection === MODEL_RAKUEN_SCROLL_DIRECTION.getValue('隐藏') || !list.length) {
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
            <Text style={styles.text} type='icon' size={8} align='center'>
              0
            </Text>
          </Flex>
        </TouchableWithoutFeedback>
      </Flex.Item>
      {list.map((_item, index) => {
        const showFloorText = showFloor.includes(index)
        return (
          <Flex.Item key={index} flex={isVertical ? 1 : showFloorText ? 3 : 1}>
            <TouchableWithoutFeedback onPressIn={() => onPress(index)}>
              <Flex style={stl(isVertical ? styles.itemVertical : styles.itemHorizontal)}>
                {showFloorText && (
                  <Text style={styles.text} type='icon' size={8} align='center'>
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

export default observer(TouchScroll)
