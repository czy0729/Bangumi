/*
 * @Author: czy0729
 * @Date: 2022-06-06 10:10:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-25 21:10:20
 */
import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { _, systemStore, useStore } from '@stores'
import {
  TEXT_MENU_LAYOUT,
  TEXT_MENU_PAGINATION,
  TEXT_MENU_SETTING,
  TEXT_MENU_YEARS,
  withSplit
} from '@constants'
import { styles } from './styles'

import type { Ctx } from '../../types'
import type { MoreProps } from './types'

function More({ onRefreshOffset }: MoreProps) {
  const { $, navigation } = useStore<Ctx>()

  const { userPagination } = systemStore.setting
  const { list, showYear } = $.state

  const memoData = useMemo(
    () =>
      [
        `${TEXT_MENU_LAYOUT}${withSplit(list ? '列表' : '网格')}` as const,
        `${TEXT_MENU_PAGINATION}${withSplit(userPagination ? '开启' : '关闭')}` as const,
        !list && (`${TEXT_MENU_YEARS}${withSplit(showYear ? '显示' : '不显示')}` as const),
        TEXT_MENU_SETTING
      ].filter(Boolean),
    [list, showYear, userPagination]
  )

  const handleSelect = useCallback(
    (title: (typeof memoData)[number]) => {
      if (title.includes(TEXT_MENU_LAYOUT)) {
        onRefreshOffset()
        return
      }

      if (title.includes(TEXT_MENU_PAGINATION)) {
        systemStore.switchSetting('userPagination')
        $.fetchUserCollectionsNormal(true)
        return
      }

      if (title.includes(TEXT_MENU_YEARS)) {
        $.onToggleShowYear()
      }

      if (title === TEXT_MENU_SETTING) {
        navigation.push('Setting', {
          open: 'User'
        })
      }
    },
    [$, navigation, onRefreshOffset]
  )

  return (
    <ToolBar.Popover
      style={_.mr._sm}
      itemStyle={styles.touch}
      data={memoData}
      icon='md-more-vert'
      iconColor={_.colorDesc}
      iconSize={17}
      type='desc'
      transparent
      onSelect={handleSelect}
    />
  )
}

export default observer(More)
