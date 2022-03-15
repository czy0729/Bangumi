/*
 * @Author: czy0729
 * @Date: 2022-03-15 21:38:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-15 21:41:04
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'

function Header(props, { $ }) {
  return (
    <CompHeader
      title={$.params?.name ? `${$.params.name}的讨论版` : '讨论版'}
      alias='讨论版'
      hm={[$.url, 'Board']}
      headerRight={() => (
        <CompHeader.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('讨论版.右上角菜单', { key })
              open($.url)
            }
          }}
        >
          <Heatmap id='讨论版.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default obc(Header)
