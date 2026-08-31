/*
 * @Author: czy0729
 * @Date: 2026-07-24 18:27:39
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-07-24 18:27:39
 */
import type { HomeRenderTabs, HomeTabsKeys } from '@stores/system/types'
import type { IconfontNames } from '@types'

export type Props = {
  filter: string
  label: HomeRenderTabs[number]
  name: IconfontNames
  size: number
  active: boolean
  handleSet: (value: HomeTabsKeys) => void
}
