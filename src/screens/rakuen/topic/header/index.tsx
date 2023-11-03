/*
 * @Author: czy0729
 * @Date: 2022-03-13 06:25:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-20 08:18:55
 */
import React from 'react'
import { Header as CompHeader, Flex, Heatmap } from '@components'
import { copy, getSPAParams, open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST, STORYBOOK, URL_SPA } from '@constants'
import HeaderTitle from '../header-title'
import IconFavor from '../icon/favor'
import { Ctx } from '../types'

const TEXT_SPA = '网页版查看'
const TEXT_COPY = '复制链接'
const TEXT_SHARE = '复制分享'
const TEXT_REPORT = '举报'
const DATA = [TEXT_COPY, TEXT_SHARE, TEXT_REPORT]
if (!STORYBOOK) DATA.unshift(TEXT_SPA)

function Header({ fixed }, { $, navigation }: Ctx) {
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

export default obc(Header)
