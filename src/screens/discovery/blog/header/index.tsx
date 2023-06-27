/*
 * @Author: czy0729
 * @Date: 2022-03-11 21:51:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-11 21:57:40
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { getSPAParams, open } from '@utils'
import { t } from '@utils/fetch'
import { ob } from '@utils/decorators'
import { URL_SPA } from '@constants'

function Header() {
  return (
    <CompHeader
      title='日志'
      alias='全站日志'
      hm={['discovery/blog', 'DiscoveryBlog']}
      headerRight={() => (
        <CompHeader.Popover
          data={['浏览器查看', '网页版查看']}
          onSelect={key => {
            t('全站日志.右上角菜单', {
              key
            })

            if (key === '浏览器查看') {
              open('https://bgm.tv/blog')
            } else if (key === '网页版查看') {
              const url = `${URL_SPA}/${getSPAParams('DiscoveryBlog')}`
              open(url)
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
