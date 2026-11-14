/*
 * @Author: czy0729
 * @Date: 2026-11-13 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 13:00:00
 *
 * 发现页菜单项点击行为
 */
import { useCallback } from 'react'
import { pressMenu } from '@_/base/more-menu'
import { useStore } from '@stores'
import { COMPONENT } from './ds'

import type { MenuItem } from '@types'
import type { Ctx } from '../../types'

export function useMenuOnPress(item: MenuItem, from: 'Btn' | 'More' = 'Btn') {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const onPress = useCallback(() => {
    pressMenu(item, {
      from,
      navigation,
      onOpen: () => $.toggleDragging()
    })
  }, [$, from, item, navigation])

  return {
    onPress
  }
}
