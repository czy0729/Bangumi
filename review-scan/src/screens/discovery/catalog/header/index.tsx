/*
 * @Author: czy0729
 * @Date: 2023-04-11 15:43:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-16 20:25:38
 */
import React from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { getSPAParams, open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST, TEXT_MENU_BROWSER, TEXT_MENU_SPA, TEXT_MENU_SPLIT, URL_SPA } from '@constants'
import { Ctx } from '../types'
import { COMPONENT, DATA, HM } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderV2
      title='目录'
      hm={HM}
      headerRight={() => (
        <HeaderV2Popover
          data={[...DATA, TEXT_MENU_SPLIT, ...$.toolBar]}
          onSelect={title => {
            if (title === TEXT_MENU_BROWSER) {
              open(`${HOST}/index/browser?orderby=collect`)

              t('目录.右上角菜单', {
                key: title
              })
            } else if (title === TEXT_MENU_SPA) {
              open(`${URL_SPA}/${getSPAParams('Catalog')}`)

              t('目录.右上角菜单', {
                key: title
              })
            } else {
              $.onToolBar(title)
            }
          }}
        />
      )}
    />
  )
}

export default ob(Header, COMPONENT)
