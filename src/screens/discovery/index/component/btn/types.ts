/*
 * @Author: czy0729
 * @Date: 2025-10-20 09:56:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-20 10:07:20
 */
import type { Fn, UserId } from '@types'
import type { MenuItemType } from '../../types'

export type Props = {
  item: MenuItemType
}

export type MainProps = {
  item: MenuItemType
  userId: UserId
  showIcon?: boolean
  onPress: Fn
}
