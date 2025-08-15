/*
 * @Author: czy0729
 * @Date: 2024-02-19 10:52:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-19 11:14:07
 */
import React, { useCallback } from 'react'
import { GestureResponderEvent, TouchableOpacity } from 'react-native'
import { TouchableOpacity as GHTouchableOpacity } from 'react-native-gesture-handler'
import {
  BORDER_DARK_COLOR,
  BORDER_LIGHT_COLOR
} from 'react-native-hold-menu/src/components/menu/constants'
import Separator from 'react-native-hold-menu/src/components/menu/Separator'
import styles from 'react-native-hold-menu/src/components/menu/styles'
import { MenuItemProps } from 'react-native-hold-menu/src/components/menu/types'
import { AnimatedIcon } from 'react-native-hold-menu/src/components/provider/Provider'
import { CONTEXT_MENU_STATE, IS_IOS } from 'react-native-hold-menu/src/constants'
import { useInternal } from 'react-native-hold-menu/src/hooks'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import isEqual from 'lodash.isequal'
import { onPressEventEmit } from './addition'
import { getColor } from './menu/calculations'

const ItemComponent = IS_IOS ? TouchableOpacity : GHTouchableOpacity
const AnimatedTouchable = Animated.createAnimatedComponent(ItemComponent)

type MenuItemComponentProps = {
  item: MenuItemProps
  isLast?: boolean
}

const MenuItemComponent = ({ item, isLast }: MenuItemComponentProps) => {
  const {
    state,
    theme
    // menuProps
  } = useInternal()

  const borderStyles = useAnimatedStyle(() => {
    const borderBottomColor = theme.value === 'dark' ? BORDER_DARK_COLOR : BORDER_LIGHT_COLOR

    return {
      borderBottomColor,
      borderBottomWidth: isLast ? 0 : 1
    }
  }, [theme, isLast, item])

  const textColor = useAnimatedStyle(() => {
    return { color: getColor(item.isTitle, item.isDestructive, theme.value) }
  }, [theme, item])

  const handleOnPress = useCallback(
    (event: GestureResponderEvent) => {
      if (!item.isTitle) {
        // const params = menuProps.value.actionParams[item.text] || []

        // if (item.onPress) item.onPress(...params)
        // 使用订阅模式绕过报错, 实现onPress
        const { pageX, pageY } = event.nativeEvent
        onPressEventEmit({
          ...item,
          pageX,
          pageY
        })

        state.value = CONTEXT_MENU_STATE.END
      }
    },
    [state, item]
  )

  return (
    <>
      <AnimatedTouchable
        onPress={handleOnPress}
        activeOpacity={!item.isTitle ? 0.4 : 1}
        style={[styles.menuItem, borderStyles]}
      >
        <Animated.Text
          style={[item.isTitle ? styles.menuItemTitleText : styles.menuItemText, textColor]}
          numberOfLines={item.isTitle ? undefined : 1}
        >
          {item.text}
        </Animated.Text>
        {!item.isTitle && item.icon && (
          <AnimatedIcon name={item.icon} size={18} style={textColor} />
        )}
      </AnimatedTouchable>
      {item.withSeparator && <Separator />}
    </>
  )
}

const MenuItem = React.memo(MenuItemComponent, isEqual)
export default MenuItem
