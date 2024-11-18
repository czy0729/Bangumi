/*
 * @Author: czy0729
 * @Date: 2024-01-06 20:39:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:56:35
 */
import { useEffect } from 'react'
import { StatusBar } from '@components'
import { uiStore, useInitStore } from '@stores'
import { useFocusEffect, useIsFocused, useMount, useRunAfter } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 空间页面逻辑 */
export function useZonePage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useRunAfter(() => {
    $.init()
  })

  const isFocused = useIsFocused()
  useEffect(() => {
    if (!isFocused) {
      $.resetRemarkModal()
      uiStore.closePopableSubject()
      uiStore.closeLikesGrid()
    }
  }, [$, isFocused])

  useFocusEffect(() => {
    setTimeout(() => {
      StatusBar.setBarStyle('light-content')
    }, 40)
  })

  /** 页面销毁 */
  useMount(() => {
    return () => {
      $.setState({
        mounted: false
      })
    }
  })

  return context
}
