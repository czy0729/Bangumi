/*
 * @Author: czy0729
 * @Date: 2024-04-06 12:30:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-06 12:32:28
 */
import React, { useRef } from 'react'
import { useMount, useRunAfter } from '@utils/hooks'
import { Ctx } from './types'

/** Dollars 页面逻辑 */
export function useDollarsPage({ $ }: Ctx) {
  useRunAfter(() => {
    $.init()
  })

  const interval = useRef(null)
  useMount(() => {
    interval.current = setInterval(() => {
      $.updateDollars()
    }, 8000)

    return () => {
      $.scrollViewRef = null
      $.inputRef = null
      clearInterval(interval.current)
    }
  })
}
