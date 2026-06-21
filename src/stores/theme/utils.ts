/*
 * @Author: czy0729
 * @Date: 2022-08-31 13:08:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-25 08:49:32
 */
import type { MemoStylesItem } from './types'

let _memoStylesId = 0

/**
 * 包裹后实际使用没影响, 用于在 typescript 上区分是否 mobx 的 computed 值, 检查写法是否合规
 *  - 当使用 _.create() 生成样式, 若有一值的类型是带 ComputedValue<V>, 给与警告
 *  - 当使用 _.memoStyles() 生成样式, 若所有值均没有带 ComputedValue<V>, 给与警告
 * */
export function computedValue<V extends string | number | boolean>(value: V) {
  return value
}

/** 生成记忆 styles */
export function getMemoStyles(): MemoStylesItem {
  _memoStylesId += 1

  return {
    _id: _memoStylesId,
    _styles: '',
    _mode: '' as any,
    _deepDark: false,
    _orientation: '' as any,
    _customFontFamily: false,
    _wsaLayoutChanged: -1
  }
}
