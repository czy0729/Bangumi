/*
 * @Author: czy0729
 * @Date: 2024-08-10 13:59:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:21:55
 */
import React from 'react'
import { Expand, RenderHtml } from '@components'
import { _, useStore } from '@stores'
import { appNavigate } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'

function Content() {
  const { $, navigation } = useStore<Ctx>()
  const { content } = $.detail
  if (!content) return null

  return (
    <Expand style={_.mt.lg} ratio={0.64}>
      <RenderHtml html={content} onLinkPress={href => appNavigate(href, navigation)} />
    </Expand>
  )
}

export default ob(Content, COMPONENT)
