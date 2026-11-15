/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 07:18:26
 */
import { useCallback, useMemo, useState } from 'react'
import { FROZEN_FN } from '@constants'
import { systemStore } from '@stores'
import { toMenuEntries, usePopoverList } from './utils'
import { MENU_CLOSE_DELAY, WEB_SELECT_DELAY } from './ds'

import type {
  PopoverData,
  PopoverEvent,
  PopoverIOSItems,
  UsePopoverDropdownOptions,
  UsePopoverDropdownResult,
  UsePopoverItemsOptions,
  UsePopoverItemsResult
} from './types'

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

  // 简繁开关显式传给 toMenuEntries, memo 依赖不再隐式
  const s2t = systemStore.setting.s2t

  // 外部传了 onLongPress 说明长按语义归调用方, 菜单自动降级为纯点击激活, 不抢占长按
  const hasExternalLongPress = typeof onLongPress === 'function'

  const items = useMemo<PopoverIOSItems>(
    () =>
      // 派生规则统一放在 toMenuEntries, 三端共用; 这里只补 hold-menu 的点击回调
      toMenuEntries(list, value, title, s2t).map(entry => ({
        text: entry.text,
        icon: entry.icon,
        checked: entry.checked,
        type: entry.type,
        color: entry.color,
        isTitle: entry.isTitle,
        onPress: entry.isTitle
          ? undefined
          : (evt?: PopoverEvent) => {
              // 等菜单收起动画结束再触发动作, 避免跳转/弹窗与关闭动画重叠
              setTimeout(() => {
                onSelect(entry.raw as Data[number], entry.index, evt)
              }, MENU_CLOSE_DELAY)
            }
      })),
    [value, title, list, onSelect, s2t]
  )

  return {
    items,
    activateOn: activateOn || (hasExternalLongPress ? 'tap' : 'tap-hold')
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
