/*
 * @Author: czy0729
 * @Date: 2022-03-15 22:57:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-15 23:01:46
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'

function Header(props, { $ }) {
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
              t('影评.右上角菜单', { key })
              open($.url)
            }
          }}
        >
          <Heatmap id='影评.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default obc(Header)
