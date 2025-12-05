/*
 * @Author: czy0729
 * @Date: 2024-11-08 04:57:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-26 03:57:12
 */
import React from 'react'
import { RenderHtml } from '@components'
import { useStore } from '@stores'
import { appNavigate } from '@utils'
import { ob } from '@utils/decorators'
import { processHtml } from '@screens/home/subject/component/info/utils'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Info() {
  const { $, navigation } = useStore<Ctx>()
  const styles = memoStyles()
  const html = $.rawInfo.replace('展开+', '')
  return (
    <RenderHtml
      style={styles.info}
      html={processHtml(html)}
      onLinkPress={href => {
        appNavigate(
          href,
          navigation,
          {},
          {
            id: '条目详情.跳转',
            data: {
              subjectId: $.subjectId
            }
          }
        )
      }}
    />
  )
}

export default ob(Info, COMPONENT)
