/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 07:27:09
 */
import { useCallback, useMemo, useRef, useState } from 'react'
import { findNodeHandle, UIManager } from 'react-native'
import { systemStore } from '@stores'
import { globalWarn } from '@utils/dev'
import { FROZEN_FN } from '@constants'
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
  title = '',
  onSelect = FROZEN_FN,
  onLongPress,
  activateOn
}: UsePopoverItemsOptions<Data>): UsePopoverItemsResult {
  const list = usePopoverList(data)

  /** 简繁开关变化需要重新派生菜单文案, 故读出作为 memo 依赖 */
  const s2tEnabled = systemStore.setting.s2t

  // 外部传了 onLongPress 说明长按语义归调用方, 菜单自动降级为纯点击激活, 不抢占长按
  const hasExternalLongPress = typeof onLongPress === 'function'

  const items = useMemo<PopoverIOSItems>(() => {
    // 显式引用开关: 简繁设置变化时 memo 需重算 (toMenuLabels / toMenuLabel 读取的是同一个开关)
    const labels = s2tEnabled ? toMenuLabels(list) : list.slice()
    const itemsValue: PopoverIOSItems = labels.map((text, index) => ({
      text,
      onPress: (evt?: PopoverEvent) => {
        // 等菜单收起动画结束再触发动作, 避免跳转/弹窗与关闭动画重叠
        setTimeout(() => {
          onSelect(list[index], index, evt)
        }, MENU_CLOSE_DELAY)
      }
    }))

    if (title) {
      itemsValue.unshift({
        text: toMenuLabel(title),
        isTitle: true
      })
    }

    return itemsValue
  }, [title, list, onSelect, s2tEnabled])

  return {
    items,
    activateOn: activateOn || (hasExternalLongPress ? 'tap' : 'tap-hold')
  }
}

/** Android: 锚点与按压属性, 点击/长按打开系统原生弹窗菜单 */
export function usePopoverPress<Data extends PopoverData>({
  data,
  onSelect = FROZEN_FN,
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
