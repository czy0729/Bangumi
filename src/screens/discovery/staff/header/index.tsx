/*
 * @Author: czy0729
 * @Date: 2022-03-12 23:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 14:04:00
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { getSPAParams, open } from '@utils'
import { t } from '@utils/fetch'
import { ob } from '@utils/decorators'
import { HOST, URL_SPA } from '@constants'

function Header() {
  return (
    <CompHeader
      title='新番'
      hm={['user/lilyurey/index', 'Staff']}
      headerRight={() => (
        <CompHeader.Popover
          data={['浏览器查看', '网页版查看']}
          onSelect={key => {
            t('新番档期.右上角菜单', {
              key
            })

            if (key === '浏览器查看') {
              open(`${HOST}/user/lilyurey/index`)
            } else if (key === '网页版查看') {
              const url = `${URL_SPA}/${getSPAParams('Staff')}`
              open(url)
            }
          }}
        >
          <Heatmap id='新番档期.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default ob(Header)
