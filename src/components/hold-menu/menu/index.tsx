/*
 * @Author: czy0729
 * @Date: 2026-08-09 07:22:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-09 07:25:56
 */
import React, { memo } from 'react'
import { ScrollView } from 'react-native'
import Animated from 'react-native-reanimated'
import { BlurView } from 'expo-blur'
import { MENU_BLUR_LIGHT_BACKGROUND_COLOR, MENU_SCROLL_THRESHOLD } from '../ds'
import { useHoldMenu, useHoldMenuParams } from '../context'
import MenuItems from './menu-items'
import { useMenuAnimation } from './useMenuAnimation'
import { styles } from './styles'

/** 菜单本体, 常驻挂载, 由 active/position 驱动展开/收起动画 */
function MenuComponent() {
  const { theme } = useHoldMenu()
  const { params } = useHoldMenuParams()
  const items = params?.items || []
  const { animatedStyle, animatedProps } = useMenuAnimation({ items })

  const elMenuItems = <MenuItems items={items} actionParams={params?.actionParams} />

  return (
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
        {items.length > MENU_SCROLL_THRESHOLD ? (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {elMenuItems}
          </ScrollView>
        ) : (
          elMenuItems
        )}
      </BlurView>
    </Animated.View>
  )
}

const Menu = memo(MenuComponent)

export default Menu
