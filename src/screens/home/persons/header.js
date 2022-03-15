/*
 * @Author: czy0729
 * @Date: 2022-03-15 01:31:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-15 01:32:44
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
      title={$.params?.name ? `${$.params.name}的制作人员` : '更多制作人员'}
      alias='制作人员'
      hm={[`${HOST}/subject/${$.subjectId}/persons`, 'Persons']}
      headerRight={() => (
        <CompHeader.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('制作人员.右上角菜单', { key })
              open($.url)
            }
          }}
        >
          <Heatmap id='制作人员.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default obc(Header)
