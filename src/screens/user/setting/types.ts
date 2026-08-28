/*
 * @Author: czy0729
 * @Date: 2025-04-11 16:39:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-27 23:25:52
 */
import type { Setting } from '@stores/system/types'
import type { BooleanKeys, GetRouteParams, NonBooleanKeys, Override, RouteSetting } from '@types'

export type SwitchSettingKeys = BooleanKeys<Setting>

export type SetSettingKeys = NonBooleanKeys<Setting>

export type WithFilterProps<T = unknown> = Override<
  T,
  {
    filter: string
  }
>

export type Params = GetRouteParams<RouteSetting>
