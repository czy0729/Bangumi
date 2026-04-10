/*
 * @Author: czy0729
 * @Date: 2024-08-10 13:59:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-10 01:29:19
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Expand, RenderHtml } from '@components'
import { _, useStore } from '@stores'
import { appNavigate } from '@utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../../types'

function Content() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const { content } = $.detail
  if (!content) return null

  return (
    <Expand style={_.mt.lg} ratio={0.64}>
      <RenderHtml html={content} onLinkPress={href => appNavigate(href, navigation)} />
    </Expand>
  )
}

export default observer(Content)
