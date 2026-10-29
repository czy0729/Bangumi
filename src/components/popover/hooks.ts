/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 05:48:29
 */
import { useCallback, useMemo, useRef, useState } from 'react'
import { findNodeHandle, UIManager } from 'react-native'
import { globalWarn } from '@utils/dev'
import { FROZEN_FN, MENU_ICONS, MENU_ICONS_ENABLED, MENU_TYPES } from '@constants'
import { toMenuLabel, toMenuLabels, usePopoverList } from './utils'
import { ANDROID_DELAY_PRESS_IN, MENU_CLOSE_DELAY, WEB_SELECT_DELAY } from './ds'

import type { GestureResponderEvent, View } from 'react-native'
import type { TouchablePressEvent } from '../touchable'
import type {
  PopoverData,
  PopoverEvent,
  PopoverIOSItems,
  UsePopoverDropdownOptions,
  UsePopoverDropdownResult,
  UsePopoverItemsOptions,
  UsePopoverItemsResult,
  UsePopoverPressOptions,
  UsePopoverPressResult
} from './types'

/** 能力缺失只告警一次, 避免每次点击都写日志 */
let warnedMissingPopupMenu = false

/** iOS: 把菜单数据派生为 hold-menu 菜单项 */
export function usePopoverItems<Data extends PopoverData>({
  data,
  value,
  title = '',
  onSelect = FROZEN_FN,
  onLongPress,
  activateOn
}: UsePopoverItemsOptions<Data>): UsePopoverItemsResult {
  const list = usePopoverList(data)

  // 外部传了 onLongPress 说明长按语义归调用方, 菜单自动降级为纯点击激活, 不抢占长按
  const hasExternalLongPress = typeof onLongPress === 'function'

  const items = useMemo<PopoverIOSItems>(() => {
    // 显式引用开关: 简繁设置变化时 memo 需重算 (toMenuLabels / toMenuLabel 读取的是同一个开关)
    const labels = toMenuLabels(list)
    const valueText = typeof value === 'string' ? value : value?.text

    const itemsValue: PopoverIOSItems = labels.map((text, index) => {
      const entry = list[index]
      const rawText = typeof entry === 'string' ? entry : entry.text

      /**
       * 操作型菜单 (未传 value) 按原始文案查通用图标映射, 显式 icon 优先;
       * 选择型菜单 (传 value) 只派生勾, 不查表, 两类菜单互不干扰;
       * 查表受 MENU_ICONS_ENABLED 总开关控制
       */
      const mappedIcon = value === undefined && MENU_ICONS_ENABLED ? MENU_ICONS[rawText] : undefined

      /** 危险动作按文案查表标红 (danger), 显式 type 优先; 选择型菜单不查表 */
      const mappedType = value === undefined ? MENU_TYPES[rawText] : undefined

      return {
        text,
        icon: typeof entry === 'string' ? mappedIcon : entry.icon ?? mappedIcon,
        checked:
          typeof entry === 'string'
            ? rawText === valueText
            : entry.checked ?? rawText === valueText,
        type: typeof entry === 'string' ? mappedType : entry.type ?? mappedType,
        onPress: (evt?: PopoverEvent) => {
          // 等菜单收起动画结束再触发动作, 避免跳转/弹窗与关闭动画重叠
          setTimeout(() => {
            onSelect(entry, index, evt)
          }, MENU_CLOSE_DELAY)
        }
      }
    })

    if (title) {
      itemsValue.unshift({
        text: toMenuLabel(title),
        isTitle: true
      })
    }

    return itemsValue
  }, [value, title, list, onSelect])

  return {
    items,
    activateOn: activateOn || (hasExternalLongPress ? 'tap' : 'tap-hold')
  }
}

/** Android: 锚点与按压属性, 点击/长按打开系统原生弹窗菜单 */
export function usePopoverPress<Data extends PopoverData>({
  data,
  onSelect = FROZEN_FN,
  onPress,
  onLongPress = FROZEN_FN,
  activateOn = 'tap'
}: UsePopoverPressOptions<Data>): UsePopoverPressResult {
  const anchorRef = useRef<View>(null)
  const list = usePopoverList(data)

  const handlePopover = useCallback(
    (evt: GestureResponderEvent | TouchablePressEvent) => {
      const node = findNodeHandle(anchorRef.current)
      if (!node) return

      /** 部分安卓环境(新架构 / 定制 ROM)缺少此 API, 缺失时告警一次并静默降级 */
      if (typeof UIManager.showPopupMenu !== 'function') {
        if (!warnedMissingPopupMenu) {
          warnedMissingPopupMenu = true
          globalWarn('Popover', '当前环境不支持 UIManager.showPopupMenu, 菜单无法弹出')
        }

        return
      }

      // 展示文案按设置转简繁, 回调仍回传原始数据
      UIManager.showPopupMenu(node, toMenuLabels(list), FROZEN_FN, (_, index) => {
        const i = Number(index)
        if (!Number.isNaN(i)) onSelect(list[i], i, evt as PopoverEvent)
      })
    },
    [list, onSelect]
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

/** Web: 下拉可见状态与选择时序 */
export function usePopoverDropdown<Data extends PopoverData>({
  onSelect
}: UsePopoverDropdownOptions<Data>): UsePopoverDropdownResult<Data> {
  const [visible, setVisible] = useState(false)

  const onVisibleChange = useCallback((value: boolean) => {
    setVisible(value)
  }, [])

  const handleSelect = useCallback(
    (title?: Data[number], index?: number) => {
      if (typeof onSelect === 'function') {
        setTimeout(() => onSelect(title, index), WEB_SELECT_DELAY)
      }

      setVisible(false)
    },
    [onSelect]
  )

  return {
    visible,
    onVisibleChange,
    handleSelect
  }
}
