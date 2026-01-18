/*
 * @Author: czy0729
 * @Date: 2026-01-17 11:03:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-18 16:58:42
 */
import type { IconfontNames, Paths } from '@types'

export type Props = {
  id: Paths | 'Open' | 'Netabare' | 'Split' | 'Link' | 'Cancel' | 'Save'
  icon?: IconfontNames | [IconfontNames, IconfontNames]
  text?: string
  size?: number
  wrap?: boolean
}
