/*
 * @Author: czy0729
 * @Date: 2026-11-14 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-15 06:13:08
 *
 * Android: 系统原生菜单 (PopMenuModule) 的 JS 侧入口
 *  - 仅限 .android 入口引用 (共享代码引用会打进 iOS 包)
 *  - PopMenuModule 用系统 ListPopupWindow (PopupMenu 内部容器) 渲染, 行视图提供
 *    行末素色勾 / 文字颜色 / 标题项
 *  - 系统 UIManager.showPopupMenu 只接受 string[], 老 APK 未打包该模块时降级回它
 */
import { useCallback, useRef } from 'react'
import { findNodeHandle, NativeModules, UIManager } from 'react-native'
import { getTextStyle } from '@components/text'
import { _ } from '@stores'
import { globalWarn } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { ANDROID_DELAY_PRESS_IN } from '../ds'
import { toMenuEntries, toMenuLabel, toMenuLabels } from '../utils'

import type { GestureResponderEvent, TextStyle as RNTextStyle, ViewInstance } from 'react-native'
import type { UIManagerWithPopupMenu } from '@types'
import type { TextType } from '@components/text/types'
import type { TouchablePressEvent } from '../../touchable'
import type {
  PopMenuModuleType,
  PopMenuNativeItem,
  PopoverData,
  PopoverEvent,
  PopoverMenuEntry,
  ShowAndroidPopMenuOptions,
  UsePopoverPressOptions,
  UsePopoverPressResult
} from '../types'

/** 项目里会用到的 CSS 命名色 (菜单标题固定 gray) */
const NAMED_COLORS: Record<string, number> = {
  transparent: 0x00000000,
  black: 0xff000000,
  white: 0xffffffff,
  gray: 0xff808080,
  grey: 0xff808080,
  red: 0xffff0000,
  green: 0xff00ff00,
  blue: 0xff0000ff
}

/** 能力缺失只告警一次, 避免每次点击都写日志 */
let warnedMissingMenu = false

function channel(value: string): number {
  const n = parseFloat(value)
  return Number.isNaN(n) ? 0 : Math.max(0, Math.min(255, Math.round(n)))
}

/** rgba 的 alpha 既可能是 0-1 小数, 也可能是 0-255 整数 */
function alphaChannel(value: string): number {
  const n = parseFloat(value)
  if (Number.isNaN(n)) return 255
  return Math.max(0, Math.min(255, Math.round(n <= 1 ? n * 255 : n)))
}

/** JS 的 |0 即按位取低 32 位, 等价于 Java long→int 的窄化转换 */
function signed(argb: number): number {
  return argb | 0
}

/**
 * RN 颜色字符串 → 带符号 32 位 ARGB 整数 (与 android.graphics.Color 一致), 失败返回 undefined
 *  - 自己解析而非依赖 RN 的 processColor: 两端 RN 版本不同 (iOS 0.88 / Android 0.72),
 *    顶层导出在部分版本缺失, 且本项目只需要 hex / rgb() / rgba() / 少量命名色
 *  - 必须返回带符号值: RN 桥把 number 传成 double, 而 Java 的 (int) double 是
 *    JLS 5.1.3 饱和转换 (超 2^31-1 会被钳成 Integer.MAX_VALUE), 不是按位截断。
 *    若返回 0xff808080 这样的无符号数, 不透明色会全部退化成半透明白。
 *    原生侧另用 (int)(long) getDouble() 兜底, 双保险。
 *  - 前景色的调用方把 undefined 当「跟随主题」, 不做黑色兜底
 */
export function parseArgb(color: unknown): number | undefined {
  if (typeof color === 'number') return signed(color)
  if (typeof color !== 'string') return undefined

  const value = color.trim().toLowerCase()
  const named = NAMED_COLORS[value]
  if (named !== undefined) return signed(named)

  if (value[0] === '#') {
    const hex = value.slice(1)
    if (hex.length === 3 || hex.length === 4) {
      const [r, g, b, a = 'f'] = hex.split('')
      return signed(parseInt(`0x${a}${a}${r}${r}${g}${g}${b}${b}`, 16))
    }
    if (/^[0-9a-f]{6}$/.test(hex)) return signed(parseInt(`0xff${hex}`, 16))
    // CSS #RRGGBBAA → ARGB
    if (/^[0-9a-f]{8}$/.test(hex)) {
      return signed(parseInt(`0x${hex.slice(6)}${hex.slice(0, 6)}`, 16))
    }
    return undefined
  }

  const match = value.match(/^rgba?\(([^)]+)\)$/)
  if (match) {
    const parts = match[1].split(',').map(part => part.trim())
    // 百分比写法不支持: channel() 会把 100% 当成 100, 解析成错误色值比失败更难发现
    if (parts.some(part => part.endsWith('%'))) return undefined
    const [r, g, b] = parts.map(channel)
    const a = parts.length > 3 ? alphaChannel(parts[3]) : 255
    return signed((a << 24) | (r << 16) | (g << 8) | b)
  }

  return undefined
}

