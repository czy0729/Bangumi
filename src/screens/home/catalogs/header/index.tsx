/*
 * @Author: czy0729
 * @Date: 2022-03-15 00:48:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 09:16:59
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
      title={$.params?.name ? `包含${$.params.name}的目录` : '条目目录'}
      alias='条目目录'
      hm={[$.url, 'SubjectCatalogs']}
      headerRight={() => (
        <CompHeader.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('条目目录.右上角菜单', { key })
              open($.url)
            }
          }}
        >
          <Heatmap id='条目目录.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default obc(Header)
