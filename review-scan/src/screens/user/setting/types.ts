/*
 * @Author: czy0729
 * @Date: 2025-04-11 16:39:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-12 07:11:27
 */
import { Setting } from '@stores/system/types'
import { BooleanKeys, NonBooleanKeys } from '@types'

export type SwitchSettingKeys = BooleanKeys<Setting>

export type SetSettingKeys = NonBooleanKeys<Setting>

export type WithFilterProps = {
  filter: string
}
