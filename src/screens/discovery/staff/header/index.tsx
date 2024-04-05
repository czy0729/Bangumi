/*
 * @Author: czy0729
 * @Date: 2022-03-12 23:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-05 13:03:55
 */
import React from 'react'
import { Header as HeaderComp, Heatmap } from '@components'
import { getSPAParams, open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST, URL_SPA } from '@constants'
import { COMPONENT, DATA, TEXT_BROWSER, TEXT_SPA } from './ds'

function Header() {
  return (
    <HeaderComp
      title='新番'
      hm={['user/lilyurey/index', 'Staff']}
      headerRight={() => (
        <HeaderComp.Popover
          data={DATA}
          onSelect={key => {
            t('新番档期.右上角菜单', {
              key
            })

            if (key === TEXT_BROWSER) {
              open(`${HOST}/user/lilyurey/index`)
              return
            }

            if (key === TEXT_SPA) {
              const url = `${URL_SPA}/${getSPAParams('Staff')}`
              open(url)
              return
            }
          }}
        >
          <Heatmap id='新番档期.右上角菜单' />
        </HeaderComp.Popover>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
