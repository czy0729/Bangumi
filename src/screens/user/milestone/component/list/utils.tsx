/*
 * @Author: czy0729
 * @Date: 2024-10-11 22:59:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-04 05:42:37
 */
import React from 'react'
import Item from '../item'

export function renderItem({ item, index }) {
  return <Item item={item} index={index} />
}

/**
 * 根据列数计算首屏渲染数量
 * 照片墙是网格布局，需要足够的 item 填满首屏
 */
export function getInitialNumToRender(numColumns: number): number {
  // 预估首屏显示 5-6 行
  switch (numColumns) {
    case 2:
      return 12 // 2列 × 6行
    case 3:
      return 15 // 3列 × 5行
    case 4:
      return 20 // 4列 × 5行
    case 5:
      return 25 // 5列 × 5行
    default:
      return 15
  }
}
