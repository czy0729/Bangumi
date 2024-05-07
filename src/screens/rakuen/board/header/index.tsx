/*
 * @Author: czy0729
 * @Date: 2022-03-15 21:38:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 04:33:38
 */
import React from 'react'
import { Header as HeaderComp, Heatmap } from '@components'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header(props, { $ }: Ctx) {
  return (
    <HeaderComp
      title={$.params?.name ? `${$.params.name}的讨论版` : '讨论版'}
      alias='讨论版'
      hm={[$.url, 'Board']}
      headerRight={() => (
        <HeaderComp.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('讨论版.右上角菜单', { key })
              open($.url)
            }
          }}
        >
          <Heatmap id='讨论版.右上角菜单' />
        </HeaderComp.Popover>
      )}
    />
  )
}

export default obc(Header, COMPONENT)
