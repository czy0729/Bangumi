/*
 * @Author: czy0729
 * @Date: 2024-03-22 08:05:11
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-03-22 08:05:11
 */
import { useEffect } from 'react'
import { uiStore } from '@stores'
import { useIsFocused, useRunAfter } from '@utils/hooks'
import { Ctx } from './types'

/** 猜你喜欢页面逻辑 */
export function useLikePage({ $ }: Ctx) {
  const isFocused = useIsFocused()

  useEffect(() => {
    if (!isFocused) uiStore.closePopableSubject()
  }, [isFocused])

  useRunAfter(() => {
    $.init()
  })
}
