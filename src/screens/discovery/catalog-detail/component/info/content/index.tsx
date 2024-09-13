/*
 * @Author: czy0729
 * @Date: 2024-08-10 13:59:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-10 14:29:27
 */
import React from 'react'
import { Expand, RenderHtml } from '@components'
import { _ } from '@stores'
import { appNavigate } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'

function Content(_props, { $, navigation }: Ctx) {
  const { content } = $.detail
  if (!content) return null

  return (
    <Expand style={_.mt.lg} ratio={0.64}>
      <RenderHtml html={content} onLinkPress={href => appNavigate(href, navigation)} />
    </Expand>
  )
}

export default obc(Content, COMPONENT)
