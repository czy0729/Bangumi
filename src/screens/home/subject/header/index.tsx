/*
 * @Author: czy0729
 * @Date: 2022-03-13 06:25:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 01:15:11
 */
import React from 'react'
import { Flex, Header as CompHeader, Heatmap } from '@components'
import { IconTouchable } from '@_'
import { _, systemStore } from '@stores'
import { cnjp, copy, info, open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { STORYBOOK, URL_ABOUT } from '@constants'
import HeaderTitle from '../component/header-title'
import { Ctx } from '../types'
import {
  COMPONENT,
  TEXT_APP,
  TEXT_COPY,
  TEXT_LAYOUT,
  TEXT_POST_SHARE,
  TEXT_SHARE,
  TEXT_WEB_SHARE
} from './ds'

function Header({ index, onScrollTo }, { $, navigation }: Ctx) {
  const { fixed } = $.state
  const color = _.isDark || !fixed ? '#fff' : '#000'
  const data = [
    `浏览器打开 · ${$.subjectId}`,
    TEXT_COPY,
    TEXT_SHARE,
    TEXT_POST_SHARE,
    TEXT_WEB_SHARE,
    TEXT_LAYOUT
  ]
  if (STORYBOOK) data.push(TEXT_APP)

  const showHomeIcon = !fixed && index >= 4
  return (
    <CompHeader
      mode='transition'
      statusBarEventsType='Subject'
      fixed={fixed}
      title='条目'
      domTitle={$.jp || $.cn}
      hm={[$.url, 'Subject']}
      headerLeft={
        showHomeIcon && (
          <IconTouchable
            name='icon-home'
            size={19}
            color={_.__colorPlain__}
            onPress={() => {
              navigation.popToTop()
            }}
          />
        )
      }
      headerTitle={<HeaderTitle $={$} />}
      headerRight={() => (
        <Flex>
          <CompHeader.Popover
            key={String($.locationDS.length)}
            style={_.mr.xs}
            data={$.locationDS}
            name='md-menu-open'
            color={color}
            onSelect={key => {
              setTimeout(() => {
                onScrollTo(key)
              }, 0)
            }}
          />
          <CompHeader.Popover
            data={data}
            color={color}
            onSelect={key => {
              t('条目.右上角菜单', {
                subjectId: $.subjectId,
                key
              })

              setTimeout(() => {
                switch (key) {
                  case TEXT_COPY:
                    copy($.url, '已复制链接')
                    break

                  case TEXT_SHARE:
                    copy(
                      `【链接】${cnjp($.cn, $.jp)} | Bangumi番组计划\n${$.url}`,
                      '已复制分享文案'
                    )
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

                  case TEXT_APP:
                    open(URL_ABOUT)
                    break

                  default:
                    open($.url)
                    break
                }
              }, 0)
            }}
          >
            <Heatmap id='条目.右上角菜单' />
          </CompHeader.Popover>
        </Flex>
      )}
    />
  )
}

export default obc(Header, COMPONENT)
