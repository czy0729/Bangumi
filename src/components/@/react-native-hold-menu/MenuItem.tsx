import React, { useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import { TouchableOpacity as GHTouchableOpacity } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'

import Separator from 'react-native-hold-menu/src/components/menu/Separator'
import styles from 'react-native-hold-menu/src/components/menu/styles'

import { MenuItemProps } from 'react-native-hold-menu/src/components/menu/types'
import { useInternal } from 'react-native-hold-menu/src/hooks'
import { CONTEXT_MENU_STATE, IS_IOS } from 'react-native-hold-menu/src/constants'
import {
  BORDER_LIGHT_COLOR,
  BORDER_DARK_COLOR
} from 'react-native-hold-menu/src/components/menu/constants'
import isEqual from 'lodash.isequal'
import { getColor } from 'react-native-hold-menu/src/components/menu/calculations'
import { AnimatedIcon } from 'react-native-hold-menu/src/components/provider/Provider'
import { onPressEventEmit } from './addition'

const ItemComponent = IS_IOS ? TouchableOpacity : GHTouchableOpacity
const AnimatedTouchable = Animated.createAnimatedComponent(ItemComponent)

type MenuItemComponentProps = {
  item: MenuItemProps
  isLast?: boolean
}

const MenuItemComponent = ({ item, isLast }: MenuItemComponentProps) => {
  const { state, theme, menuProps } = useInternal()

  const borderStyles = useAnimatedStyle(() => {
    const borderBottomColor =
      theme.value === 'dark' ? BORDER_DARK_COLOR : BORDER_LIGHT_COLOR

    return {
      borderBottomColor,
      borderBottomWidth: isLast ? 0 : 1
    }
  }, [theme, isLast, item])

  const textColor = useAnimatedStyle(() => {
    return { color: getColor(item.isTitle, item.isDestructive, theme.value) }
  }, [theme, item])

  const handleOnPress = useCallback(() => {
    if (!item.isTitle) {
      // const params = menuProps.value.actionParams[item.text] || []

      // if (item.onPress) item.onPress(...params)
      // 使用订阅模式绕过报错, 实现onPress
      onPressEventEmit(item)

      state.value = CONTEXT_MENU_STATE.END
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, item])

  return (
    <>
      <AnimatedTouchable
        onPress={handleOnPress}
        activeOpacity={!item.isTitle ? 0.4 : 1}
        style={[styles.menuItem, borderStyles]}
      >
        <Animated.Text
          style={[
            item.isTitle ? styles.menuItemTitleText : styles.menuItemText,
            textColor
          ]}
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
