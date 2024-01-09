/*
 * @Author: czy0729
 * @Date: 2022-03-12 23:21:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-09 04:30:58
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header(props, { $ }: Ctx) {
  return (
    <CompHeader
      title='搜索'
      hm={[$.url, 'Search']}
      headerRight={() => (
        <CompHeader.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('搜索.右上角菜单', { key })

              open($.url)
            }
          }}
        >
          <Heatmap id='搜索.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default obc(Header, COMPONENT)
