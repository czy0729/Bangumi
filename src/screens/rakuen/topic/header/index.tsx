/*
 * @Author: czy0729
 * @Date: 2022-03-13 06:25:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-03 23:39:52
 */
import React from 'react'
import { Flex, Header as CompHeader, Heatmap } from '@components'
import { copy, getSPAParams, open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST, URL_SPA } from '@constants'
import HeaderTitle from '../component/header-title'
import { Ctx } from '../types'
import IconFavor from '../icon/favor'
import { COMPONENT, DATA, TEXT_COPY, TEXT_REPORT, TEXT_SHARE, TEXT_SPA } from './ds'

function Header(props, { $, navigation }: Ctx) {
  const { fixed } = $.state
  const url = $.params?._url || `${HOST}/rakuen/topic/${$.topicId}`
  return (
    <CompHeader
      mode='transition'
      statusBarEventsType='Topic'
      fixed={fixed}
      title={$.topic.title}
      alias='帖子'
      hm={[url, 'Topic']}
      headerTitle={<HeaderTitle $={$} navigation={navigation} />}
      headerRight={() => (
        <Flex>
          <IconFavor $={$} />
          <CompHeader.Popover
            data={[`帖子 · ${$.topicId}`, ...DATA]}
            onSelect={key => {
              t('帖子.右上角菜单', {
                key: key.includes('帖子') ? '浏览器查看' : key
              })

              switch (key) {
                case TEXT_SPA:
                  open(
                    `${URL_SPA}/${getSPAParams('Topic', {
                      topicId: $.topicId
                    })}`
                  )
                  break

                case TEXT_COPY:
                  copy(url, '已复制链接')
                  break

                case TEXT_SHARE:
                  copy(`【链接】${$.title} | Bangumi番组计划\n${url}`, '已复制分享文案')
                  break

                case TEXT_REPORT:
                  open(`${HOST}/group/forum`)
                  break

                default:
                  open(url)
                  break
              }
            }}
          >
            <Heatmap id='帖子.右上角菜单' />
          </CompHeader.Popover>
        </Flex>
      )}
    />
  )
}

export default obc(Header, COMPONENT)
