/*
 * @Author: czy0729
 * @Date: 2022-06-06 10:10:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:11:21
 */
import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { _, systemStore, useStore } from '@stores'
import {
  TEXT_MENU_LAYOUT,
  TEXT_MENU_PAGINATION,
  TEXT_MENU_SPLIT_LEFT,
  TEXT_MENU_SPLIT_RIGHT,
  TEXT_MENU_YEARS
} from '@constants'
import { styles } from './styles'

import type { Ctx } from '../../types'
import type { MoreProps } from './types'

function More({ onRefreshOffset }: MoreProps) {
  const { $ } = useStore<Ctx>()

  const { userPagination } = systemStore.setting
  const { list, showYear } = $.state

  const memoData = useMemo(
    () =>
      [
        `${TEXT_MENU_LAYOUT}${TEXT_MENU_SPLIT_LEFT}${
          list ? '列表' : '网格'
        }${TEXT_MENU_SPLIT_RIGHT}` as const,
        `${TEXT_MENU_PAGINATION}${TEXT_MENU_SPLIT_LEFT}${
          userPagination ? '开启' : '关闭'
        }${TEXT_MENU_SPLIT_RIGHT}` as const,
        !list &&
          (`${TEXT_MENU_YEARS}${TEXT_MENU_SPLIT_LEFT}${
            showYear ? '显示' : '不显示'
          }${TEXT_MENU_SPLIT_RIGHT}` as const)
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
    },
    [$, onRefreshOffset]
  )

  return (
    <ToolBar.Popover
      style={_.mr._sm}
      itemStyle={styles.touch}
      data={memoData}
      icon='md-more-vert'
      iconColor={_.colorDesc}
      iconSize={16}
      type='desc'
      transparent
      onSelect={handleSelect}
    />
  )
}

export default observer(More)
