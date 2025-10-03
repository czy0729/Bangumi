/*
 * @Author: czy0729
 * @Date: 2025-09-12 18:50:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-12 19:00:18
 */
import React from 'react'
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated'
import {
  CONTEXT_MENU_STATE,
  HOLD_ITEM_TRANSFORM_DURATION,
  SPRING_CONFIGURATION
} from '../../constants'
import { useInternal } from '../../hooks'
import MenuList from './MenuList'
import styles from './styles'

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
