/*
 * @Author: czy0729
 * @Date: 2022-03-16 00:34:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 04:50:08
 */
import React from 'react'
import { Header as HeaderComp, Heatmap } from '@components'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'

function Header(props, { $ }: Ctx) {
  return (
    <HeaderComp
      title='用户日志'
      hm={[$.url, 'Blogs']}
      headerRight={() => (
        <HeaderComp.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('用户日志.右上角菜单', { key })
              open($.url)
            }
          }}
        >
          <Heatmap id='用户日志.右上角菜单' />
        </HeaderComp.Popover>
      )}
    />
  )
}

export default obc(Header)
