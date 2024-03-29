/*
 * @Author: czy0729
 * @Date: 2022-03-16 00:34:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 04:50:08
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function Header(props, { $ }: Ctx) {
  return (
    <CompHeader
      title='用户日志'
      hm={[$.url, 'Blogs']}
      headerRight={() => (
        <CompHeader.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('用户日志.右上角菜单', { key })
              open($.url)
            }
          }}
        >
          <Heatmap id='用户日志.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default obc(Header)
