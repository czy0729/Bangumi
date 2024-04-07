/*
 * @Author: czy0729
 * @Date: 2022-03-10 17:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-18 05:56:25
 */
import React from 'react'
import { Header as HeaderComp, Heatmap } from '@components'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HTML_NOTIFY } from '@constants'
import { COMPONENT } from './ds'

function Header() {
  return (
    <HeaderComp
      title='电波提醒'
      hm={['notify/all', 'Notify']}
      headerRight={() => (
        <HeaderComp.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('电波提醒.右上角菜单', { key })
              open(HTML_NOTIFY())
            }
          }}
        >
          <Heatmap id='电波提醒.右上角菜单' />
        </HeaderComp.Popover>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
