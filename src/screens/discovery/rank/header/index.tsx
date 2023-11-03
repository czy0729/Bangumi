/*
 * @Author: czy0729
 * @Date: 2022-03-12 23:08:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-20 08:05:38
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { getSPAParams, open } from '@utils'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { STORYBOOK, URL_SPA } from '@constants'
import { Ctx } from '../types'

const TEXT_BROWSER = '浏览器查看'
const TEXT_SPA = '网页版查看'
const DATA = [TEXT_BROWSER]
if (!STORYBOOK) DATA.push(TEXT_SPA)

function Header(props, { $ }: Ctx) {
  return (
    <CompHeader
      title='排行榜'
      hm={[$.url, 'Rank']}
      headerRight={() => (
        <CompHeader.Popover
          data={DATA}
          onSelect={key => {
            t('排行榜.右上角菜单', {
              key
            })

            if (key === TEXT_BROWSER) {
              open($.url)
            } else if (key === TEXT_SPA) {
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
