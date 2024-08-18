/*
 * @Author: czy0729
 * @Date: 2022-07-30 11:02:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-18 07:55:55
 */
import React from 'react'
import { Header as HeaderComp, Heatmap } from '@components'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'

function Header(_props, { $ }: Ctx) {
  const { tag } = $.params
  return (
    <HeaderComp
      title={tag ? `${$.typeCn} · ${tag}` : `${$.typeCn}标签`}
      alias='用户标签'
      hm={[$.url, 'Tag']}
      headerRight={() => (
        <HeaderComp.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('用户标签.右上角菜单', { key })
              open($.url)
            }
          }}
        >
          <Heatmap id='用户标签.右上角菜单' />
        </HeaderComp.Popover>
      )}
    />
  )
}

export default obc(Header)
