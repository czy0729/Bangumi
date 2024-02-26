/*
 * @Author: czy0729
 * @Date: 2024-02-19 10:52:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-19 11:18:52
 */
// @ts-nocheck
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import styles from 'react-native-hold-menu/src/components/menu/styles'
import { MenuItemProps } from 'react-native-hold-menu/src/components/menu/types'
import {
  CONTEXT_MENU_STATE,
  HOLD_ITEM_TRANSFORM_DURATION,
  IS_IOS,
  SPRING_CONFIGURATION_MENU
} from 'react-native-hold-menu/src/constants'
import { useInternal } from 'react-native-hold-menu/src/hooks'
import { deepEqual } from 'react-native-hold-menu/src/utils/validations'
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
import { BlurView } from 'expo-blur'
import { MENU_WIDTH } from './constants'
import { leftOrRight } from './menu/calculations'
import MenuItems from './MenuItems'
import { calculateMenuHeight, menuAnimationAnchor } from './utils/calculations'

const MenuContainerComponent = IS_IOS ? BlurView : View
// const AnimatedView = Animated.createAnimatedComponent<{
//   animatedProps: Partial<{ blurType: string }>
// }>(MenuContainerComponent)

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

  const AnimatedView = Animated.createAnimatedComponent<{
    animatedProps: Partial<{ blurType: string }>
  }>(MenuContainerComponent)

  return (
    <AnimatedView
      intensity={80}
      animatedProps={animatedProps}
      style={[
        styles.menuContainer,
        messageStyles,
        {
          width: MENU_WIDTH
        }
      ]}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          styles.menuInnerContainer,
          animatedInnerContainerStyle
        ]}
      >
        <ScrollView
          contentContainerStyle={additionStyles.contentContainerStyle}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <MenuItems items={itemList} />
        </ScrollView>
      </Animated.View>
    </AnimatedView>
  )
}

const MenuList = React.memo(MenuListComponent)

export default MenuList

const additionStyles = StyleSheet.create({
  contentContainerStyle: {
    width: '100%'
  }
})
