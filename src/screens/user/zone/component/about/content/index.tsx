/*
 * @Author: czy0729
 * @Date: 2024-01-07 17:41:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:00:43
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

  // 去除 APP 高清头像背景的代码
  const sign =
    String($.users.sign || '').replace(
      /<span style="font-size:0px; line-height:0px;">(.+?)<\/span>/g,
      ''
    ) || '(没有填写简介)'

  return (
    <RenderHtml
      style={_.mt.sm}
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

export default ob(Content, COMPONENT)
