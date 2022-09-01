/*
 * @Author: czy0729
 * @Date: 2022-03-11 18:03:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 12:18:23
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { NEWS } from '@constants'
import { Ctx } from '../types'

function Header(props, { $ }: Ctx) {
  return (
    <CompHeader
      title='资讯'
      alias='Anitama'
      hm={['discovery/anitama', 'Anitama']}
      headerRight={() => (
        <CompHeader.Popover
          name='md-menu'
          data={[...NEWS.map(item => item.label), '浏览器查看']}
          onSelect={key => {
            t('Anitama.右上角菜单', {
              key
            })

            switch (key) {
              case '浏览器查看':
                open($.url)
                break

              default:
                $.toggleType(key)
                break
            }
          }}
        >
          <Heatmap id='Anitama.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default obc(Header)
