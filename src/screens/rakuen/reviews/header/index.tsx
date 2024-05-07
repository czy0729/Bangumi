/*
 * @Author: czy0729
 * @Date: 2022-03-15 22:57:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 01:00:14
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header(props, { $ }: Ctx) {
  return (
    <HeaderComp
      title={$.params?.name ? `${$.params.name}的影评` : '影评'}
      alias='影评'
      hm={[$.url, 'Reviews']}
      headerRight={() => (
        <HeaderComp.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              open($.url)
            }
          }}
        />
      )}
    />
  )
}

export default obc(Header, COMPONENT)
