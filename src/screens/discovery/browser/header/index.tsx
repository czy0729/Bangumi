/*
 * @Author: czy0729
 * @Date: 2022-03-11 21:51:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 06:59:24
 */
import React from 'react'
import { Header as HeaderComp, Heatmap } from '@components'
import { useStore } from '@stores'
import { getSPAParams, open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { URL_SPA } from '@constants'
import { Ctx } from '../types'
import { COMPONENT, DATA, TEXT_BROWSER, TEXT_SPA } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderComp
      title='索引'
      hm={[$.url, 'Browser']}
      headerRight={() => (
        <HeaderComp.Popover
          data={DATA}
          onSelect={key => {
            if (key === TEXT_BROWSER) {
              open($.url)
            } else if (key === TEXT_SPA) {
              const url = `${URL_SPA}/${getSPAParams('Browser')}`
              open(url)
            }

            t('索引.右上角菜单', {
              key
            })
          }}
        >
          <Heatmap id='索引.右上角菜单' />
        </HeaderComp.Popover>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
