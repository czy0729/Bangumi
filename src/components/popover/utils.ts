/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 06:19:04
 */
import { useMemo } from 'react'
import { systemStore } from '@stores'
import { s2t } from '@utils/thirdParty/open-cc'

import type { PopoverData } from './types'

/**
 * 菜单文案列表
 *  - 按设置做简繁转换, 返回新数组 (调用方可安全增删)
 *  - 转换只作用于展示文案, 选中回调仍回传原始数据
 */
export function toMenuLabels(data: readonly string[] = []): string[] {
  if (!systemStore.setting.s2t) return data.slice()

  return data.map(item => s2t(item))
}

/** 单个文案的简繁转换 (非字符串原样返回, 兼容历史调用点传入的数组) */
export function toMenuLabel<T>(text: T): T | string {
  if (typeof text !== 'string' || !text) return text
  if (!systemStore.setting.s2t) return text

  return s2t(text)
}

/**
 * 归一化菜单数据
 *  - data 为空时兜底空数组, 保证平台实现里无需再判空
 */
export function usePopoverList<Data extends PopoverData>(data?: Data): Data {
  return useMemo(() => (data || []) as Data, [data])
}
