/*
 * @Author: czy0729
 * @Date: 2024-01-07 17:41:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-21 05:25:32
 */
import React, { useCallback } from 'react'
import { Loading, RenderHtml } from '@components'
import { _, useStore } from '@stores'
import { appNavigate } from '@utils'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'

import type { Ctx } from '../../../types'

function Content() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const handleLinkPress = useCallback(
    (href: string) => {
      appNavigate(
        href,
        navigation,
        {},
        {
          id: '空间.跳转',
          data: {
            from: '关于TA',
            userId: $.userId
          }
        }
      )
    },
    [$, navigation]
  )

  return useObserver(() => {
    if (!$.users._loaded) return <Loading />

    return (
      <RenderHtml
        style={_.mt.sm}
        html={($.content || '(没有填写简介)').replace(/^<br>|\r\n/g, '')}
        onLinkPress={handleLinkPress}
      />
    )
  })
}

export default Content
