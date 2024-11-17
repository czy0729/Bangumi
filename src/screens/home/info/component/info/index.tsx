/*
 * @Author: czy0729
 * @Date: 2024-11-08 04:57:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 09:56:31
 */
import React from 'react'
import { RenderHtml } from '@components'
import { useStore } from '@stores'
import { appNavigate } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Info() {
  const { $, navigation } = useStore<Ctx>()
  const styles = memoStyles()
  return (
    <RenderHtml
      style={styles.info}
      html={$.rawInfo.replace('展开+', '')}
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
