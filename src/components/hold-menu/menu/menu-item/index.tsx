/*
 * @Author: czy0729
 * @Date: 2026-08-09 07:19:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 06:34:36
 */
import { memo } from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { getTextStyle, Text } from '@components/text'
import { Iconfont } from '@components/iconfont'
import { Touchable } from '@components/touchable'
import { stl } from '@utils'
import { MENU_ITEM_ICON_SIZE, MENU_ITEM_TEXT_SIZE, MENU_ITEM_TITLE_SIZE } from '../../ds'
import { useHoldMenu } from '../../context'
import { memoStyles } from './styles'

import type { MenuPressEvent } from '../../types'
import type { TextType } from '@components/text/types'
import type { TextStyle as RNTextStyle } from 'react-native'
import type { Props } from './types'

/** 从全局 Text 语义色解析具体颜色值 (getTextStyle 内部有缓存; 所有 TextType 均有对应色) */
function getTypeColor(type: TextType) {
  const styles = getTextStyle({ type })
  for (let i = styles.length - 1; i >= 0; i--) {
    const color = (styles[i] as RNTextStyle | undefined)?.color
    if (color) return color
  }
}

/**
 * 单个菜单项: 点击执行回调并关闭菜单
 * 拖动悬停高亮由菜单层手势写 highlightIndex 驱动, 这里只读 shared value 计算背景, 无 re-render
 */
function MenuItemComponent({ item, index, isLast, actionParams }: Props) {
  const { close, highlight } = useHoldMenu()
  const styles = memoStyles()

  /** 选中项固定渲染勾图标, 否则渲染调用方传入的图标 */
  const iconName = item.isTitle ? '' : item.checked ? 'md-check' : item.icon

  /** 文字与右侧图标共用色: 显式 type 优先, 其次破坏性红, 默认菜单文本色 (标题项固定灰色) */
  const colorStyle = item.isTitle
    ? styles.title
    : item.type
      ? { color: getTypeColor(item.type) }
      : item.isDestructive
        ? styles.destructive
        : styles.text

  const handlePress = (evt?: MenuPressEvent) => {
    item.onPress?.(evt, ...(actionParams?.[item.text] || []))
    close()
  }

  const animatedHighlightStyle = useAnimatedStyle(() => ({
    backgroundColor:
      highlight.highlightIndex.value === index ? styles.highlight.backgroundColor : 'transparent'
  }))

  return (
    <View>
      <Animated.View style={animatedHighlightStyle}>
        <Touchable
          style={stl(styles.item, !isLast && styles.border)}
          withoutFeedback={item.isTitle}
          onPress={item.isTitle ? undefined : handlePress}
        >
          {item.isTitle ? (
            <Text style={colorStyle} size={MENU_ITEM_TITLE_SIZE} align='center' s2t={false}>
              {item.text}
            </Text>
          ) : (
            <View style={styles.row}>
              <Text
                style={stl(colorStyle, styles.flex)}
                size={MENU_ITEM_TEXT_SIZE}
                align='left'
                numberOfLines={1}
                ellipsizeMode='middle'
                s2t={false}
              >
                {item.text}
              </Text>
              {iconName && (
                <Iconfont
                  style={styles.icon}
                  name={iconName}
                  size={MENU_ITEM_ICON_SIZE}
                  color={colorStyle.color}
                />
              )}
            </View>
          )}
        </Touchable>
      </Animated.View>
      {item.withSeparator && <View style={styles.separator} />}
    </View>
  )
}

const MenuItem = memo(MenuItemComponent)

export default MenuItem
