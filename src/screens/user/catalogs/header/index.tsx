/*
 * @Author: czy0729
 * @Date: 2022-03-16 01:00:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-07 18:23:49
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
      title='用户目录'
      hm={[$.url, 'Board']}
      headerRight={() => (
        <HeaderComp.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('用户目录.右上角菜单', { key })
              open($.url)
            }
          }}
        >
          <Heatmap id='用户目录.右上角菜单' />
        </HeaderComp.Popover>
      )}
    />
  )
}

export default obc(Header, COMPONENT)
