/*
 * @Author: czy0729
 * @Date: 2022-03-16 01:23:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-10 14:29:45
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
      title='好友'
      headerTitleAlign='left'
      hm={[$.url, 'Friends']}
      headerRight={() => (
        <HeaderComp.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('好友.右上角菜单', { key })
              open($.url)
            }
          }}
        >
          <Heatmap id='好友.右上角菜单' />
        </HeaderComp.Popover>
      )}
    />
  )
}

export default obc(Header, COMPONENT)
