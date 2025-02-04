/*
 * @Author: czy0729
 * @Date: 2025-02-04 07:04:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-04 07:07:48
 */
import React from 'react'
import { HeaderV2Popover } from '@components'
import { systemStore, useStore } from '@stores'
import { cnjp, copy, info, open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { URL_ABOUT, WEB } from '@constants'
import { Ctx } from '../../types'
import {
  TEXT_APP,
  TEXT_COPY,
  TEXT_LAYOUT,
  TEXT_POST_SHARE,
  TEXT_SETTING,
  TEXT_SHARE,
  TEXT_WEB_SHARE
} from './ds'
import { styles } from './styles'

function MenuComponent({ color }) {
  const { $, navigation } = useStore<Ctx>()
  const data = [
    `浏览器打开 · ${$.subjectId}`,
    TEXT_COPY,
    TEXT_SHARE,
    TEXT_POST_SHARE,
    TEXT_WEB_SHARE,
    TEXT_LAYOUT,
    TEXT_SETTING
  ]
  if (WEB) data.push(TEXT_APP)

  return (
    <HeaderV2Popover
      style={styles.menu}
      data={data}
      color={color}
      onSelect={key => {
        switch (key) {
          case TEXT_COPY:
            copy($.url, '已复制链接')
            break

          case TEXT_SHARE:
            copy(`【链接】${cnjp($.cn, $.jp)} | Bangumi番组计划\n${$.url}`, '已复制分享文案')
            break

          case TEXT_POST_SHARE:
            $.onPostShare(navigation)
            break

          case TEXT_WEB_SHARE:
            $.onWebShare()
            break

          case TEXT_LAYOUT:
            systemStore.resetSubjectLayout()
            info('已重置')
            break

          case TEXT_SETTING:
            navigation.push('Setting', {
              open: 'Subject'
            })
            break

          case TEXT_APP:
            open(URL_ABOUT)
            break

          default:
            open($.url)
            break
        }

        t('条目.右上角菜单', {
          subjectId: $.subjectId,
          key
        })
      }}
    />
  )
}

export default ob(MenuComponent)
