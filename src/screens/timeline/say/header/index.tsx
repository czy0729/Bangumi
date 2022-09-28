/*
 * @Author: czy0729
 * @Date: 2022-03-16 00:00:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 06:29:33
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function Header(props, { $ }: Ctx) {
  return (
    <CompHeader
      title={$.isNew ? '新吐槽' : '吐槽'}
      alias='吐槽'
      hm={[$.url, 'Say']}
      headerRight={() => (
        <CompHeader.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('吐槽.右上角菜单', { key })
              open($.url)
            }
          }}
        >
          <Heatmap id='吐槽.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default obc(Header)
