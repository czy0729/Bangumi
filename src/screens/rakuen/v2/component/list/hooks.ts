/*
 * @Author: czy0729
 * @Date: 2026-08-22 10:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-22 10:20:00
 */
import { useMemo } from 'react'
import { _ } from '@stores'
import { useInsets } from '@utils/hooks'
import { H_TABBAR } from '../../ds'

/**
 * 列表内容样式
 * - 顶部留白 = header 高度 + H_TABBAR, 底部避开底部安全区
 */
export function useListStyle() {
  const { headerHeight } = useInsets()

  return useMemo(
    () => ({
      paddingTop: headerHeight + H_TABBAR,
      paddingBottom: _.bottom
    }),
    [headerHeight]
  )
}
