/*
 * @Author: czy0729
 * @Date: 2022-03-15 21:20:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-15 21:27:50
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { copy, open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { info } from '@utils/ui'
import { HOST } from '@constants'
import HeaderTitle from './header-title'

function Header({ y, fixed }, { $, navigation }) {
  const url = $.params?._url || `${HOST}/blog/${$.blogId}`
  return (
    <CompHeader
      mode='transition'
      statusBarEventsType='Topic'
      y={y}
      fixed={fixed}
      title={$.title}
      alias='日志'
      hm={[url, 'Blog']}
      headerTitle={<HeaderTitle $={$} navigation={navigation} />}
      headerRight={() => (
        <CompHeader.Popover
          data={['浏览器查看', '复制链接', '复制分享']}
          onSelect={key => {
            t('日志.右上角菜单', {
              key
            })

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

              default:
                break
            }
          }}
        >
          <Heatmap id='日志.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default obc(Header)
