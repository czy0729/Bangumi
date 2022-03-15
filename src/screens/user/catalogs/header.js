/*
 * @Author: czy0729
 * @Date: 2022-03-16 01:00:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 01:03:17
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'

function Header(props, { $ }) {
  return (
    <CompHeader
      title='用户目录'
      hm={[$.url, 'Board']}
      headerRight={() => (
        <CompHeader.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('用户目录.右上角菜单', { key })
              open($.url)
            }
          }}
        >
          <Heatmap id='用户目录.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default obc(Header)