/** 从全局 Text 语义色反查具体色值 (与 iOS MenuItem 的 getTypeColor 同规则) */
function getTypeColor(type: TextType): string | undefined {
  const styles = getTextStyle({ type })
  for (let i = styles.length - 1; i >= 0; i--) {
    const color = (styles[i] as RNTextStyle | undefined)?.color
    if (typeof color === 'string') return color
  }
}

/** 条目文字色: 显式 color > type 语义色 > undefined (跟随系统菜单主题色); 解析失败同 undefined */
function getEntryColor(entry: PopoverMenuEntry): number | undefined {
  if (entry.isTitle) return undefined
  if (entry.color) return parseArgb(entry.color)
  if (entry.type) {
    const color = getTypeColor(entry.type)
    if (color) return parseArgb(color)
  }

  return undefined
}

/**
 * 命令式弹出安卓系统菜单 (增强)
 *  - 展示文案已简繁转换, 选中回调仍回传原始数据与下标
 *  - 锚点只传 reactTag, 定位由系统 ListPopupWindow 完成
 */
export function showAndroidPopMenu<Data extends PopoverData>({
  anchor,
  data,
  value,
  title = '',
  onSelect = FROZEN_FN,
  evt
}: ShowAndroidPopMenuOptions<Data>): void {
  if (!anchor) return

  const list = (data || []) as Data
  const node = findNodeHandle(anchor)
  const manager = UIManager as typeof UIManager & UIManagerWithPopupMenu
  const native = NativeModules.PopMenuModule as PopMenuModuleType | undefined

  /** 老 APK / 原生模块缺失时退回系统菜单 (纯文本, 无字色与勾) */
  if (typeof native?.show !== 'function') {
    if (typeof manager.showPopupMenu === 'function' && node != null) {
      // 系统菜单只收 string[]: 标题拼为首行, 选中下标减掉标题行数映射回原始数据
      const labels = toMenuLabels(list)
      if (title) labels.unshift(toMenuLabel(title))
      manager.showPopupMenu(node, labels, FROZEN_FN, (_, index) => {
        const i = Number(index) - (title ? 1 : 0)
        if (!Number.isNaN(i) && i >= 0 && i < list.length) onSelect(list[i], i, evt)
      })
    } else if (!warnedMissingMenu) {
      warnedMissingMenu = true
      globalWarn('Popover', '当前环境缺少 PopMenuModule 与 showPopupMenu, 菜单无法弹出')
    }

    return
  }

  if (node == null) return

  const items: PopMenuNativeItem[] = toMenuEntries(list, value, title).map(entry => {
    const color = getEntryColor(entry)
    return {
      text: entry.text,
      checked: entry.checked,
      isTitle: !!entry.isTitle,
      index: entry.index,
      ...(color === undefined ? {} : { color })
    }
  })

  native.show(node, _.isDark, items, (index: number) => {
    if (typeof index !== 'number' || index < 0 || index >= list.length) return
    onSelect(list[index], index, evt)
  })
}

/** Android: 锚点与按压属性, 点击/长按打开自定义原生菜单 */
export function usePopoverPress<Data extends PopoverData>({
  data,
  value,
  title,
  onSelect = FROZEN_FN,
  onPress,
  onLongPress = FROZEN_FN,
  activateOn = 'tap'
}: UsePopoverPressOptions<Data>): UsePopoverPressResult {
  const anchorRef = useRef<ViewInstance>(null)

  const handlePopover = useCallback(
    (evt: GestureResponderEvent | TouchablePressEvent) => {
      showAndroidPopMenu({
        anchor: anchorRef.current,
        data,
        value,
        title,
        onSelect,
        evt: evt as PopoverEvent
      })
    },
    [data, value, title, onSelect]
  )

  if (activateOn === 'hold') {
    return {
      anchorRef,
      onPress,
      onLongPress: handlePopover
    }
  }

  return {
    anchorRef,
    delayPressIn: ANDROID_DELAY_PRESS_IN,
    onPress: handlePopover,
    onLongPress
  }
}
