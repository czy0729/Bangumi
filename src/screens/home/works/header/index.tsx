/*
 * @Author: czy0729
 * @Date: 2022-03-15 20:57:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-31 18:07:39
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
      title={$.params?.name ? `${$.params.name}的作品` : '更多作品'}
      alias='作品'
      hm={[$.url, 'Works']}
      headerRight={() => (
        <CompHeader.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('作品.右上角菜单', { key })
              open($.url)
            }
          }}
        >
          <Heatmap id='作品.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default obc(Header)
