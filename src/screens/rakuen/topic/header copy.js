/*
 * @Author: czy0729
 * @Date: 2022-03-13 06:25:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-14 23:19:23
 */
import React from 'react'
import { Header as CompHeader, Flex, Heatmap } from '@components'
import { copy, open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { info } from '@utils/ui'
import { HOST } from '@constants'
import HeaderTitle from './header-title'
import IconFavor from './icon/favor'

function Header({ y, fixed }, { $, navigation }) {
  return (
    <CompHeader
      mode='transition'
      statusBarEventsType='Topic'
      y={y}
      fixed={fixed}
      title={$.topic.title}
      alias='帖子'
      hm={[`rakuen/topic/${$.topicId}`, 'Topic']}
      headerTitle={<HeaderTitle $={$} navigation={navigation} />}
      headerRight={() => (
        <Flex>
          <IconFavor $={$} />
          <CompHeader.Popover
            data={['浏览器查看', '复制链接', '复制分享', '举报']}
            onSelect={key => {
              t('帖子.右上角菜单', {
                key
              })

              const url = $.params?._url || `${HOST}/rakuen/topic/${$.topicId}`
              switch (key) {
                case '浏览器查看':
                  open(url)
                  break

                case '复制链接':
                  copy(url)
                  info('已复制链接')
                  break

                case '复制分享':
                  copy(`【链接】${$.title} | Bangumi番组计划\n${url}`)
                  info('已复制分享文案')
                  break

                case '举报':
                  open(`${HOST}/group/forum`)
                  break

                default:
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
