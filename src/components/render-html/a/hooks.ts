/*
 * @Author: czy0729
 * @Date: 2026-09-07 03:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-07 03:00:00
 *
 * 依据链接与设置, 异步把 a 标签解析成条目 / 帖子 / 人物媒体块
 */
import { useCallback, useEffect, useState } from 'react'
import { rakuenStore } from '@stores'
import { matchBgmLink } from '@utils'
import { logger } from '@utils/dev'
import { getACSearch, getMediaType, getMono, getSubject, getTopic } from './utils'
import { COMPONENT } from './ds'

import type { ReactElement } from 'react'
import type { UseAOptions } from './types'

const TAG = `${COMPONENT}/hooks` as const

/**
 * 解析 a 标签
 * @param options 组件参数
 */
export function useA({ style, attrs = {}, passProps, onPress }: UseAOptions) {
  const { href } = attrs
  const matched = matchBgmLink(href) || undefined
  const route = matched?.route
  const params = (matched?.params ?? {}) as Record<string, string>
  const app = matched?.app

  const [el, setEl] = useState<ReactElement | null>(null)

  const onLinkPress = useCallback(() => {
    if (typeof onPress !== 'function') return
    onPress(null, href)
  }, [href, onPress])

  useEffect(() => {
    // 列队回调是延迟触发的, 卸载后不再 setState
    let mounted = true
    const render = (element: ReactElement | null) => {
      if (mounted) setEl(element)
    }

    const { matchLink, acSearchV2 } = rakuenStore.setting

    ;(async () => {
      try {
        switch (getMediaType({ route, app, topicId: params.topicId, matchLink, acSearchV2 })) {
          case 'ac':
            render(getACSearch({ style, passProps, params, onPress }))
            break

          case 'subject':
            render(await getSubject({ passProps, params, href, onLinkPress, onRender: render }))
            break

          case 'topic':
            render(await getTopic({ passProps, params, onLinkPress, onRender: render }))
            break

          case 'mono':
            render(getMono({ passProps, params, onLinkPress, onRender: render }))
            break

          default:
            break
        }
      } catch (error) {
        logger.error(TAG, 'useA', error)
      }
    })()

    return () => {
      mounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    /** 解析出的媒体块, 为空时渲染文字链接 */
    el,

    /** 文字链接点击回调 */
    onLinkPress
  }
}
