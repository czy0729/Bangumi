/*
 * @Author: czy0729
 * @Date: 2022-03-12 22:46:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-06 14:27:37
 */
import React from 'react'
import { Header as HeaderComp, Heatmap } from '@components'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header(props, { $ }: Ctx) {
  return (
    <HeaderComp
      title='用户人物'
      hm={[$.url, 'Character']}
      headerRight={() => (
        <HeaderComp.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('收藏的人物.右上角菜单', { key })
              open($.url)
            }
          }}
        >
          <Heatmap id='收藏的人物.右上角菜单' />
        </HeaderComp.Popover>
      )}
    />
  )
}

export default obc(Header, COMPONENT)
