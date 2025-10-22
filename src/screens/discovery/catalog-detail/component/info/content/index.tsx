/*
 * @Author: czy0729
 * @Date: 2024-08-10 13:59:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-22 01:09:12
 */
import React from 'react'
import { Expand, RenderHtml } from '@components'
import { _, useStore } from '@stores'
import { appNavigate } from '@utils'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'

import type { Ctx } from '../../../types'

function Content() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { content } = $.detail
    if (!content) return null

    return (
      <Expand style={_.mt.lg} ratio={0.64}>
        <RenderHtml html={content} onLinkPress={href => appNavigate(href, navigation)} />
      </Expand>
    )
  })
}

export default Content
