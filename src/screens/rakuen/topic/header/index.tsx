/*
 * @Author: czy0729
 * @Date: 2022-03-13 06:25:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-02 12:41:27
 */
import React from 'react'
import { Header as CompHeader, Flex, Heatmap } from '@components'
import { copy, getSPAParams, open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST, URL_SPA } from '@constants'
import HeaderTitle from '../header-title'
import IconFavor from '../icon/favor'
import { Ctx } from '../types'

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
            data={[`帖子 · ${$.topicId}`, '网页版查看', '复制链接', '复制分享', '举报']}
            onSelect={key => {
              t('帖子.右上角菜单', {
                key: key.includes('帖子') ? '浏览器查看' : key
              })

              switch (key) {
                case '复制链接':
                  copy(url, '已复制链接')
                  break

                case '复制分享':
                  copy(`【链接】${$.title} | Bangumi番组计划\n${url}`, '已复制分享文案')
                  break

                case '举报':
                  open(`${HOST}/group/forum`)
                  break

                case '网页版查看':
                  open(
                    `${URL_SPA}/${getSPAParams('Topic', {
                      topicId: $.topicId
                    })}`
                  )
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
