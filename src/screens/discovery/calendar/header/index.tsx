/*
 * @Author: czy0729
 * @Date: 2022-03-11 01:55:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-16 04:29:30
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { getSPAParams, open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST, URL_SPA } from '@constants'
import { Ctx } from '../types'
import { COMPONENT, DATA, TEXT_BROWSER, TEXT_SPA } from './ds'

function Header(props, { $ }: Ctx) {
  return (
    <CompHeader
      title='每日放送'
      hm={['calendar', 'Calendar']}
      headerRight={() => (
        <CompHeader.Popover
          data={DATA}
          onSelect={key => {
            t('每日放送.右上角菜单', {
              key
            })

            if (key === TEXT_BROWSER) {
              open(`${HOST}/calendar`)
              return
            }

            if (key === TEXT_SPA) {
              const url = `${URL_SPA}/${getSPAParams('Calendar')}`
              open(url)
              return
            }
          }}
        >
          <Heatmap id='每日放送.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default obc(Header, COMPONENT)
