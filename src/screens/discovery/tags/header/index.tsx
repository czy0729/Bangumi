/*
 * @Author: czy0729
 * @Date: 2022-03-12 23:47:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-03 13:06:32
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { getSPAParams, open } from '@utils'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { URL_SPA } from '@constants'
import { Ctx } from '../types'

function Header(props, { $ }: Ctx) {
  return (
    <CompHeader
      title='标签'
      alias='标签索引'
      hm={[$.url, 'Tags']}
      headerRight={() => (
        <CompHeader.Popover
          data={['浏览器查看', '网页版查看']}
          onSelect={key => {
            t('标签索引.右上角菜单', {
              key
            })

            if (key === '浏览器查看') {
              open($.url)
            } else if (key === '网页版查看') {
              const url = `${URL_SPA}/${getSPAParams('Tags')}`
              open(url)
            }
          }}
        >
          <Heatmap id='标签索引.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default obc(Header)
