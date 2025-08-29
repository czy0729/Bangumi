/*
 * @Author: czy0729
 * @Date: 2024-02-19 10:53:03
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-02-19 10:53:03
 */
import React from 'react'
import styles from 'react-native-hold-menu/src/components/menu/styles'
import {
  CONTEXT_MENU_STATE,
  HOLD_ITEM_TRANSFORM_DURATION,
  SPRING_CONFIGURATION
} from 'react-native-hold-menu/src/constants'
import { useInternal } from 'react-native-hold-menu/src/hooks'
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated'
import MenuList from './MenuList'

const MenuComponent = () => {
  const { state, menuProps } = useInternal()

  const wrapperStyles = useAnimatedStyle(() => {
    const anchorPositionVertical = menuProps.value.anchorPosition.split('-')[0]

    const top =
      anchorPositionVertical === 'top'
        ? menuProps.value.itemHeight + menuProps.value.itemY + 8
        : menuProps.value.itemY - 8
    const left = menuProps.value.itemX
    const width = menuProps.value.itemWidth
    const tY = menuProps.value.transformValue

    return {
      top,
      left,
      width,
      transform: [
        {
          translateY:
            state.value === CONTEXT_MENU_STATE.ACTIVE
              ? withSpring(tY, SPRING_CONFIGURATION)
              : withTiming(0, { duration: HOLD_ITEM_TRANSFORM_DURATION })
        }
      ]
    }
  }, [menuProps])

  return (
    <Animated.View style={[styles.menuWrapper, wrapperStyles]}>
      <MenuList />
    </Animated.View>
  )
}

const Menu = React.memo(MenuComponent)

export default Menu
