/*
 * @Author: czy0729
 * @Date: 2022-03-15 02:13:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-25 19:26:02
 */
import React from 'react'
import { Flex, Header as CompHeader, Heatmap } from '@components'
import { cnjp, copy, open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import Extra from '../component/extra'
import HeaderTitle from '../component/header-title'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header({ fixed }, { $, navigation }: Ctx) {
  return (
    <CompHeader
      mode='transition'
      statusBarEventsType='Topic'
      fixed={fixed}
      title='人物'
      domTitle={$.jp || $.cn}
      hm={[$.url, 'Mono']}
      headerTitle={<HeaderTitle $={$} navigation={navigation} />}
      headerRight={() => (
        <Flex>
          <Extra $={$} navigation={navigation} />
          <CompHeader.Popover
            data={['浏览器查看', '复制链接', '复制分享']}
            onSelect={key => {
              t('人物.右上角菜单', {
                key
              })

              switch (key) {
                case '浏览器查看':
                  open($.url)
                  break

                case '复制链接':
                  copy($.url, '已复制链接')
                  break

                case '复制分享':
                  copy(`【链接】${cnjp($.cn, $.jp)} | Bangumi番组计划\n${$.url}`, '已复制分享文案')
                  break

                default:
                  break
              }
            }}
          >
            <Heatmap id='人物.右上角菜单' />
          </CompHeader.Popover>
        </Flex>
      )}
    />
  )
}

export default obc(Header, COMPONENT)
