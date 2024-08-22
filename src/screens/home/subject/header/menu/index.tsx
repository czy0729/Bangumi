/*
 * @Author: czy0729
 * @Date: 2024-05-18 03:58:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-22 17:07:26
 */
import React from 'react'
import { Flex, Header as HeaderComp, Heatmap } from '@components'
import { _, systemStore } from '@stores'
import { cnjp, copy, info, open } from '@utils'
import { obc } from '@utils/decorators'
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

function Menu({ onScrollTo }, { $, navigation }: Ctx) {
  const color = _.isDark || !$.state.fixed ? '#fff' : '#000'
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
    <Flex>
      <HeaderComp.Popover
        key={String($.locationDS.length)}
        style={_.mr.xs}
        data={$.locationDS}
        name='md-menu-open'
        color={color}
        onSelect={key => {
          onScrollTo(key)
        }}
      />
      <HeaderComp.Popover
        data={data}
        color={color}
        onSelect={key => {
          t('条目.右上角菜单', {
            subjectId: $.subjectId,
            key
          })

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
        }}
      >
        <Heatmap id='条目.右上角菜单' />
      </HeaderComp.Popover>
    </Flex>
  )
}

export default obc(Menu)
