/*
 * @Author: czy0729
 * @Date: 2022-03-12 23:08:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-27 11:00:03
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { getSPAParams, open } from '@utils'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { URL_SPA } from '@constants'
import { Ctx } from '../types'

function Header(props, { $ }: Ctx) {
  return (
    <CompHeader
      title='排行榜'
      hm={[$.url, 'Rank']}
      headerRight={() => (
        <CompHeader.Popover
          data={['浏览器查看', '网页版查看']}
          onSelect={key => {
            t('排行榜.右上角菜单', {
              key
            })

            if (key === '浏览器查看') {
              open($.url)
            } else if (key === '网页版查看') {
              const url = `${URL_SPA}/${getSPAParams('Rank')}`
              open(url)
            }
          }}
        >
          <Heatmap id='排行榜.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default obc(Header)
