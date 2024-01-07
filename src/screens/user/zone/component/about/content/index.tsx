/*
 * @Author: czy0729
 * @Date: 2024-01-07 17:41:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-07 17:45:20
 */
import React from 'react'
import { RenderHtml } from '@components'
import { _ } from '@stores'
import { appNavigate } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'

function Content(props, { $, navigation }: Ctx) {
  // 去除 APP 高清头像背景的代码
  const sign =
    String($.users.sign).replace(
      /<span style="font-size:0px; line-height:0px;">(.+?)<\/span>/g,
      ''
    ) || '(什么都没有)'

  return (
    <RenderHtml
      style={_.mt.lg}
      html={sign}
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

export default obc(Content, COMPONENT)
