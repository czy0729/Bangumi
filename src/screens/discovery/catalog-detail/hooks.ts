/*
 * @Author: czy0729
 * @Date: 2024-04-07 08:55:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-07 08:56:27
 */
import { useCallback } from 'react'
import { useOnScroll } from '@components/header/utils'
import { useRunAfter } from '@utils/hooks'
import { Ctx } from './types'

/** 目录详情页面逻辑 */
export function useCatalogDetailPage({ $, navigation }: Ctx) {
  useRunAfter(() => {
    $.init()
  })

  const { fixed, onScroll } = useOnScroll()
  const onScrollFn = useCallback(
    evt => {
      $.onScroll(evt)
      onScroll(evt)
    },
    [$, onScroll]
  )

  return {
    fixed,
    onScroll: onScrollFn
  }
}
