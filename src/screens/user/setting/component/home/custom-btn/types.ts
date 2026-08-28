/*
 * @Author: czy0729
 * @Date: 2026-01-18 13:09:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-28 02:16:16
 */
import type { MenuItem, WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  /** 菜单项 (不传渲染占位; 允许部分字段, 如默认项无 key) */
  item?: Partial<MenuItem>
  active?: boolean

  /** 点击选择 */
  onPress?: () => void
}>

export type SettingKeys = 'homeTopLeftCustom' | 'homeTopRightCustom' | 'homeTopExtraCustom'
