/*
 * @Author: czy0729
 * @Date: 2024-01-07 17:41:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-12 02:00:02
 */
import React from 'react'
import { Loading, RenderHtml } from '@components'
import { _, useStore } from '@stores'
import { appNavigate } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'

function Content() {
  const { $, navigation } = useStore<Ctx>()
  if (!$.users._loaded) return <Loading />

  return (
    <RenderHtml
      style={_.mt.sm}
      html={$.content || '(没有填写简介)'}
      onLinkPress={href => {
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
      }}
    />
  )
}

export default ob(Content, COMPONENT)
