/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 06:19:04
 */
import { useMemo } from 'react'
import { systemStore } from '@stores'
import { s2t as convertS2t } from '@utils/thirdParty/open-cc'
import { MENU_ICONS, MENU_ICONS_ENABLED, MENU_TYPES } from '@constants'

import type { PopoverData, PopoverMenuEntry } from './types'

/**
 * 菜单文案列表
 *  - 按设置做简繁转换, 返回新数组 (调用方可安全增删)
 *  - 转换只作用于展示文案, 选中回调仍回传原始数据
 *  - 对象项取 text, Web / 安卓降级路径等只支持文本的实现依赖此归一化
 *  - s2t 由调用方显式传入 (默认读设置), memo 里的派生依赖不再隐式
 */
export function toMenuLabels(
  data: PopoverData = [],
  s2t: boolean = systemStore.setting.s2t
): string[] {
  const labels = data.map(item => (typeof item === 'string' ? item : item.text))
  if (!s2t) return labels

  return labels.map(item => convertS2t(item))
}

/** 单个文案的简繁转换 (非字符串原样返回, 兼容历史调用点传入的数组) */
export function toMenuLabel<T>(text: T, s2t: boolean = systemStore.setting.s2t): T | string {
  if (typeof text !== 'string' || !text) return text
  if (!s2t) return text

  return convertS2t(text)
}

/**
 * iOS / Android 共用的菜单派生层
 *  - 把 string | PopoverItem 归一成结构化条目, 查表图标 / 危险色、由 value 推导勾选、置顶标题
 *  - 展示文案已简繁转换; raw 与 index 保留原始数据, 供选中回调原样回传
 *  - Web 仍是纯文本列表且自带文案去重语义, 未接入此派生层, 不要贸然替换
 */
export function toMenuEntries<Data extends PopoverData>(
  data: Data = [] as unknown as Data,
  value?: PopoverData[number],
  title: string = '',
  s2t: boolean = systemStore.setting.s2t
): PopoverMenuEntry[] {
  const labels = toMenuLabels(data, s2t)
  const valueText = typeof value === 'string' ? value : value?.text

  const entries: PopoverMenuEntry[] = labels.map((text, index) => {
    const raw = data[index]
    const rawText = typeof raw === 'string' ? raw : raw.text

    /** 操作型菜单 (未传 value) 按原始文案查通用图标映射, 显式 icon 优先 */
    const mappedIcon = value === undefined && MENU_ICONS_ENABLED ? MENU_ICONS[rawText] : undefined

    /** 危险动作按文案查表标红, 显式 type 优先; 选择型菜单不查表 */
    const mappedType = value === undefined ? MENU_TYPES[rawText] : undefined

    return {
      text,
      raw,
      index,
      checked: typeof raw === 'string' ? rawText === valueText : raw.checked ?? rawText === valueText,
      icon: typeof raw === 'string' ? mappedIcon : raw.icon ?? mappedIcon,
      type: typeof raw === 'string' ? mappedType : raw.type ?? mappedType,
      color: typeof raw === 'string' ? undefined : raw.color
    }
  })

  if (title) {
    entries.unshift({
      text: toMenuLabel(title, s2t),
      raw: title,
      index: -1,
      checked: false,
      isTitle: true
    })
  }

  return entries
}

/**
 * 归一化菜单数据
 *  - data 为空时兜底空数组, 保证平台实现里无需再判空
 */
export function usePopoverList<Data extends PopoverData>(data?: Data): Data {
  return useMemo(() => (data || []) as Data, [data])
}
