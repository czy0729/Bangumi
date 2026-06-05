/*
 * @Author: czy0729
 * @Date: 2024-11-08 04:57:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 19:54:58
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { RenderHtml } from '@components'
import { _, useStore } from '@stores'
import { appNavigate } from '@utils'
import { processHtml } from '@screens/home/subject/component/info/utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Info() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const handleLinkPress = useCallback(
    (href: string) => {
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
    },
    [$.subjectId, navigation]
  )

  const styles = memoStyles()

  const html = $.rawInfo.replace('展开+', '')

  return (
    <RenderHtml
      style={styles.info}
      baseFontStyle={_.baseFontStyle.md}
      html={processHtml(html)}
      onLinkPress={handleLinkPress}
    />
  )
}

export default observer(Info)
