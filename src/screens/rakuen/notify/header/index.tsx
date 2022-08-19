/*
 * @Author: czy0729
 * @Date: 2022-03-10 17:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 15:34:45
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { ob } from '@utils/decorators'
import { HTML_NOTIFY } from '@constants'

function Header() {
  return (
    <CompHeader
      title='电波提醒'
      hm={['notify/all', 'Notify']}
      headerRight={() => (
        <CompHeader.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('电波提醒.右上角菜单', { key })
              open(HTML_NOTIFY())
            }
          }}
        >
          <Heatmap id='电波提醒.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default ob(Header)
