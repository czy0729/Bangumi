/*
 * @Author: czy0729
 * @Date: 2022-03-15 01:10:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-15 01:23:59
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { HOST } from '@constants'

function Header(props, { $ }) {
  return (
    <CompHeader
      title={$.params?.name ? `${$.params.name}的角色` : '更多角色'}
      alias='更多角色'
      hm={[`${HOST}/subject/${$.subjectId}/characters`, 'Characters']}
      headerRight={() => (
        <CompHeader.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('更多角色.右上角菜单', { key })
              open($.url)
            }
          }}
        >
          <Heatmap id='更多角色.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default obc(Header)
