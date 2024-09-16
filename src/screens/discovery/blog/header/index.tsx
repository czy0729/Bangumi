/*
 * @Author: czy0729
 * @Date: 2022-03-11 21:51:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-16 20:26:05
 */
import React from 'react'
import { Header as HeaderComp, Heatmap } from '@components'
import { getSPAParams, open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { URL_SPA, WEB } from '@constants'
import { COMPONENT } from './ds'

const TEXT_BROWSER = '浏览器查看'
const TEXT_SPA = '网页版查看'
const DATA = [TEXT_BROWSER]
if (!WEB) DATA.push(TEXT_SPA)

function Header() {
  return (
    <HeaderComp
      title='日志'
      alias='全站日志'
      hm={['discovery/blog', 'DiscoveryBlog']}
      headerRight={() => (
        <HeaderComp.Popover
          data={DATA}
          onSelect={key => {
            if (key === TEXT_BROWSER) {
              open('https://bgm.tv/blog')
            } else if (key === TEXT_SPA) {
              const url = `${URL_SPA}/${getSPAParams('DiscoveryBlog')}`
              open(url)
            }

            t('全站日志.右上角菜单', {
              key
            })
          }}
        >
          <Heatmap id='全站日志.右上角菜单' />
        </HeaderComp.Popover>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
