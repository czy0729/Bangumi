/*
 * @Author: czy0729
 * @Date: 2023-04-11 15:43:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-30 21:00:13
 */
import React from 'react'
import { Header as HeaderComp, Heatmap } from '@components'
import { getSPAParams, open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST, STORYBOOK, URL_SPA } from '@constants'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

const TEXT_BROWSER = '浏览器查看'
const TEXT_SPA = '网页版查看'
const DATA = [TEXT_BROWSER]
if (!STORYBOOK) DATA.push(TEXT_SPA)

function Header(props, { $ }: Ctx) {
  return (
    <HeaderComp
      title='目录'
      hm={['discovery/catalog', 'Catalog']}
      headerRight={() => (
        <HeaderComp.Popover
          data={DATA}
          onSelect={key => {
            t('目录.右上角菜单', {
              key
            })

            if (key === TEXT_BROWSER) {
              open(`${HOST}/index/browser?orderby=collect`)
              return
            }

            if (key === TEXT_SPA) {
              const url = `${URL_SPA}/${getSPAParams('Catalog')}`
              open(url)
              return
            }
          }}
        >
          <Heatmap id='目录.右上角菜单' />
        </HeaderComp.Popover>
      )}
    />
  )
}

export default obc(Header, COMPONENT)
