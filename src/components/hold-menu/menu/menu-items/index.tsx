/*
 * @Author: czy0729
 * @Date: 2026-08-09 07:19:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 06:34:34
 */
import { memo, useCallback, useRef } from 'react'
import { View } from 'react-native'
import { MENU_SCROLL_THRESHOLD } from '../../ds'
import { useHoldMenu } from '../../context'
import MenuItem from '../menu-item'

import type { LayoutChangeEvent } from 'react-native'
import type { Props } from './types'

/** 菜单项列表, 逐项 onLayout 上报实测坐标, 供拖动命中测试与滚动上限使用 */
function MenuItemsComponent({ items, actionParams }: Props) {
  const { highlight, position } = useHoldMenu()
  const offsetsRef = useRef<number[]>([])
  const heightsRef = useRef<number[]>([])

  const handleLayout = useCallback(
    (index: number, event: LayoutChangeEvent) => {
      const { y, height } = event.nativeEvent.layout
      offsetsRef.current[index] = y
      heightsRef.current[index] = height

      const offsets: number[] = []
      for (let i = 0; i < items.length; i++) {
        offsets.push(offsetsRef.current[i] || 0)
      }
      highlight.rowOffsets.value = offsets

      const measured =
        (offsets[items.length - 1] || 0) + (heightsRef.current[items.length - 1] || 0)
      highlight.contentHeight.value = measured

      /**
       * 估算高度与实际渲染存在 1~3px 差 (行高取整 / 字体 padding)
       * 非滚动菜单在最后一项实测完成后, 按真实内容高度收紧容器, 消除底部空隙
       * */
      if (index !== items.length - 1 || items.length > MENU_SCROLL_THRESHOLD) return

      const value = position.value
      if (value && measured > 0 && measured < value.height) {
        position.value = { ...value, height: measured }
      }
    },
    [items, highlight, position]
  )

  return (
    <>
      {items.map((item, index) => (
        <View key={index} onLayout={event => handleLayout(index, event)}>
          <MenuItem
            item={item}
            index={index}
            isLast={items.length === index + 1}
            actionParams={actionParams}
          />
        </View>
      ))}
    </>
  )
}

const MenuItems = memo(MenuItemsComponent)

export default MenuItems
