/*
 * @Author: czy0729
 * @Date: 2022-03-12 23:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-12 23:27:18
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { ob } from '@utils/decorators'
import { HOST } from '@constants'

function Header() {
  return (
    <CompHeader
      title='新番'
      hm={['user/lilyurey/index', 'Staff']}
      headerRight={() => (
        <CompHeader.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('新番.右上角菜单', { key })
              open(`${HOST}/user/lilyurey/index`)
            }
          }}
        >
          <Heatmap id='新番.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default ob(Header)
