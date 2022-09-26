/*
 * @Author: czy0729
 * @Date: 2022-03-15 22:57:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-26 21:26:23
 */
import React from 'react'
import { Header as CompHeader } from '@components'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function Header(props, { $ }: Ctx) {
  return (
    <CompHeader
      title={$.params?.name ? `${$.params.name}的影评` : '影评'}
      alias='影评'
      hm={[$.url, 'Reviews']}
      headerRight={() => (
        <CompHeader.Popover
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

export default obc(Header)
