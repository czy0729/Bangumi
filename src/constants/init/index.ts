/*
 * @Author: czy0729
 * @Date: 2024-08-31 12:23:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 04:06:59
 */
import { Fn } from '@types'

/** 不允许修改的空对象, 作为空占位, 配合 mobx 能减少重渲染 */
export const FROZEN_OBJECT = Object.freeze({} as const)

/** 不允许修改的空数组, 作为空占位, 配合 mobx 能减少重渲染 */
export const FROZEN_ARRAY: readonly [] = Object.freeze([])

/** 不允许修改的空函数 */
export const FROZEN_FN: Fn = () => {}
