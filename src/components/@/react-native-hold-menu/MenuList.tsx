import React from 'react'
import { StyleSheet, View } from 'react-native'

import Animated, {
  runOnJS,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated'

import {
  calculateMenuHeight,
  menuAnimationAnchor
} from 'react-native-hold-menu/src/utils/calculations'
import { BlurView } from 'expo-blur'

import MenuItems from './MenuItems'

import {
  SPRING_CONFIGURATION_MENU,
  HOLD_ITEM_TRANSFORM_DURATION,
  IS_IOS,
  CONTEXT_MENU_STATE
} from 'react-native-hold-menu/src/constants'

import styles from 'react-native-hold-menu/src/components/menu/styles'
import { MenuItemProps } from 'react-native-hold-menu/src/components/menu/types'
import { useInternal } from 'react-native-hold-menu/src/hooks'
import { deepEqual } from 'react-native-hold-menu/src/utils/validations'
import { leftOrRight } from 'react-native-hold-menu/src/components/menu/calculations'

const MenuContainerComponent = IS_IOS ? BlurView : View
const AnimatedView = Animated.createAnimatedComponent<{
  animatedProps: Partial<{ blurType: string }>
}>(MenuContainerComponent)

const MenuListComponent = () => {
  const { state, theme, menuProps } = useInternal()

  const [itemList, setItemList] = React.useState<MenuItemProps[]>([])

  const menuHeight = useDerivedValue(() => {
    const itemsWithSeparator = menuProps.value.items.filter(item => item.withSeparator)
    return calculateMenuHeight(menuProps.value.items.length, itemsWithSeparator.length)
  }, [menuProps])
  const prevList = useSharedValue<MenuItemProps[]>([])

  const messageStyles = useAnimatedStyle(() => {
    const itemsWithSeparator = menuProps.value.items.filter(item => item.withSeparator)

    const translate = menuAnimationAnchor(
      menuProps.value.anchorPosition,
      menuProps.value.itemWidth,
      menuProps.value.items.length,
      itemsWithSeparator.length
    )

    const _leftPosition = leftOrRight(menuProps)

    const menuScaleAnimation = () =>
      state.value === CONTEXT_MENU_STATE.ACTIVE
        ? withSpring(1, SPRING_CONFIGURATION_MENU)
        : withTiming(0, {
            duration: HOLD_ITEM_TRANSFORM_DURATION
          })

    const opacityAnimation = () =>
      withTiming(state.value === CONTEXT_MENU_STATE.ACTIVE ? 1 : 0, {
        duration: HOLD_ITEM_TRANSFORM_DURATION
      })

    return {
      left: _leftPosition,
      height: menuHeight.value,
      opacity: opacityAnimation(),
      transform: [
        { translateX: translate.beginningTransformations.translateX },
        { translateY: translate.beginningTransformations.translateY },
        {
          scale: menuScaleAnimation()
        },
        { translateX: translate.endingTransformations.translateX },
        { translateY: translate.endingTransformations.translateY }
      ]
    }
  })

  const animatedInnerContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor:
        theme.value === 'light'
          ? IS_IOS
            ? 'rgba(255, 255, 255, .75)'
            : 'rgba(255, 255, 255, .95)'
          : IS_IOS
          ? 'rgba(0,0,0,0.5)'
          : 'rgba(39, 39, 39, .8)'
    }
  }, [theme])

  const animatedProps = useAnimatedProps(() => {
    return { blurType: theme.value }
  }, [theme])

  const setter = (items: MenuItemProps[]) => {
    setItemList(items)
    prevList.value = items
  }

  useAnimatedReaction(
    () => menuProps.value.items,
    _items => {
      if (!deepEqual(_items, prevList.value)) {
        runOnJS(setter)(_items)
      }
    },
    [menuProps]
  )

  return (
    <AnimatedView
      // @ts-ignore
      intensity={100}
      animatedProps={animatedProps}
      style={[styles.menuContainer, messageStyles]}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          styles.menuInnerContainer,
          animatedInnerContainerStyle
        ]}
      >
        <MenuItems items={itemList} />
      </Animated.View>
    </AnimatedView>
  )
}

const MenuList = React.memo(MenuListComponent)

export default MenuList
