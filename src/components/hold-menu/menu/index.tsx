/*
 * @Author: czy0729
 * @Date: 2026-08-09 07:22:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-10 10:00:00
 */
import React, { memo } from 'react'
import Animated, {
  scrollTo,
  useAnimatedReaction,
  useAnimatedScrollHandler
} from 'react-native-reanimated'
import { GestureDetector } from 'react-native-gesture-handler'
import { BlurView } from 'expo-blur'
import { MENU_BLUR_LIGHT_BACKGROUND_COLOR, MENU_SCROLL_THRESHOLD } from '../ds'
import { useHoldMenu, useHoldMenuParams } from '../context'
import MenuItems from './menu-items'
import { useMenuAnimation } from './useMenuAnimation'
import { useMenuDragSelect } from './useMenuDragSelect'
import { styles } from './styles'

/**
 * 菜单本体, 常驻挂载, 由 active/position 驱动展开/收起动画
 * 长按拖选由菜单层手势负责, 普通滑动仍交还原生 ScrollView 滚动
 */
function MenuComponent() {
  const { active, theme, highlight } = useHoldMenu()
  const { params } = useHoldMenuParams()
  const items = params?.items || []
  const { animatedStyle, animatedProps } = useMenuAnimation({ items })
  const { scrollViewRef, scrollOffset } = highlight
  const { gesture } = useMenuDragSelect()
  const scrollable = items.length > MENU_SCROLL_THRESHOLD

  // 滚动偏移实时写入 shared value, 供拖动命中测试在 UI 线程读取
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollOffset.value = event.contentOffset.y
  })

  // 关闭后复位滚动位置, 与 scrollOffset 保持一致, 避免下次展开内容停在旧位置
  useAnimatedReaction(
    () => active.value,
    (value, prevValue) => {
      if (value !== 0 || prevValue === 0 || !scrollable) return
      scrollTo(scrollViewRef, 0, 0, false)
    },
    [scrollable]
  )

  const elMenuItems = <MenuItems items={items} actionParams={params?.actionParams} />

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        pointerEvents='none'
        animatedProps={animatedProps}
        style={[styles.menuContainer, animatedStyle]}
      >
        {/* 常驻挂载保证冷启动首次展开即有毛玻璃, 关闭时以零透明度/零缩放隐藏 */}
        <BlurView
          intensity={80}
          tint={theme}
          style={[
            styles.menuBlur,
            theme !== 'dark' && { backgroundColor: MENU_BLUR_LIGHT_BACKGROUND_COLOR }
          ]}
        >
          {scrollable ? (
            <Animated.ScrollView
              ref={scrollViewRef}
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              onScroll={scrollHandler}
              scrollEventThrottle={16}
            >
              {elMenuItems}
            </Animated.ScrollView>
          ) : (
            elMenuItems
          )}
        </BlurView>
      </Animated.View>
    </GestureDetector>
  )
}

const Menu = memo(MenuComponent)

export default Menu
