/*
 * @Author: czy0729
 * @Date: 2026-08-09 07:19:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-10 10:30:00
 */
import React, { memo, useCallback, useRef } from 'react'
import { View } from 'react-native'
import { useHoldMenu } from '../../context'
import MenuItem from '../menu-item'

import type { LayoutChangeEvent } from 'react-native'
import type { Props } from './types'

/** 菜单项列表, 逐项 onLayout 上报实测坐标, 供拖动命中测试与滚动上限使用 */
function MenuItemsComponent({ items, actionParams }: Props) {
  const { highlight } = useHoldMenu()
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
      highlight.contentHeight.value =
        (offsets[items.length - 1] || 0) + (heightsRef.current[items.length - 1] || 0)
    },
    [items, highlight]
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
