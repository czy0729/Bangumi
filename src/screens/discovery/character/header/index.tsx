/*
 * @Author: czy0729
 * @Date: 2022-03-12 22:46:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:33:31
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
      title='用户人物'
      hm={[$.url, 'Character']}
      headerRight={() => (
        <HeaderComp.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('收藏的人物.右上角菜单', { key })
              open($.url)
            }
          }}
        >
          <Heatmap id='收藏的人物.右上角菜单' />
        </HeaderComp.Popover>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
