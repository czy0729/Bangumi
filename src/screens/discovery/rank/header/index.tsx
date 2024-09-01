/*
 * @Author: czy0729
 * @Date: 2022-03-12 23:08:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-01 11:55:10
 */
import React from 'react'
import { Header as HeaderComp, Heatmap } from '@components'
import { getSPAParams, open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { URL_SPA } from '@constants'
import { Ctx } from '../types'
import { COMPONENT, DATA, TEXT_BROWSER, TEXT_SPA } from './ds'

function Header(_props, { $ }: Ctx) {
  return (
    <HeaderComp
      title='排行榜'
      hm={[$.url, 'Rank']}
      headerRight={() => (
        <HeaderComp.Popover
          data={DATA}
          onSelect={key => {
            t('排行榜.右上角菜单', {
              key
            })

            if (key === TEXT_BROWSER) {
              open($.url)
              return
            }

            if (key === TEXT_SPA) {
              const url = `${URL_SPA}/${getSPAParams('Rank')}`
              open(url)
              return
            }
          }}
        >
          <Heatmap id='排行榜.右上角菜单' />
        </HeaderComp.Popover>
      )}
    />
  )
}

export default obc(Header, COMPONENT)
