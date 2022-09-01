/*
 * @Author: czy0729
 * @Date: 2022-03-15 20:45:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 11:06:29
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
      title={$.params?.name ? `${$.params.name}的角色` : '角色'}
      alias='角色'
      hm={[$.url, 'Voices']}
      headerRight={() => (
        <CompHeader.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('角色.右上角菜单', { key })
              open($.url)
            }
          }}
        >
          <Heatmap id='角色.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default obc(Header)
