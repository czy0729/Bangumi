/*
 * @Author: czy0729
 * @Date: 2022-03-12 23:08:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-22 15:43:06
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
      title='排行榜'
      hm={[$.url, 'Rank']}
      headerRight={() => (
        <CompHeader.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('排行榜.右上角菜单', { key })
              open($.url)
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
