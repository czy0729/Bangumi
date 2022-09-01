/*
 * @Author: czy0729
 * @Date: 2022-03-11 21:51:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-11 21:57:40
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { ob } from '@utils/decorators'

function Header() {
  return (
    <CompHeader
      title='日志'
      alias='全站日志'
      hm={['discovery/blog', 'DiscoveryBlog']}
      headerRight={() => (
        <CompHeader.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('全站日志.右上角菜单', { key })
              open('https://bgm.tv/blog')
            }
          }}
        >
          <Heatmap id='全站日志.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default ob(Header)
