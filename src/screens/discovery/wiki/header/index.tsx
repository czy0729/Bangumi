/*
 * @Author: czy0729
 * @Date: 2022-03-13 00:03:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-04 06:56:51
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST } from '@constants'
import { COMPONENT } from './ds'

function Header() {
  return (
    <CompHeader
      title='维基人'
      hm={['wiki', 'Wiki']}
      headerRight={() => (
        <CompHeader.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('维基人.右上角菜单', { key })
              open(`${HOST}/wiki`)
            }
          }}
        >
          <Heatmap id='维基人.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
