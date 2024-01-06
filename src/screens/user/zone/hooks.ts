/*
 * @Author: czy0729
 * @Date: 2024-01-06 20:39:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-06 20:39:34
 */
import { useEffect } from 'react'
import { StatusBar } from '@components'
import { uiStore } from '@stores'
import { useFocusEffect, useIsFocused, useRunAfter } from '@utils/hooks'
import { Ctx } from './types'

/** 空间页面逻辑 */
export function useZonePage({ $ }: Ctx) {
  const isFocused = useIsFocused()

  useRunAfter(() => {
    $.init()
  })

  useEffect(() => {
    if (!isFocused) uiStore.closePopableSubject()
  }, [isFocused])

  useFocusEffect(() => {
    setTimeout(() => {
      StatusBar.setBarStyle('light-content')
    }, 40)
  })
}
