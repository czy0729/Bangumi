/*
 * @Author: czy0729
 * @Date: 2024-01-10 04:40:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-10 04:42:08
 */
import { useCallback, useEffect } from 'react'
import { useOnScroll } from '@components/header/utils'
import { useRunAfter, useViewport } from '@utils/hooks'
import { Ctx } from './types'

/** 人物页面逻辑 */
export function useMonoPage({ $ }: Ctx) {
  useRunAfter(() => {
    $.init()
  })

  const { visibleBottom, onScroll: onUseViewport } = useViewport()
  useEffect(() => {
    $.setState({
      visibleBottom
    })
  }, [$, visibleBottom])

  const { fixed, onScroll: onUseOnScroll } = useOnScroll()
  const onScroll = useCallback(
    evt => {
      onUseViewport(evt)
      onUseOnScroll(evt)
    },
    [onUseOnScroll, onUseViewport]
  )

  return { fixed, onScroll }
}
