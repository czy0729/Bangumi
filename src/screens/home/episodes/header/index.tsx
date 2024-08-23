/*
 * @Author: czy0729
 * @Date: 2022-03-15 01:10:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-18 15:41:42
 */
import React from 'react'
import { Header as HeaderComp, Heatmap } from '@components'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header(_props, { $ }: Ctx) {
  return (
    <HeaderComp
      title={$.params?.name ? `${$.params.name}的章节` : '章节'}
      alias='章节'
      hm={[$.url, 'Episodes']}
      headerRight={() => (
        <HeaderComp.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('章节.右上角菜单', { key })
              open($.url)
            }
          }}
        >
          <Heatmap id='章节.右上角菜单' />
        </HeaderComp.Popover>
      )}
    />
  )
}

export default obc(Header, COMPONENT)
