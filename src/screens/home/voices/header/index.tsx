/*
 * @Author: czy0729
 * @Date: 2022-03-15 20:45:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:38:54
 */
import React from 'react'
import { Header as HeaderComp, Heatmap } from '@components'
import { useStore } from '@stores'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderComp
      title={$.params?.name ? `${$.params.name}的角色` : '角色'}
      alias='角色'
      hm={[$.url, 'Voices']}
      headerRight={() => (
        <HeaderComp.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('角色.右上角菜单', { key })
              open($.url)
            }
          }}
        >
          <Heatmap id='角色.右上角菜单' />
        </HeaderComp.Popover>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
